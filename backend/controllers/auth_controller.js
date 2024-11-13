// /controllers/auth_controller.js
import authService from '../services/auth_service.js';

const register = async (req, res) => {
    const { name, firstname, email, password } = req.body;
    try {
        const user = await authService.registerUser(name, firstname, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'User already exists or invalid data' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, user } = await authService.loginUser(email, password);
        res.json({ token, user });
    } catch (error) {
        console.log("Errorrr : ", error.message);
        res.status(400).json({ error: error.message });
    }
};

const verifyToken = async (req, res) => {
    res.json({ message: 'Token is valid' });
};

export default {
    register,
    login,
    verifyToken
};
