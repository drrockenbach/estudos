import React, { Component } from 'react';
import Generic from '../../../Generic/Generic';
import WithClass from '../../../WithClass/WithClass';

class HeaderInner extends Component {
    render() {
        return (
            <Generic>
                <ul className="headmenu main">
                    <li className="odd">
                        <a title="Portal" className="dropdown-toggle">
                            <span className="head-icon head-users"></span>
                            <span className="headmenu-label">Portal</span>
                        </a>
                    </li>
                    <li className="even">
                        <a title="CTF" className="dropdown-toggle">
                            <span className="head-icon head-ctf"></span>
                            <span className="headmenu-label">CTF</span>
                        </a>
                    </li>
                    <li className="even">
                        <a title="SCE" className="dropdown-toggle">
                            <span className="head-icon head-sce"></span>
                            <span className="headmenu-label">SCE</span>
                        </a>
                    </li>
                </ul>
                {/* Menus excedentes os pontinhos ... */}
                {/* <ul className="headmenu">
                    <li className="more">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);" title="Mais">
                            <span class="head-icon head-more"></span>
                            <span class="headmenu-label">Mais</span>
                        </a>
                    </li>
                </ul> */}
            </Generic>
        );
   }
}

export default WithClass(HeaderInner, "headerinner");
