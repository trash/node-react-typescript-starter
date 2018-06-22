import * as React from 'react';
import {Provider} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Router, Route, Link, Redirect, Switch} from 'react-router-dom';

import {store} from '../redux/store';
import {history} from '../services/history';

import {ConnectedNotesForThisWeekView} from './NotesForThisWeek';
import {ConnectedHomeView} from './Home';
import {ConnectedHeaderView} from './Header';

export class MainView extends React.Component<void, {}> {
	render () {
		return (
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <ConnectedHeaderView/>
                        <div className="maxWidth">
                            <Route exact path="/" component={ConnectedHomeView}/>
                            <Route path="/notes" component={ConnectedNotesForThisWeekView}/>
                        </div>
                    </div>
                </Router>
            </Provider>
		);
	}
}