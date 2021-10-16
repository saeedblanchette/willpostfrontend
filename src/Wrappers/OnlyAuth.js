import React from 'react';
import { authManager } from '../services';
const OnlyAuth = ({children}) => {
    const auth = authManager();
   
  if (auth === null) return null ;
  if (auth.isValid()) return <>{children}</>;
  return null
};

export default OnlyAuth;