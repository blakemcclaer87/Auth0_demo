import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
    const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

    if (isLoading) {
        
        return <div>Loading AUth0......</div>;
    } else {
        return (!isAuthenticated && (
            <button
                className="btn btn-primary btn-block w-25"
                onClick={() => loginWithRedirect()}>
                Log In
            </button>
        ));
    }

};

export default LoginButton;