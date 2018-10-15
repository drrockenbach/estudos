import React from 'react';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (

    <li className={props.classes}>
        <NavLink exact={props.exact} activeClassName={props.activeClass}
            to={props.link}>
            {props.children}
        </NavLink>
    </li>

);

export default navigationItem;