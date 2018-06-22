import * as React from 'react';
import {connect} from 'react-redux';
import * as Immutable from 'immutable';

import {Note} from '../models/note';
import {noteService} from '../services/NoteService';
import {store, StoreState} from '../redux/store';

import {CreateNoteView} from './CreateNote';
import {NoteView} from './Note';
import { magicUserId } from '../constants';

type HomeViewProps = {
    notes: Immutable.List<Note>;
}

type HomeViewState = {
}

export class HomeView extends React.Component<HomeViewProps, HomeViewState> {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
    }

    componentWillMount() {
        noteService.refetchAllNotes(magicUserId);
    }

    render() {
        return (
            <div style={{marginTop: '10px'}}>
                <CreateNoteView/>
                <div className="notesList">
                    {this.props.notes
                    .sort((a, b) => b.date.valueOf() - a.date.valueOf())
                    .map(note => {
                        return (
                            <NoteView key={note.id} note={note}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export const ConnectedHomeView = connect((state: StoreState) => {
    return {
        notes: state.notes
    };
})(HomeView);