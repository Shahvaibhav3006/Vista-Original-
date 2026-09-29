import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getProfile, updateProfile, getPassport, getSavedPlaces, savePlace, removeSavedPlace } from '../controllers/profile';

const router = Router();

router.get('/', requireAuth, getProfile);
router.patch('/', requireAuth, updateProfile);
router.get('/passport', requireAuth, getPassport);
router.get('/saved-places', requireAuth, getSavedPlaces);
router.post('/saved-places/:placeId', requireAuth, savePlace);
router.delete('/saved-places/:placeId', requireAuth, removeSavedPlace);

export default router;
