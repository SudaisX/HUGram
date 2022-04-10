import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';

// @desc    Get Current User's Profile
// @route   GET api/profile/me
// @access  Private
const getCurrProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
            'name',
            'avatar',
        ]);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @desc    Create/Update User Profile
// @route   POST api/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        major,
        minor,
        batch,
        website,
        birthday,
        interests,
        skills,
        bio,
        clubs,
        hobbies,
        twitter,
        facebook,
        youtube,
        instagram,
        github,
        linkedin,
    } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (major) profileFields.major = major;
    if (minor) profileFields.minor = minor;
    if (batch) profileFields.batch = batch;
    if (website) profileFields.website = website;
    if (birthday) profileFields.birthday = birthday;
    if (bio) profileFields.bio = bio;

    // Handle fields with comma seperated entries
    if (interests) {
        profileFields.interests = interests.split(',').map((skill) => skill.trim());
    }
    if (skills) {
        profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    if (clubs) {
        profileFields.clubs = clubs.split(',').map((skill) => skill.trim());
    }
    if (hobbies) {
        profileFields.hobbies = hobbies.split(',').map((skill) => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;
    if (github) profileFields.social.github = github;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create Profile if not found
        profile = new Profile(profileFields);
        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @desc    Get All Profiles
// @route   GET api/profile
// @access  Private
const getAllProfiles = asyncHandler(async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @desc    Get Profile by User ID
// @route   GET api/profile/user/:userId
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId }).populate('user', [
            'name',
            'avatar',
        ]);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.status(500).send('Server Error');
    }
});

export { getCurrProfile, updateProfile, getAllProfiles, getUserProfile };
