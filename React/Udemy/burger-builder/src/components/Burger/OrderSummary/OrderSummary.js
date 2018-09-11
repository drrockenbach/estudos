import React from 'react';

import AuxiliarHOC from '../../../hoc/AuxHOC';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map(
        key => {
            return <li key={key}> <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]} </li>
        }
    )

    return (
        <AuxiliarHOC>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredientes:</p>

            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p><b>Proceed to checkout?</b></p>
            <Button btnType='Danger' clicked={props.cancel}>Cancel</Button>
            <Button btnType='Success' clicked={props.continue}>Continue</Button>
        </AuxiliarHOC>
    )
};

export default orderSummary;