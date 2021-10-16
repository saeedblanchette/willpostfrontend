import React from 'react';
import { useHistory } from 'react-router';
import { authManager } from '../services';

const PublicOnlyWrapper = React.forwardRef(({ children }, ref) => {
  // const [auth, setAuth] = useState(null);
  const auth = authManager();
  const history=useHistory()

  if (auth === null) return <>{children}</>;
  if (auth.isValid()) history.push('/home');
  return <>{children}</>;
});

export default PublicOnlyWrapper;
