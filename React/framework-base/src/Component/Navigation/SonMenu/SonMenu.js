import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';

const SonMenu = (props) => {

  return (
    <NavigationItem link={props.menu.link} > 
        <i className={props.menu.icone}></i>
        <span className="text">{props.menu.name}</span>
    </NavigationItem> 
  )
}

export default SonMenu;