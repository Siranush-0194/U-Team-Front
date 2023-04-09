import React from 'react';
import {
    Route,
    Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children, ...rest }) {
    const user = useSelector(function (state) {
        return state?.user?.id || 0;    
    });

    return <Route
        {...rest}
        render={({ location }) =>
            !user ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/dashboard",
                        state: { from: location }
                    }}
                />
            )
        }
    />;
}

function PrivateRoute({ children, ...rest }) {
    const user = useSelector(function (state) {
        return state?.user?.id || 0;
    });
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export { PrivateRoute, PublicRoute };