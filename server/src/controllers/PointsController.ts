import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsController {
    async index(request: Request, response: Response) {
        //aqui usamos Query Params. Por quê? porque os request.params a
        //gente usa na rota, não ficaria legal. O request.body a gente
        //usa na criação e edição de novos items (post, put, delete).
        //E os query a gente usa pra filtro, paginação, etc.
        
        const { city, uf, items} = request.query;

        const parsedItems = String(items).split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct() //evitar que pesquise duas vezes o mesmo ponto!
            .select('points.*'); //quero buscar apenas todos os dados tabela points e não da tabela join

        const serializedPoints = points.map(point => {
            return {
                ...point, //retorna todos os dados do point
                url: `http://192.168.0.8:3333/uploads/${point.image}`
            }
        })

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response) {
        const id = request.params.id;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Ponto não encontrado'});
        }

        const serializedPoints = {
            ...point, //retorna todos os dados do point
            url: `http://192.168.0.8:3333/uploads/${point.image}`
        
        };
        
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
            //no SQL essa query seria:
            //SELECT title FROM items
            //  JOIN point_items ON items_id = point_items.item_id
            //WHERE point_items.item_id = id

        return response.json({serializedPoints, items});
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        //transaction: faz com que duas funções assíncronas só executarem quando
        //as duas estiverem prontas
        const trx = await knex.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })
    
        await trx('point_items').insert(pointItems);

        //devemos commitar o transaction no final de tudo,
        //fazendo os inserts de fato no banco de dados.
        await trx.commit();
    
        return response.json({
            id: point_id,
            ... point,
        });
    }
}

export default PointsController;