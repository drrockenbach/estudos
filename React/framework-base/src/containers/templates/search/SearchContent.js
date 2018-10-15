import React from 'react';

const SearchContent = (props) => {
  return (
    <div id="searchForm:filtro:principal" className="ui-accordion-content ui-helper-reset ui-widget-content" role="tabpanel" aria-hidden="false" 
                    style={{display: "block"}}>
        {props.children}
    </div>
  )
}

export default SearchContent;
