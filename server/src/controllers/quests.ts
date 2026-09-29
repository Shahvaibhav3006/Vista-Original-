import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getQuest = async (req: Request, res: Response) => {
  try {
    const { questId } = req.params;
    const { data, error } = await supabase
      .from('quests')
      .select('*, quest_steps(*)')
      .eq('id', questId)
      .single();

    if (error || !data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Quest not found' } });
    
    // Remove correct_answer from steps before sending to client
    const safeData = {
      ...data,
      quest_steps: data.quest_steps.map((step: any) => {
        const { correct_answer, ...safeStep } = step;
        return safeStep;
      })
    };

    return res.json({ success: true, data: safeData });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const completeQuestStep = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { questId, stepId } = req.params;
    const { answer } = req.body;

    const { data: step, error: stepError } = await supabase
      .from('quest_steps')
      .select('*')
      .eq('id', stepId)
      .single();

    if (stepError || !step) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Step not found' } });

    if (step.challenge_type === 'trivia' && step.correct_answer) {
      if (answer?.toLowerCase() !== step.correct_answer.toLowerCase()) {
        return res.status(400).json({ success: false, error: { code: 'INCORRECT_ANSWER', message: 'Incorrect answer' } });
      }
    }

    const { error: visitError } = await supabase
      .from('user_quest_steps')
      .insert({ user_id: userId, step_id: stepId });

    if (visitError && visitError.code !== '23505') {
       throw visitError;
    }

    return res.json({ success: true, data: { xp_reward: step.xp_reward } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const completeQuest = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { questId } = req.params;

    const { data: quest, error: questError } = await supabase
      .from('quests')
      .select('*')
      .eq('id', questId)
      .single();

    if (questError || !quest) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Quest not found' } });

    const { error: visitError } = await supabase
      .from('user_quest_progress')
      .insert({ user_id: userId, quest_id: questId, status: 'completed' });

    if (visitError && visitError.code !== '23505') {
       throw visitError;
    }

    if (quest.badge_reward) {
      await supabase.from('user_badges').insert({ user_id: userId, badge_id: quest.badge_reward }).select().maybeSingle();
    }
    
    if (quest.stamp_reward) {
      await supabase.from('user_stamps').insert({ user_id: userId, stamp_id: quest.stamp_reward }).select().maybeSingle();
    }

    return res.json({ success: true, data: { xp_reward: quest.xp_reward } });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};
