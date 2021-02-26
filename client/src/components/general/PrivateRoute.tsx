import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkAuth } from "../../utils/auth";

interface PrivateRouteProps {
  component?: React.FC | React.ComponentClass;
  children?: React.ReactNode;
  exact?: boolean;
}

// https://github.com/rootsher/react-typescript-starter/blob/master/src/app/core/components/protected-route/protected-route.template.tsx
const PrivateRoute = ({ children, component: Component, ...rest }: PrivateRouteProps) => {
  const render = (props: any) =>
    checkAuth() ? (
      Component ? (
        <Component {...props} />
      ) : (
        children
      )
    ) : (
      <Redirect
        to={{
          pathname: "/u/login",
        }}
      />
    );

  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
