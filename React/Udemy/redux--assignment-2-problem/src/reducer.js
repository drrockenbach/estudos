import * as actions from './store/actions';

const initialState ={
    persons: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.NEW_PERSON:
            const newPerson = {
                    id: Math.random(), // not really unique but good enough here!
                    name: action.personData.name,
                    age: action.personData.age
                }
            return {
                persons: state.persons.concat(newPerson)
            }
        case actions.DELETE_PERSON:
            const updatedArray = state.persons.filter(person => person.id !== action.personId);
            return {
                persons: updatedArray
            }
    
        default:
            break;
    }

    return state;
}

export default reducer;

// state = {
//     persons: []
// }

// personAddedHandler = () => {
//     const newPerson = {
//         id: Math.random(), // not really unique but good enough here!
//         name: 'Max',
//         age: Math.floor( Math.random() * 40 )
//     }
//     this.setState( ( prevState ) => {
//         return { persons: prevState.persons.concat(newPerson)}
//     } );
// }

// personDeletedHandler = (personId) => {
//     this.setState( ( prevState ) => {
//         return { persons: prevState.persons.filter(person => person.id !== personId)}
//     } );
// }
