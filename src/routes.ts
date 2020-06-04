import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsConstroller from './controllers/ItemsConstroller';

// Criando instância
const pointsController = new PointsController();
const itemsConstroller = new ItemsConstroller();

// Router() serve para desacoplar as rotas para outros arquivos
// ou seja, o routes vai funcionar da mesma forma q o const app
const routes = express.Router();

// Listar items
routes.get('/items', itemsConstroller.index);

// Criar registro
routes.post('/points', pointsController.create);

// Listar pontos
routes.get('/points', pointsController.index);

// Listar ponto de coleta especifico
routes.get('/points/:id', pointsController.show);

export default routes;