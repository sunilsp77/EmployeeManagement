import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import classes from './EmployeeBuilder.module.css';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-empdata';
import Spinner from '../../components/UI/Spinner/Spinner';

class EmployeeBuilder extends Component {
  state = {
    empInfo: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        label: 'Name',
      },
      birthdate: {
        elementType: 'input',
        elementConfig: {
          type: 'date',
          min: '1970-01-01',
          max: '2050-01-01',
        },
        value: '2018-07-22',
        label: 'Birthdate',
      },
      mailingAddress: {
        elementType: 'textarea',
        elementConfig: {
          rows: '4',
          cols: '50',
          placeholder: 'Mailing Address',
        },
        value: '',
        label: 'Mailing Address',
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Phone number',
        },
        value: '',
        label: 'Contact number',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        label: 'Email',
      },
      linkedIn: {
        elementType: 'input',
        elementConfig: {
          type: 'url',
          placeholder: 'https://example.com',
          pattern: 'https://.*',
          size: '30',
        },
        value: '',
        label: 'LinkedIn Url',
      },
      department: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'diagnostics', displayValue: 'Diagnostics' },
            { value: 'hmi', displayValue: 'HMI' },
            { value: 'application', displayValue: 'Application' },
          ],
        },
        value: 'diagnostics',
        label: 'Department',
      },
    },
    // Cplusplus: true,
    // Java: true,
    // Python: true,
    loading: false,
  };

  empInfoChangedHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.empInfo };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedForm[inputIdentifier] = updatedFormElement;
    this.setState({
      empInfo: updatedForm,
    });
  };

  // handleInputChange = event => {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value,
  //   });
  // };

  formDataHandler = event => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    const formData = {};
    for (let formElement in this.state.empInfo) {
      formData[formElement] = this.state.empInfo[formElement].value;
    }

    const empData = {
      empInfo: formData,
    };

    axios
      .post('./employeeData.json', empData)
      .then(response => {
        this.setState({
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    let empInfoArray = [];
    for (let key in this.state.empInfo) {
      empInfoArray.push({
        id: key,
        config: this.state.empInfo[key],
      });
    }

    let form = (
      <form onSubmit={this.formDataHandler}>
        <fieldset>
          {empInfoArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              label={formElement.config.label}
              changed={event =>
                this.empInfoChangedHandler(event, formElement.id)
              }
            />
          ))}
          {/* <label className={classes.Label}>Skills</label>
          <label>
            C++:
            <input
              name="Cplusplus"
              type="checkbox"
              checked={this.state.Cplusplus}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            JAVA:
            <input
              name="Java"
              type="checkbox"
              checked={this.state.Java}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Python:
            <input
              name="Python"
              type="checkbox"
              checked={this.state.Python}
              onChange={this.handleInputChange}
            />
          </label> */}
        </fieldset>
        <Button btnType="Success">SUBMIT</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.Content}>
        <h1 className={classes.heading}>Enter your Employee Data</h1>
        {form}
      </div>
    );
  }
}
export default EmployeeBuilder;
