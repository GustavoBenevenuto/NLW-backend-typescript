import Knex from 'knex';

export async function seed(knex : Knex){
    await knex('items').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg'},
        { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
        { title: 'Pilhas e Baterias', image: 'baterias.svg'},
        { title: 'Óleo de cozinha', image: 'oleo.svg'},
        { title: 'Resíduos Orgânico', image: 'organico.svg'},
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg'}
    ]);
};