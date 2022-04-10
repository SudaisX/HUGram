import express from 'express';
import { check } from 'express-validator';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';

import {
    getCurrProfile,
    updateProfile,
    getAllProfiles,
    getUserProfile,
    updateExperience,
} from '../controllers/profileController.js';

// Checks when you create/update profile
const profileChecks = [
    check('bio', 'Bio is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
];

// Checks for adding experience
const experienceChecks = [
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From Date is required').notEmpty(),
];

router.route('/').get(protect, getAllProfiles).post(protect, profileChecks, updateProfile);
router.route('/me').get(protect, getCurrProfile);
router.route('/experience').put(protect, experienceChecks, updateExperience);
// router.route('/education').put(protect, getUserProfile);
router.route('/user/:userId').get(protect, getUserProfile);

export default router;
