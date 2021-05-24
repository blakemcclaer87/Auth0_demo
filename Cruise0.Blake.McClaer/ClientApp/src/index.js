import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Auth0Provider } from "@auth0/auth0-react";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Auth0Provider
        domain="blakemcclaerdev.au.auth0.com"
        clientId="itOXUq4FBQo4UHXACIjcgcevgOXra35F"
        redirectUri={window.location.origin}
        audience="https://blakemcclaerdev.au.auth0.com/api/v2/"
        scope="read:current_user read:current_user_metadata update:current_user_metadata">
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>,
    </Auth0Provider>,
    document.getElementById('root'));

registerServiceWorker();

