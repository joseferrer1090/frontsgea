// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Dashboard from '../pages/Dashboard';
import TeamsRoles from '../pages/TeamsRoles'

// Container

const RoutesList = () =>
  <Switch>
    <Route exact path="/home/dasboard" component={Dashboard} />
    <Route exact path="/setting/teamsandroles" component={TeamsRoles} />
  </Switch>
class Routes extends React.component {
  render() {
    return (
      <RoutesList/>
    );
  }
}
//<Route exact path="/library/:id" component={Library} />
// <Route exact path="/library" component={Library} />
export { RoutesList };
export default Routes;