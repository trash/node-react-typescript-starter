import moment from 'moment';
import { Request, Response } from 'express';
import client from 'knex';
import knexfile from '../../knexfile';
import {mysqlDateFormat} from '../constants';

const knex = client(knexfile);

export function createNote(req: Request, res: Response) {
    console.warn('do validation on note here');
    const newNote = {
        note: req.body.note,
        date: req.body.date,
        user_id: req.body.userId,
        period: req.body.period
    };
    return knex('note').insert(newNote)
        .then(([id]) => {
            return res.status(201).send(Object.assign({
                id
            }, newNote));
        })
        .catch((error) => {
            console.error(error.code, error.sqlMessage);
            return res.sendStatus(500);
        });
}

export function deleteNote(req: Request, res: Response) {
    return knex('note')
        .where('id', req.params.id)
        .delete()
        .then(() => {
            return res.sendStatus(200);
        });
}

export function updateNote(req: Request, res: Response) {
    console.warn('do validation on note here', req.body, req.body.note);
    return knex('note')
        .where('id', req.params.id)
        .update(req.body)
        .then(() => {
            return res.sendStatus(200);
        });
}

function getNotes(req: Request, userId: string) {
    return knex('note')
        .join('user', 'user.id', '=', 'note.user_id')
        .where('user.id', userId)
        .select('note.*');
}

export function getAllNotes(req: Request, res: Response) {
    const startDateString = req.query.startDate;
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send();
    }
    let notesQuery = getNotes(req, userId);
    // Get notes for week starting at this date
    if (startDateString && moment(startDateString).isValid()) {
        const startDate = moment(startDateString);
            notesQuery = notesQuery
                .where('date', '>=', startDate.format(mysqlDateFormat))
                .andWhere('date', '<=', startDate.add(7, 'days').format(mysqlDateFormat));
    }
    return notesQuery.then((data) => res.status(200).send(data));
}