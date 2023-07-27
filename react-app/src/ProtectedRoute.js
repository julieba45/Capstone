import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ children, ...rest }) {
const user = useSelector(state => state.session.user);

return (
    <Route {...rest} render={({ location }) =>
        user ? children : <Redirect to={{
            pathname: '/login',
            state: { from: location }
        }}/>
    }/>
);
}
