import React from 'react';

const ValidationComponent = (props) => {

    let critica = null;

    const style = {
        border: '1px solid black',
        backgroundColor: 'red '
    }

    if (props.lenght < 5) {
        critica = 'Text to short';
    } else if (props.lenght > 50) {
        critica = 'Text too long';
    }

    let retorno = null;

    if (critica != null) {
        retorno = <div> <span style={style}>{critica}</span></div>;
    }

    return (retorno);
}

export default ValidationComponent;