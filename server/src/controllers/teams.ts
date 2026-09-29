import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import crypto from 'crypto';

export const createTeam = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    
    // Generate unique code
    const joinCode = crypto.randomBytes(3).toString('hex').toUpperCase();

    const { data: team, error } = await supabase.from('teams').insert({
      name,
      join_code: joinCode,
      created_by: userId
    }).select().single();

    if (error) throw error;
    
    // Add creator to team
    await supabase.from('team_members').insert({ team_id: team.id, user_id: userId });

    return res.json({ success: true, data: team });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const joinTeam = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { joinCode } = req.body;

    const { data: team, error: teamError } = await supabase.from('teams').select('*').eq('join_code', joinCode).single();
    if (teamError || !team) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Team not found.' } });

    const { error: joinError } = await supabase.from('team_members').insert({ team_id: team.id, user_id: userId });
    if (joinError) {
      if (joinError.code === '23505') return res.status(409).json({ success: false, error: { code: 'ALREADY_JOINED', message: 'Already in this team.' } });
      throw joinError;
    }

    return res.json({ success: true, data: team });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const leaveTeam = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { teamId } = req.params;

    const { error } = await supabase.from('team_members').delete().eq('team_id', teamId).eq('user_id', userId);
    if (error) throw error;

    return res.json({ success: true, data: null });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const { data, error } = await supabase.from('teams').select('*').eq('id', teamId).single();
    if (error) throw error;
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    // Top 50 global profiles
    const { data, error } = await supabase.from('profiles').select('id, name, avatar, xp, current_level').order('xp', { ascending: false }).limit(50);
    if (error) throw error;
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};
