import React from 'react';
import WithClass from '../../../WithClass/WithClass';
import Logo from '../../../../Component/Logo/Logo';
import Generic from '../../../Generic/Generic';
import HeaderInner from './HeaderMenu';

const MenuHeader = (props) => {
  return (
    <Generic>
      <Logo />

      <HeaderInner />
      

    </Generic>
  )
}

export default WithClass(MenuHeader, "header");

