import { Request, Response } from 'express';
import knex from '../database/connection'; //conexão bd

// index = mostrar todos registros
// show = mostrar registro único
// create = criar registro
// updade = alterar registro
// delete = deletar registro

class PointController {
    async create(req: Request, res: Response) {
        //Usando destruturação
        const {
            name,
            email,
            whatsapp,
            longitude,
            latitude,
            uf,
            city,
            items //ID dos items que o ponto de coleta vai coletar
        } = req.body;

        // Garante q se alguma inserção falhar, a outra n irá executar
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            longitude,
            latitude,
            uf,
            city,
        }

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        });

        await trx('point_items').insert(pointItems);

        // Vai fazer os inserts quando se usa transaction
        await trx.commit();

        return res.json({
            id: point_id,
            ...point,
        });
    }

    async index(req: Request, res: Response) {

        const { city, uf, items } = req.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return res.json(points);
    }

    async show(req: Request, res: Response) {
        const id = req.params.id;
        const point = await knex('points').where('id', id).select('*').first();

        if (!point) {
            return res.status(400).json({ success: false });
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return res.json({ point, items });
    }
}

export default PointController;