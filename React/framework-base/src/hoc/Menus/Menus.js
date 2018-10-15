import React, { Component } from 'react';
import Generic from '../Generic/Generic';
import MenuHeader from './Menu/Header/HeaderPanel';
import MenuLeft from './Menu/Left/LeftPanel';
import WithClass from '../WithClass/WithClass';

class Menus extends Component {
    render() {
        return (
            <Generic>
                <MenuHeader />
                <MenuLeft />
            </Generic>
        );
    }
}

export default WithClass(Menus, "formMenu");
