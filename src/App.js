import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import theme from './thems';
import RestoreAccount from './pages/RestoreAccount/RestoreAccount';
import LoadingInfo from './pages/LoadingInfo';
import Profile from './pages/Profile';
import ConfirmAuth from './pages/ConfirmAuth';
import Contacts from './pages/Contacts';
import Verifyemail from './pages/Verifyemail';
import NewPassword from './pages/RestoreAccount/NewPassword';
import ResendEmail from './pages/ResendEmail';
import LandingPage from './pages';
import ConfirmExistence from './pages/ConfirmExistence';
import Vote from './pages/Vote';
import Post from './pages/Post';
function App() {
  return (
    <Router  basename="/">
      <ChakraProvider theme={theme}>
        <Switch>
          {/* <Route exact path="/" component={L}/> */}
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/profile" component={Profile} />
          <Route path="/loading" component={LoadingInfo} />
          <Route path="/verify-email/:key" component={Verifyemail} />
          <Route path="/resend-email/" component={ResendEmail} />
          <Route path="/confirmation/:urlsignature" component={ConfirmExistence} />
          <Route path="/post/:urlsignature" component={Post} />
          <Route path="/vote/:urlsignature" component={Vote} />
          <Route
            path="/password-reset/confirm/:uid/:token/"
            component={NewPassword}
          />
          <Route path="/auth/confirm/:uid/:token/" component={ConfirmAuth} />
          <Route path="/restore" component={RestoreAccount} />
          {/* <PrivateRoute path="/home" component={Home}/> */}
          <Route path="/" exact component={LandingPage} />
          <Route component={NotFound} />
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
