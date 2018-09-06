import React, { Component } from 'react';
import PersonCss from './Person.css';

class Person extends Component {
    render () {
        return (
            <div className={PersonCss.Person}> 
                <p onClick={this.props.click}> I'm {this.props.name} and I'm {this.props.age} years old!</p>
                <p>{this.props.children} </p>
                <input type="text" onChange={this.props.change} value={this.props.name}></input>
            </div>
        ); 
    }
}

export default Person;