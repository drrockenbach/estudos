import React, {Component} from 'react';

import AuxHOC from '../../hoc/AuxHOC';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {return {showSideDrawer: !prevState.showSideDrawer}});
    }

    render() {
       return (
        <AuxHOC> 
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer closed={this.sideDrawerCloseHandler} open={this.state.showSideDrawer}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </AuxHOC>
       )
    }
} 

export default Layout;