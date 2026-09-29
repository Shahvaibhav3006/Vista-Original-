import express, { Router } from 'express';
import profileRoutes from './profile';
import cityRoutes from './cities';
import placeRoutes from './places';
import questRoutes from './quests';
import { redeemQr } from '../controllers/qr';
import { getHiddenGems, revealClue, discoverGem } from '../controllers/hidden';
import { createTeam, joinTeam, leaveTeam, getTeam, getLeaderboard } from '../controllers/teams';
import { getTrail } from '../controllers/trail';
import { getPhotos, deletePhoto, uploadPhoto } from '../controllers/photos';
import { requireAuth, optionalAuth } from '../middleware/auth';

const router = Router();

router.use('/me', profileRoutes);
router.use('/cities', cityRoutes);
router.use('/places', placeRoutes);
router.use('/quests', questRoutes);

// Trail
router.get('/me/trail', requireAuth, getTrail);

// Photos
router.get('/me/photos', requireAuth, getPhotos);
router.post('/photos', requireAuth, express.json({limit: '10mb'}), uploadPhoto);
router.delete('/photos/:photoId', requireAuth, deletePhoto);

// QR
router.post('/qr/redeem', requireAuth, redeemQr);

// Hidden Gems
router.get('/hidden/:citySlug', optionalAuth, getHiddenGems);
router.post('/hidden/:hiddenId/reveal', requireAuth, revealClue);
router.post('/hidden/:hiddenId/discover', requireAuth, discoverGem);

// Teams
router.post('/teams', requireAuth, createTeam);
router.post('/teams/join', requireAuth, joinTeam);
router.post('/teams/:teamId/leave', requireAuth, leaveTeam);
router.get('/teams/:teamId', optionalAuth, getTeam);
router.get('/leaderboard', optionalAuth, getLeaderboard);

export default router;
