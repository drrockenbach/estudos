import React, { Component } from 'react';
import Accordion from '../accordion/Accordion';
import SearchContent from './SearchContent';

class Search extends Component {
    render() {
        return (
            <form >
            <Accordion>
                <SearchContent>
                    <span>Rede: </span>
                    <input type="text"></input>
                </SearchContent>
            </Accordion>
            </form>
        );
    }
}

export default Search;
