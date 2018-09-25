import React, { Component } from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actions from '../store/actions';
import { connect } from 'react-redux';

class Persons extends Component {
    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onPersonAdded} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onPersonDeleted(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => { 
    return {
        persons: state.persons
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onPersonAdded: () => dispatch({type: actions.NEW_PERSON}),
        onPersonDeleted: (id) => dispatch({type: actions.DELETE_PERSON, personId: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);