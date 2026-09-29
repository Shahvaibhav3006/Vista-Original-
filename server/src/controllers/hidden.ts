import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getHiddenGems = async (req: Request, res: Response) => {
  try {
    const { citySlug } = req.params;
    const { data, error } = await supabase.from('hidden_gems').select('*').eq('city_id', citySlug);
    if (error) throw error;
    // Do not return answers, just ID and metadata
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const revealClue = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { hiddenId } = req.params;
    
    // Check progress
    const { data: prog } = await supabase.from('hidden_gem_progress').select('*').eq('user_id', userId).eq('hidden_gem_id', hiddenId).single();
    
    let clues = prog ? prog.clues_revealed + 1 : 1;
    
    await supabase.from('hidden_gem_progress').upsert({
      user_id: userId,
      hidden_gem_id: hiddenId,
      clues_revealed: clues
    });

    return res.json({ success: true, data: { clues_revealed: clues } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const discoverGem = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { hiddenId } = req.params;

    const { data: prog } = await supabase.from('hidden_gem_progress').select('*').eq('user_id', userId).eq('hidden_gem_id', hiddenId).single();
    if (prog?.discovered) return res.status(409).json({ success: false, error: { code: 'ALREADY_DISCOVERED', message: 'Already discovered.' } });

    await supabase.from('hidden_gem_progress').upsert({
      user_id: userId,
      hidden_gem_id: hiddenId,
      discovered: true,
      discovered_at: new Date().toISOString()
    });

    const { data: profile } = await supabase.from('profiles').select('xp').eq('id', userId).single();
    const newXp = (profile?.xp || 0) + 100;
    await supabase.from('profiles').update({ xp: newXp }).eq('id', userId);

    return res.json({ success: true, data: { xp_reward: 100 } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};
