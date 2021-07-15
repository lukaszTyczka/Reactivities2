import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <img
                        src="./assets/logo.png"
                        alt="Logo"
                        style={{ marginRight: 10 }}
                    />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name="Activities" />
                <Menu.Item as={NavLink} to="/errors" name="Errors" />
                <Menu.Item>
                    <Button
                        as={NavLink}
                        to="/createActivity"
                        positive
                        content="Create Activity"></Button>
                </Menu.Item>
            </Container>
        </Menu>
    );
}
