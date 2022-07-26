import React, { useEffect, useReducer, useState } from "react";
import { Route, RouteChildrenProps, Switch } from "react-router";
import LoadingComponent from "./components/LoadingComponent";

import routes from "./config/routes";
import {
  userReducer,
  initialUserState,
  UserContextProvider,
} from "./contexts/user";

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
      setAuthStage("Credentials found. Validating...");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
