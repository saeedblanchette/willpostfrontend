import React from 'react';
import Login from '../pages/Login';
import { authManager } from '../services';

const AuthWarapper = React.forwardRef(({ children }, ref) => {
  const auth = authManager();

  if (auth === null) return <Login ref={ref} />;
  if (auth.isValid()) return <>{children}</>;
  return <Login ref={ref} />;
});

export default AuthWarapper;
