import usersService from '../services/users_service.js';

const getUserPersonnalInfo = async (req, res) => {
    const userId = req.jwtUserId;
    try {
        const user = await usersService.getUserPersonnalInfo(userId);
        res.json(user);
    } catch (error) {
        console.error("Error getting user info: ", error);
        res.status(400).json({ error: 'An error occurred while getting user info' });
    }
}

export default {
    getUserPersonnalInfo,
};