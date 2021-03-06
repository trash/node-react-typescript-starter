import { Request, Response } from 'express';
const client = require('knex');
import knexfile from '../../knexfile';
const knex = client(knexfile);

export function createUser(req: Request, res: Response) {
    console.warn('Do validation on input here');
    return knex('user').insert({
        username: req.body.username,
        password: req.body.password
    })
    .then(([id]) => {
        return res.status(201).send({
            id
        });
    })
    .catch((error) => {
        console.error(error.code, error.sqlMessage);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.sendStatus(403);
        }
        return res.sendStatus(500);
    });
}