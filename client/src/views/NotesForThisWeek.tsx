import * as React from 'react';
import * as moment from 'moment';
import {connect} from 'react-redux';
import {Route, RouteComponentProps} from 'react-router';
import {History} from 'history';
import * as classNames from 'classnames';

import {store, StoreState} from '../redux/store';
import {Note} from '../models/note';
import {noteService} from '../services/NoteService';

import {NoteView} from './Note';

import {magicUserId} from '../constants';

interface NotesForThisWeekProps {
}

type NotesForThisWeekState = {
    notes: Note[];
}

export class NotesForThisWeekView extends React.Component<RouteComponentProps<NotesForThisWeekProps>, NotesForThisWeekState> {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
    }

    async componentWillMount() {
        const notes = await noteService.getNotesForWeek(magicUserId);
        this.setState({
            notes
        });
    }

    render() {
        return (
            <section>
                <h1>Notes For This Week</h1>
                <div className="notesList">
                    {this.state.notes
                    .sort((a, b) => b.date.valueOf() - a.date.valueOf())
                    .map(note => {
                        return (
                            <NoteView key={note.id} note={note}/>
                        );
                    })}
                </div>
            </section>
        );
    }
}

export const ConnectedNotesForThisWeekView = connect((state: StoreState) => {
    return {
    };
})(NotesForThisWeekView);