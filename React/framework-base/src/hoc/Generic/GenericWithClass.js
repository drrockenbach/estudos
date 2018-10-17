import React from 'react';

const GenericWithClass = (props) => {
    return (
        <div className={props.classes}>
            {props.children}
        </div>
    
    );
}

export default GenericWithClass;






