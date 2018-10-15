import React from 'react';
import WithClass from '../../../WithClass/WithClass';
import Generic from '../../../Generic/Generic';
import Button from '../../../../Component/UI/Button/Button';
import LeftMenu from '../Left/LeftMenu';

const MenuLeft = (props) => {
  return (
    
    <Generic>
      {/* Colocar ação de recolher menu. Fazer com React */}
      <Button title="Recolher menu" classes="nav-header">
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
        <span className="label">Menu</span>
      </Button>

      <LeftMenu />
      
    </Generic>




  )
};

export default WithClass(MenuLeft, "leftpanel");

