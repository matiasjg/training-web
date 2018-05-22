import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav , NavItem } from 'react-bootstrap';

class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: 'perfil'
        };
    }

    changeMenu(menu) {
        this.setState({ active: menu });
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/" className="navbar-brand">EH</Link>
                    </Navbar.Brand>

                    <Navbar.Toggle>
                        <span className="navbar-toggler-icon"></span>
                    </Navbar.Toggle>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem
                            eventKey={1}
                            href="/#/planes"
                            className={this.state.active === 'perfil' ? 'active nav-item nav-link' : 'nav-link'}
                            onClick={() => this.changeMenu('perfil')}
                        >
                            Planes
                        </NavItem>
                        <NavItem
                            eventKey={2}
                            href="/#/entrenamientos"
                            className={this.state.active === 'perfil' ? 'active nav-item nav-link' : 'nav-link'}
                            onClick={() => this.changeMenu('perfil')}
                        >
                            Entrenamientos
                        </NavItem>
                        <NavItem
                            eventKey={3}
                            href="/#/perfil"
                            className={this.state.active === 'perfil' ? 'active nav-item nav-link' : 'nav-link'}
                            onClick={() => this.changeMenu('perfil')}
                        >
                            Perfil
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Menu;
