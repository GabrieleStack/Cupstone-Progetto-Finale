import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import endpoints from 'express-list-endpoints';
import router from './Routes/WineRoutes.js';
import user from './Routes/UserRoutes.js';

// Carica le variabili d'ambiente
dotenv.config();

// Crea l'app Express
const app = express();

// Whitelist di URL consentiti
const whitelist = ['https://progettofinale-frontend11.vercel.app', 'http://localhost:3001', 'http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Non consentito per CORS'));
    }
  }
};

// Configurazione di CORS e JSON
app.use(cors(corsOptions));
app.use(express.json());

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('mongoDB connesso'))
  .catch((err) => console.error('mongoDB non connesso', err));

// Imposta la porta
const PORT = process.env.PORT || 3002;

// Configurazione delle rotte API
app.use('/api', router);
app.use('/api', user)

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server presente sulla porta ${PORT}`);
  console.log('Endpoint disponibili:');
  console.table(endpoints(app));
});

console.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`);
