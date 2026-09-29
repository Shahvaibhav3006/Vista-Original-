import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { checkInPlace } from '../controllers/places';

const router = Router();

router.post('/:placeId/check-in', requireAuth, checkInPlace);

export default router;
