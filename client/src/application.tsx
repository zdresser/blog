import React, { useEffect, useReducer, useState } from "react";
import { Route, RouteChildrenProps, Switch } from "react-router";
import LoadingComponent from "./components/LoadingComponent";
import logging from "./config/logging";

import routes from "./config/routes";
import {
  userReducer,
  initialUserState,
  UserContextProvider,
} from "./contexts/user";
import { Validate } from "./modules/auth";

export interface IApplicationProps {}

const Application: React.FC<IApplicationProps> = (props) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState<boolean>(true);

  /**used for debugging */
  const [authStage, setAuthStage] = useState<string>(
    "Checking localstorage..."
  );
  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);
  }, []);

  const CheckLocalStorageForCredentials = () => {
    setAuthStage("Checking credentials ...");
    const fire_token = localStorage.getItem("fire_token");

    if (fire_token === null) {
      userDispatch({ type: "logout", payload: initialUserState });
      setAuthStage("No credentials found");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          setAuthStage("User not valid, logging out...");
          userDispatch({ type: "logout", payload: initialUserState });
          setLoading(false);
        } else if (user) {
          setAuthStage("User authenticated");
          userDispatch({ type: "login", payload: { user, fire_token } });
          setLoading(false);
        }
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };
  if (loading) {
    return <LoadingComponent>{authStage}</LoadingComponent>;
  }
  return (
    <UserContextProvider value={userContextValues}>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              render={(routeProps: RouteChildrenProps<any>) => (
                <route.component {...routeProps} />
              )}
            />
          );
        })}
      </Switch>
    </UserContextProvider>
  );
};

export default Application;
