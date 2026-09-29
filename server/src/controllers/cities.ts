import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getCities = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('cities').select('*').eq('active', true);
    if (error) throw error;
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const getCity = async (req: Request, res: Response) => {
  try {
    const { citySlug } = req.params;
    const { data, error } = await supabase.from('cities').select('*').eq('id', citySlug).single();
    if (error || !data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'City not found' } });
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const getCityPlaces = async (req: Request, res: Response) => {
  try {
    const { citySlug } = req.params;
    const { data, error } = await supabase.from('places').select('*').eq('city_id', citySlug).eq('active', true);
    if (error) throw error;
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const getCityQuests = async (req: Request, res: Response) => {
  try {
    const { citySlug } = req.params;
    const { data, error } = await supabase.from('quests').select('*, quest_steps(*)').eq('city_id', citySlug).eq('active', true);
    if (error) throw error;
    
    // Ensure we don't leak correct answers
    const safeData = data.map((q: any) => ({
      ...q,
      quest_steps: (q.quest_steps || []).map((step: any) => {
        const { correct_answer, ...safeStep } = step;
        return safeStep;
      })
    }));

    return res.json({ success: true, data: safeData });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const searchCities = async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    if (!q) return res.json({ success: true, data: [] });
    
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .ilike('name', `%${q}%`)
      .eq('active', true);
      
    if (error) throw error;
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};
