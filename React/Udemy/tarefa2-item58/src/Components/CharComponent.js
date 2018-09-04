import React from 'react';

const CharComponent = (props) => {
    return (
        <span className="charComponent" onClick={props.click}>{props.character}</span>
    );
}

export default CharComponent;