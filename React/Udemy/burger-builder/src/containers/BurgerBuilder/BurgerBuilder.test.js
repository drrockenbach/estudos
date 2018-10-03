
import React from 'react';
import { configure, shallow }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildConstrols';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {

    let wrappper;

    beforeEach(() => {
        wrappper = shallow(<BurgerBuilder onIniIngredients={() => {}} />);
    });

    it('should render <BuildControls /> when receiving ingredients',() => {
        wrappper.setProps({ings: {salad: 0}});
        expect(wrappper.find(BuildControls)).toHaveLength(1);
    });
})