import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getQuest, completeQuestStep, completeQuest } from '../controllers/quests';

const router = Router();

router.get('/:questId', requireAuth, getQuest);
router.post('/:questId/steps/:stepId/complete', requireAuth, completeQuestStep);
router.post('/:questId/complete', requireAuth, completeQuest);

export default router;
