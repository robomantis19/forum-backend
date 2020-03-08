const db = require('../database/dbConfig.js');
module.exports = {
    find, 
    add, 
    addMessages,
    getUserById,
    findMessages, 
}


function find(){
    return db('users').select('id', 'username');
}

async function add(user) {
    const [id]= await db('users').insert(user).returning('id');
    return getUserById(id);
    //return db('users')
        // .insert(user, 'id')
        // .then(ids => {
        //     const [id] = ids;
        //     return db('users')
        //         .where({ id })
        //         .first();
        // })
}

async function getUserById(id) {

    return db('users')
        .where({ id })
        .first();
}

function findMessages(){
    return db('Message').select('id', 'from_user', 'message', 'starRating', 'user_id')
}

async function addMessages(input, urlId){
    console.log('model addMessage input', input)
    const [id] = await db('Message').insert(input).returning('id');
    return findMessagesById(id, urlId)
}

async function findMessagesById(MessageId, userUrlId){
    let messages = await db('Message as M')
    .join('users as U', 'U.id', 'M.user_id').where('M.user_id', Number(userUrlId))
    .select('M.id', 'M.from_user', 'M.message', 'M.starRating', 'M.user_id')
    .where('M.id', MessageId);

    return messages
}