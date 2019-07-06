import React from 'react';

import Layout from './components/Layout/Layout';
import EmployeeBuilder from './containers/EmployeeBuilder/EmployeeBuilder';

function App() {
  return (
    <div>
      <Layout>
        <EmployeeBuilder />
      </Layout>
    </div>
  );
}

export default App;
