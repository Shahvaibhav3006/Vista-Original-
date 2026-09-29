import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const redeemQr = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { code } = req.body;

    // Fetch code
    const { data: qr, error: qrError } = await supabase
      .from('qr_reward_codes')
      .select('*')
      .eq('code_hash', code)
      .eq('active', true)
      .single();

    if (qrError || !qr) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Invalid or expired QR code.' } });

    // Validate dates
    const now = new Date();
    if (qr.valid_from && new Date(qr.valid_from) > now) return res.status(400).json({ success: false, error: { code: 'NOT_ACTIVE', message: 'Code not yet active.' } });
    if (qr.valid_until && new Date(qr.valid_until) < now) return res.status(400).json({ success: false, error: { code: 'EXPIRED', message: 'Code has expired.' } });

    // Attempt redemption
    const { error: redeemError } = await supabase.from('qr_redemptions').insert({
      user_id: userId,
      qr_code_id: qr.id
    });

    if (redeemError) {
      if (redeemError.code === '23505') return res.status(409).json({ success: false, error: { code: 'ALREADY_REDEEMED', message: 'You have already redeemed this code.' } });
      throw redeemError;
    }

    // Award XP
    const { data: profile } = await supabase.from('profiles').select('xp').eq('id', userId).single();
    const newXp = (profile?.xp || 0) + (qr.xp_reward || 50);
    await supabase.from('profiles').update({ xp: newXp }).eq('id', userId);

    return res.json({ success: true, data: { reward: qr.reward_name, xp_reward: qr.xp_reward, total_xp: newXp } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};
