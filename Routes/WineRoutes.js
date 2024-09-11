import express from 'express';
import Wine from '../models/ProductsModel.js';

const router = express.Router();

// Rotta per ottenere tutti i vini o filtrare per tipologia
router.get('/wine', async (req, res) => {
    try {
        const { tipology } = req.query;
        const query = tipology ? { tipology: new RegExp(tipology, 'i') } : {};
        const wines = await Wine.find(query);
        res.json(wines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rotta per ottenere un singolo vino tramite ID
router.get('/wine/:wineId', async (req, res) => {
    try {
        const wine = await Wine.findById(req.params.wineId);
        if (!wine) {
            return res.status(404).json({ message: 'Prodotto non trovato' });
        }
        res.json(wine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rotta per creare un nuovo prodotto
router.post('/wine', async (req, res) => {
    try {
        const newWine = new Wine({
            name: req.body.name,
            image: req.body.image,
            tipology: req.body.tipology,
            price: req.body.price,
            year: req.body.year,
        });
        const savedWine = await newWine.save();
        res.json(savedWine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rotta per aggiornare un prodotto esistente
router.patch('/wine/:wineId', async (req, res) => {
    const updates = req.body;
    try {
        const updatedWine = await Wine.findByIdAndUpdate(req.params.wineId, updates, { new: true });
        if (!updatedWine) {
            return res.status(404).json({ message: 'Prodotto non trovato' });
        }
        res.json(updatedWine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rotta per eliminare un prodotto esistente
router.delete('/wine/:wineId', async (req, res) => {
    try {
        const wine = await Wine.findByIdAndDelete(req.params.wineId);
        if (!wine) {
            return res.status(404).json({ message: 'Prodotto non trovato' });
        }
        res.json({ message: 'Prodotto eliminato' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

