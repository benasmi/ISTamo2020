import Route from "react-router-dom/es/Route";
import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import {isAuthenticated} from "../helpers/tokenStorage";

export const AuthenticatedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={routeProps =>
                isAuthenticated() === true ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};