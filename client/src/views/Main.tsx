import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';

import {store} from '../redux/store';

import {ConnectedHomeView} from './Home';

export class MainView extends React.Component<void, {}> {
	render () {
		return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route path="/" component={ConnectedHomeView}/>
                    </div>
                </Router>
            </Provider>
		);
	}
}