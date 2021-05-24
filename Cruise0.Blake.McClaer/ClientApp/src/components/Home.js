import React, { Component } from 'react';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { Profile } from './Profile'
import '../custom.css';
import { useAuth0 } from "@auth0/auth0-react";

export class Home extends Component {
    static displayName = Home.name;
    
  render () {
    return (
        <div className="container">
            <div className="row">
                <div className="column">
                    <h1>Cruise0 2.0!</h1>
                    <p>Welcome to the new Cruise0 web experience.</p>
                    <p>
                        This proof of concept is designed to show how the AUth0 platform can enable the following outcomes for the Cruise0 moderisation project.
                </p>
                    <ul>
                        <li>Intergrate with effectively with ReactJS, The SPA technology for Cruise0 2.0</li>
                        <li>Boost customer adoption by allowing social logins to complement the existing username/password process.</li>
                        <li>Allow Marketing to use profile data to drive in-app campaigns based on customer demographics.</li>
                    </ul>
                </div>
            </div>
            <div className="row justify-content-center">
                <LoginButton />
            </div>
            <div className="row justify-content-center">
                <LogoutButton />
            </div>
            <div className="row">
                <Profile />
            </div>
        </div>
    );
  }
}
