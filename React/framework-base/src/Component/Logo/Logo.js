import React from 'react'
import WithClass from '../../hoc/WithClass/WithClass';
import logo from '../../assets/icons/logo.ico';

const Logo = () => {
  return (
    <a href='/'>
      <img alt="Logo" src={logo} />
    </a>
  )
}

export default WithClass(Logo, "logo");




{/* <div class="logo">
    <p:commandLink id="linkHomeLogo" action="#{menuController.redirecionaIndex}">
        <h:graphicImage library="img" name="logo-auttar-branco.svg" rendered="#{portalController.empresaLogotipo() eq 'Auttar'}"/>
        <h:graphicImage library="img" name="logo-getnet-branco.svg" rendered="#{portalController.empresaLogotipo() eq 'GetNet'}"/>
        <h:graphicImage library="img" name="logo-softcom.png" rendered="#{portalController.empresaLogotipo() eq 'Softcom'}"/>
        <h:graphicImage library="img" name="logo-shell.png" rendered="#{portalController.empresaLogotipo() eq 'Shell'}"/>
    </p:commandLink>
</div> */}