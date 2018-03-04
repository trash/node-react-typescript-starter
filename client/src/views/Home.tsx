import * as React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router';
import {History} from 'history';
import * as classNames from 'classnames';

import {store, StoreState} from '../redux/store';

interface HomeViewProps {
    history: History;
}

export class HomeView extends React.Component<HomeViewProps, {}> {
    render() {
        return (
            <section>
                Hello World
            </section>
        );
    }
}

export const ConnectedHomeView = connect((state: StoreState) => {
    return {
    };
})(HomeView);