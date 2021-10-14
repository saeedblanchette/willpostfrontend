import React from 'react';
import {
    Route,
    Switch,
    useRouteMatch
  } from "react-router-dom";
import NewPassword from './NewPassword';
import Email from './Email';
const RestoreAccount = () => {
    let { path } = useRouteMatch();
    return (

            <Switch>
                <Route path={`${path}/email`}  component={Email} />
                <Route path={`${path}/newpassword`}  component={NewPassword} />
             
            </Switch>
    )
};

export default RestoreAccount;