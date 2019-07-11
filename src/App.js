import React from 'react';

import Layout from './components/Layout/Layout';
import EmployeeBuilder from './containers/EmployeeBuilder/EmployeeBuilder';
import EmployeesInfo from './containers/EmployeesInfo/EmployeesInfo';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/empdir" component={EmployeesInfo} />
          <Route path="/" exact component={EmployeeBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
