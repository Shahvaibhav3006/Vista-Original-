import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { z } from 'zod';

const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
  home_city: z.string().optional(),
});

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const validatedData = updateProfileSchema.parse(req.body);

    const { data, error } = await supabase
      .from('profiles')
      .update(validatedData)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return res.json({ success: true, data });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: err.issues } });
    }
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const getPassport = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    
    // Fetch profile, stamps, badges, visited places etc.
    const [profileRes, badgesRes, stampsRes, visitsRes] = await Promise.all([
      supabase.from('profiles').select('level, xp, green_xp').eq('id', userId).single(),
      supabase.from('user_badges').select('badge_id').eq('user_id', userId),
      supabase.from('user_stamps').select('stamp_id').eq('user_id', userId),
      supabase.from('visited_places').select('place_id').eq('user_id', userId),
    ]);

    return res.json({
      success: true,
      data: {
        profile: profileRes.data,
        badges: badgesRes.data?.map(b => b.badge_id) || [],
        stamps: stampsRes.data?.map(s => s.stamp_id) || [],
        visited_places: visitsRes.data?.map(v => v.place_id) || [],
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const getSavedPlaces = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { data, error } = await supabase
      .from('saved_places')
      .select('place_id, places(*)')
      .eq('user_id', userId);

    if (error) throw error;
    
    // Flatten the response
    const saved = data.map((d: any) => d.places);

    return res.json({ success: true, data: saved });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const savePlace = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { placeId } = req.params;

    const { error } = await supabase
      .from('saved_places')
      .insert({ user_id: userId, place_id: placeId });

    if (error && error.code !== '23505') throw error; // Ignore duplicate

    return res.json({ success: true, data: { placeId } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const removeSavedPlace = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { placeId } = req.params;

    const { error } = await supabase
      .from('saved_places')
      .delete()
      .eq('user_id', userId)
      .eq('place_id', placeId);

    if (error) throw error;

    return res.json({ success: true, data: null });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};
