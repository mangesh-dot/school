import mysql from 'mysql2/promise';


const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    passsword:'password',
    database:'school_db'
});

export {pool};