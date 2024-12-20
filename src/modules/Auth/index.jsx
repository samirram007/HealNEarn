import React from 'react';

const Login = React.lazy(() => import('./components/Login'));
const Registration = React.lazy(() => import('./components/Registration'));

export { Login, Registration };

