import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getTrail = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { data, error } = await supabase.from('user_trail').select('*, places(*)').eq('user_id', userId).order('visited_at', { ascending: true });
    
    if (error) throw error;
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};
