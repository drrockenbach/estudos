import React from 'react';
import { configure, shallow }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        // shallow renderiza o componente, porém, não renderiza a arvore inteira. 
        // No caso, vai renderizar o NavigationItems e os NavigationItem, 
        // porém não vai renderizar o que tem dentro dos NavigationItem.
        // para renderizar a árvore inteira, utilizar o "mount", embora isso normalmente não seja feito,
        // deve-se priorizar o shallow e verificar sempre se não é possível fazer o test mais unitário possível. 
        // No caso, se precisar testar algo dentro do NavigationItem, escrever um teste específico para esse componente
        // e não testar ele dentro do teste do NavigationItems
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        // expect é do Jest
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render a <NavigationItem link="/logout">Logout</NavigationItem> element if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
    
});