import React, { Component } from 'react';
import Menus from '../Menus/Menus';

class MainWrapper extends Component {
  render() {
    return (
      <div className="mainwrapper">
        <Menus />

        <div className="rightpanel">
          <div class="maincontent">
            <div className="pageheader">
              <label>
                <div className="pageicon">
                  <span className="fa fa-user" />
                </div>
              </label>
              <div className="pagetitle">
                <h1>Titulo da Página</h1>
              </div>
            </div>

            {	this.props.children }
          </div>
					
				</div>

      </div> 
    )
  }
}

export default MainWrapper;