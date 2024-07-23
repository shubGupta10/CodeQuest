import users from '../models/auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) return res.status(404).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({ name, email, phoneNumber, password: hashedPassword });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ result: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: 'User does not exist' });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...' });
    }
};