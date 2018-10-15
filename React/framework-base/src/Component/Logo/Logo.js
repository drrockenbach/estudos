import React from 'react'
import WithClass from '../../hoc/WithClass/WithClass';
import logoAuttar from '../../assets/images/logo-auttar-branco.svg';

const Logo = () => {
  return (
    <a href='/'>
      <img alt="Auttar" src={logoAuttar} />
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