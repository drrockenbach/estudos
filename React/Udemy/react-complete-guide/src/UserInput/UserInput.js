import React from 'react';

const UserInput = (props) => {

    return (

        <div>
            <input type="text" onChange={props.change} value={props.value}></input>
        </div>

    );

}

export default UserInput;