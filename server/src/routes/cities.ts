import { Router } from 'express';
import { getCities, getCity, getCityPlaces, getCityQuests, searchCities } from '../controllers/cities';
import { optionalAuth } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, getCities);
router.get('/search', optionalAuth, searchCities);
router.get('/:citySlug', optionalAuth, getCity);
router.get('/:citySlug/places', optionalAuth, getCityPlaces);
router.get('/:citySlug/quests', optionalAuth, getCityQuests);
// router.get('/:citySlug/festivals', optionalAuth, getCityFestivals);
// router.get('/:citySlug/partners', optionalAuth, getCityPartners);

export default router;
