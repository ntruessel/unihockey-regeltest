import React from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslations } from '../hooks/translations/useTranslations';

export const Header = () => {
    const { lang } = useParams<{ lang: string }>();
    const history = useHistory();
    const t = useTranslations();
    return <Navbar bg="dark" variant="dark" className="mb-3">
        <Navbar.Brand>{t('title')}</Navbar.Brand>
        <Nav className="mr-auto"/>
        <Dropdown onSelect={(lang => {
            const path = history.location.pathname;
            history.push(path.replace(/\/.*\//, `/${lang}/`));
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
