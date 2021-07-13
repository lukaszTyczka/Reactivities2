import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activites/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activites/form/ActivityForm';
import ActivityDetails from '../../features/activites/details/ActivityDetails';

function App() {
    const location = useLocation();

    return (
        <>
            <Route path="/" component={HomePage} exact />
            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }}>
                            <Route
                                path="/activities"
                                component={ActivityDashboard}
                                exact
                            />
                            <Route
                                path="/activities/:id"
                                component={ActivityDetails}
                            />
                            <Route
                                key={location.key}
                                path={['/createActivity', '/manage/:id']}
                                component={ActivityForm}
                            />
                        </Container>
                    </>
                )}
            />
        </>
    );
}

export default observer(App);
