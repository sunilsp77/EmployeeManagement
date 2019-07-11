import React, { Component } from 'react';

import EmployeeInfo from '../../components/EmployeeInfo/EmployeeInfo';
import axios from '../../axios-empdata';

class EmployeesInfo extends Component {
  state = {
    employees: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get('employeeData.json')
      .then(res => {
        // console.log(res.data);
        const fetchedEmployees = [];
        for (let key in res.data) {
          fetchedEmployees.push({
            ...res.data[key],
            id: key,
          });
        }
        // console.log(fetchedEmployees);
        this.setState({
          loading: false,
          employees: fetchedEmployees,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.employees.map(emp => (
          <EmployeeInfo key={emp.id} empInfo={emp.empInfo} />
        ))}
      </div>
    );
  }
}

export default EmployeesInfo;
