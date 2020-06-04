import { Request, Response } from 'express';
import knex from '../database/connection'; //conexão bd

class ItemsController{
    async index(req: Request, res: Response){
        const items = await knex('items').select('*');
        
        //Transformandos os dados em um novo formato
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`,
            }
        });
    
        return res.json(serializedItems);
    }
}

export default ItemsController;