import path from 'path';
import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//Para aparecer as imagens staticas
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333);