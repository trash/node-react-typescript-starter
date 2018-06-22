import * as React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {store, StoreState} from '../redux/store';


export type HeaderViewProps = {
    isAuthenticated: boolean;
}

export class HeaderView extends React.Component<HeaderViewProps, {}> {
    render() {
        return (
        <div className="header">
            <div className="header_inner maxWidth">
                <div className="header_brand">
                    <NavLink
                        to=""
                    >
                        Node React TypeScript Starter
                    </NavLink>
                </div>
                <div className="header_navlist">
                    <NavLink
                        className="header_navlist_item"
                        to="/notes"
                        activeClassName="selected"
                    >
                        Notes For This Week
                    </NavLink>
                </div>
            </div>
        </div>
        );
    }
}

export const ConnectedHeaderView = connect((state: StoreState) => {
    return {
        isAuthenticated: state.isAuthenticated
    };
})(HeaderView);