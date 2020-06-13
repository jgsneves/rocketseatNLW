import knex from '../database/connection';
import {Request, Response} from 'express';

// por que o nome index? É padrão da comunidade usar os nomes:
// index: para listagem de items;
// show: para exibir um único registro daquele;
// create/store: ;
// update: ;
// delete/destroy: ;

class ItemsController {
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*');
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: item.image,
                url: `http://192.168.0.8:3333/uploads/${item.image}`
            }
        })
    
        return response.json(serializedItems);
    } 
}

export default ItemsController;