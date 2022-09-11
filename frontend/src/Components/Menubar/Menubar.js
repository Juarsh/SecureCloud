import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Context } from "../../Context/context";

const Menubar = () => {

    const context = useContext(Context);
    
    const Logout = () => {
        context.logoutUser();
    }

    const moveToMakeGroupsPage = () => {
        window.location.href = "/make-groups";
    }

    const moveToManageGroupsPage = () => {
        window.location.href = "/manage-groups";
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/home">Secure Cloud Transactions using Blockchain</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick = {moveToManageGroupsPage}>Manage Groups</Nav.Link>
                    <Nav.Link onClick = {moveToMakeGroupsPage}>Make Groups</Nav.Link>
                    <Nav.Link onClick = {Logout}>Logout</Nav.Link>
                    {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>*/}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menubar;