import React from 'react';
import Generic from '../../../hoc/Generic/Generic';
import WithClass from '../../../hoc/WithClass/WithClass';

const Accordion = (props) => {
  return (
    <Generic>
        <h3 className="ui-accordion-header ui-helper-reset ui-state-default ui-state-active ui-corner-top" role="tab" aria-expanded="true" aria-selected="true" tabIndex="0">
            <span className="ui-icon ui-icon-triangle-1-s">
            </span>
            {props.titulo ? props.titulo : 'Filtros'}
        </h3>
        {props.children}
    </Generic>
  )
}

export default WithClass(Accordion,"ui-accordion ui-widget ui-helper-reset ui-hidden-container mobile-full");
