import  React, { Fragment, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'
import { Navbar, Nav } from 'react-bootstrap'

const AppNavBar = () => {
    const { user, unsetUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        unsetUser();
        navigate('/')
    }

    let rightNav = (user.access === null) ? (
        <Fragment>
          <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
        </Fragment>
      ) : (
        <Fragment>
          <Nav.Link as={NavLink} to="/add-category"> Home </Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Fragment>
      );

    return (
        <Navbar bg='secondary' variant='dark' expand="lg">
            <Navbar.Brand as={Link} to="/">Budget Checker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                {rightNav}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppNavBar