import express from 'express';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const user = express.Router();

// Rotta di registrazione
user.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Verifica se l'utente esiste già
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email già registrata' });
    }

    // Crea un nuovo utente
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'Registrazione avvenuta con successo' });
  } catch (err) {
    console.error('Errore durante la registrazione:', err);
    res.status(500).json({ success: false, message: 'Errore durante la registrazione' });
  }
});

// Rotta di login
user.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se l'utente esiste
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email non trovata' });
    }

    // Verifica la password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Password errata' });
    }

    // Crea un token di sessione
    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1d' });

    // Restituisci i dati dell'utente insieme al token
    res.status(200).json({ 
      success: true, 
      token, 
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      message: 'Login avvenuto con successo' 
    });
  } catch (err) {
    console.error('Errore durante il login:', err);
    res.status(500).json({ success: false, message: 'Errore durante il login' });
  }
});

export default user;
