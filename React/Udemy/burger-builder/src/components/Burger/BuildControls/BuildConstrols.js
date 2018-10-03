import React from 'react';
import classes from './BuildControls.css';

import BuilderControl from '../../Burger/BuildControls/BuildControl/BuildControl';

const constrols = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'}
];

const buildConstrols = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {constrols.map( item => {
                return <BuilderControl key={item.label} label={item.label} type={item.type} 
                ingredientAdded={() => props.ingredientAdded(item.type)}
                ingredientRemoved={() => props.ingredientRemoved(item.type)}
                disabled={props.disabled[item.type]}
                />;
            }
        )}

        <button className={classes.OrderButton} 
            disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildConstrols;