import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { z } from 'zod';

const checkInSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  accuracy: z.number().optional(),
  timestamp: z.number().optional(),
});

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // metres
  const p1 = lat1 * Math.PI / 180;
  const p2 = lat2 * Math.PI / 180;
  const dp = (lat2 - lat1) * Math.PI / 180;
  const dl = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(dp / 2) * Math.sin(dp / 2) +
    Math.cos(p1) * Math.cos(p2) *
    Math.sin(dl / 2) * Math.sin(dl / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
}

export const checkInPlace = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { placeId } = req.params;
    const { lat, lng } = checkInSchema.parse(req.body);

    // 1. Get official coordinates
    const { data: place, error: placeError } = await supabase
      .from('places')
      .select('latitude, longitude, xp_reward, city_id')
      .eq('id', placeId)
      .single();

    if (placeError || !place) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Place not found' } });
    }

    if (place.latitude && place.longitude) {
      // 2. Calculate distance
      const distance = calculateDistance(lat, lng, place.latitude, place.longitude);
      if (process.env.ENABLE_DEMO_MODE !== 'true' && distance > 150) {
        return res.status(422).json({ success: false, error: { code: 'TOO_FAR', message: 'You are too far from this location.' } });
      }
    }

    // 3. Record visit and award XP transactionally
    // We try to insert into visited_places. If it fails due to UNIQUE constraint, they already visited.
    const { error: visitError } = await supabase
      .from('visited_places')
      .insert({ user_id: userId, place_id: placeId });

    if (visitError) {
      if (visitError.code === '23505') { // Postgres unique constraint violation
        return res.status(409).json({ success: false, error: { code: 'ALREADY_VISITED', message: 'You have already visited this place.' } });
      }
      throw visitError;
    }

    // Insert into trail
    await supabase.from('user_trail').insert({
      user_id: userId,
      place_id: placeId,
      city_id: place.city_id,
      xp_earned: place.xp_reward
    });

    // We can't do arbitrary increments easily via PostgREST without an RPC. 
    // We'll read, add, and update for now (or assume an RPC exists).
    const { data: profile } = await supabase.from('profiles').select('xp').eq('id', userId).single();
    const newXp = (profile?.xp || 0) + (place.xp_reward || 10);
    
    await supabase.from('profiles').update({ xp: newXp }).eq('id', userId);

    return res.json({ success: true, data: { xp_reward: place.xp_reward, total_xp: newXp } });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: err.issues } });
    }
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};
