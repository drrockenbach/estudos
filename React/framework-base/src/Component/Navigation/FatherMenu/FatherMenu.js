import React from 'react';
import {NavLink} from 'react-router-dom';
import SonMenu from '../SonMenu/SonMenu';

const FatherMenu = (props) => {

  let sons = [];

  if (props.menu.sons && props.menu.isOpen) {
    props.menu.sons.map(item => {

      sons.push(<SonMenu key={item.menu.name} menu={item.menu} />)
      
    });
  };
    
  const classesMenu = ["dropdown"];

  if (props.menu.isOpen) {
    classesMenu.push("open");
  }

  return (
    <li className={props.classes}>
        <NavLink exact={props.exact} activeClassName={props.activeClass} onClick={props.clicked}
            to={props.menu.link} className={classesMenu.join(" ")}>
            <span className={props.menu.icone}></span>
				    <span className="text">{props.menu.name}</span>
        </NavLink>
        <ul style={props.menu.isOpen ? {display: 'block'} : null} >
          {sons}
        </ul>
    </li>
  )
}

export default FatherMenu;