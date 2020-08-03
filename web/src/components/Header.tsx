import React from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useParams, useHistory, generatePath, useRouteMatch } from 'react-router-dom';

export const Header = () => {
    const { lang } = useParams();
    const history = useHistory();
    const match = useRouteMatch();
    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Unihockey Regeltest</Navbar.Brand>
        <Nav className="mr-auto"/>
        <Dropdown onSelect={(lang => {
            history.push({
                pathname: generatePath(match.path, { lang: lang ?? 'de' }),
            });
        })}>
            <Dropdown.Toggle variant="light">
                {lang === 'de'
                    ? 'Deutsch'
                    : lang === 'fr'
                        ? 'Français'
                        : lang === 'it'
                            ? 'Italiano'
                            : 'Unknown Language'}
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight>
                <Dropdown.Item eventKey="de">Deutsch</Dropdown.Item>
                <Dropdown.Item eventKey="fr">Français</Dropdown.Item>
                <Dropdown.Item eventKey="it">Italiano</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </Navbar>;
};
