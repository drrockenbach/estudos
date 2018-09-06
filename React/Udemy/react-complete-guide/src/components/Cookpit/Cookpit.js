import React, { Fragment } from 'react';
import Classes from './Cookpit.css';

const cookpit = (props) => {

    const assignedClasses = [];

    let btnClass = Classes.Button;
    
    if (props.showPersons) {
        btnClass = [Classes.Button, Classes.Red].join(' ');
    }

    if (props.persons.length <=2) {
      assignedClasses.push(Classes.red); 
    }

    if (props.persons.length <=1) {
      assignedClasses.push(Classes.bold); 
    }

    return (
        <>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')}>Dynamic css </p>
            <div>
                <button className={btnClass}
                    onClick={props.clicked}>Toggle Persons</button>
            </div>
        </>

    );

}

export default cookpit;