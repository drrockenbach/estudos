
import React, { Component } from 'react';
import GenericWithClass from '../../../Generic/GenericWithClass';
import WithClass from '../../../WithClass/WithClass';
import NavigationItem from '../../../../Component/Navigation/NavigationItem/NavigationItem';
import FatherMenu from '../../../../Component/Navigation/FatherMenu/FatherMenu';

import { updateObject } from '../../../../shared/utility';

import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';

class LeftMenu extends Component {

    componentWillMount() {
        // const menus = localStorage.getItem("menus");
        // if (menus) {
        //     this.setState({menus: JSON.parse(menus)});
        // } else {
        //     console.log("menus antes da busca", this.state.menus);
        //     axios.get("https://framework-base.firebaseio.com/menus.json")
        //     .then(res => {
        //         console.log("dados do firebase", res.data);
        //         this.setState({menus: res.data});
        //         localStorage.setItem("menus", JSON.stringify(this.state.menus));
        //     })
        //     .catch(err => {
        //         console.log("erro ao buscar menus");
        //     })
        // }
        this.props.onLeftMenuLoad();
    }

    // Diomar - Adicionar no redux e simular a busca de webservice, utilizando o firebase
    // state = {
        // menus: []
        // Formato do menu
        // [{
        //         menu: {
        //             name: "Controle de Acesso",
        //             icone: "fa fa-lock",
        //             link: "",
        //             sons: [{
        //                     menu: {
        //                         name: "Perfil",
        //                         icone: "",
        //                         link: "/Perfil",
        //                         sons: null
        //                     }
        //                 },
        //                 {
        //                     menu: {
        //                         name: "Usuário Cliente",
        //                         icone: "",
        //                         link: "/UsuarioExterno",
        //                         sons: null
        //                     }
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         menu: {
        //             name: "Estrutura Organizacional",
        //             icone: "fa fa-home",
        //             link: "",
        //             sons: [{
        //                     menu: {
        //                         name: "Rede",
        //                         icone: "",
        //                         link: "/Rede",
        //                         sons: null
        //                     }
        //                 },
        //                 {
        //                     menu: {
        //                         name: "Empresa",
        //                         icone: "",
        //                         link: "/Empresa",
        //                         sons: null
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        // ]
    // };

    clickMenuHandler = (itemMenu, event) => {
        event.preventDefault();

        const indice = this.props.menus.lastIndexOf(itemMenu);
        const isOpen = !itemMenu.menu.isOpen;
        itemMenu.menu.isOpen = isOpen;
        
        console.log("clickMenuHandler antes",this.props.menus);

        const menus = updateObject(this.props.menus, 
            {[indice]: updateObject(this.props.menus[indice]), [indice]: itemMenu 
            }
        );
        
        console.log("clickMenuHandler depois",menus);
        this.setState({menus: Object.values(menus)});
    }

    render() {
        return (
            <GenericWithClass classes="leftmenu">
                <ul className="nav nav-tabs nav-stacked">
                    {/* Diomar - Se estiver na página inicial, esse className deve ser true */}
                    {/* Tem que implementar a lógica para definir o menu que estará ativo - passar para NavigationItem a prop activeClass="active" */}
                    <NavigationItem link ='/' 
                        className="true">
                            <span className="fa fa-laptop"></span>
                            <span className="text">Início</span>
                    </NavigationItem>
                    {
                        this.props.menus.map(item => (
                            <FatherMenu key={item.menu.name} classes="dropdown" menu={item.menu} activeClass="" clicked={this.clickMenuHandler.bind(this, item)}/>
                        ))
                    }
                </ul>
            </GenericWithClass>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLeftMenuLoad: () => dispatch(actions.loadLeftMenus())
    };
};

const mapStateToProps = state => {
    return {
        menus: state.leftMenu.menus
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
