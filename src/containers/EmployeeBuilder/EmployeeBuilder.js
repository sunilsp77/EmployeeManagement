import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import classes from './EmployeeBuilder.module.css';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-empdata';
import Spinner from '../../components/UI/Spinner/Spinner';

class EmployeeBuilder extends Component {
  state = {
    personalInfo: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        label: 'Name',
      },
      gender: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
        },
        value: 'male',
        label: 'Gender',
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
      photo: {
        elementType: 'input',
        elementConfig: {
          type: 'file',
          accept: 'image/png, image/jpeg',
        },
        label: 'Image',
      },
    },
    home_workInfo: {
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
    },
    jobDetails: {
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
      //   skills: {
      //       elementType: 'input',
      //       elementConfig:
      //   }
    },
    loading: false,
  };

  personalInfoChangedHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.personalInfo };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedForm[inputIdentifier] = updatedFormElement;
    this.setState({
      personalInfo: updatedForm,
    });
  };
  home_workInfoChangedHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.home_workInfo };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedForm[inputIdentifier] = updatedFormElement;
    this.setState({
      home_workInfo: updatedForm,
    });
  };
  jobDetailsChangedHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.jobDetails };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedForm[inputIdentifier] = updatedFormElement;
    this.setState({
      jobDetails: updatedForm,
    });
  };
  formDataHandler = event => {
    this.setState({
      loading: true,
    });
    event.preventDefault();
    const formData = {};
    for (let formElement in this.state.personalInfo) {
      formData[formElement] = this.state.personalInfo[formElement].value;
    }
    const empData = {
      personalInfo: formData,
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
    let personalInfoArray = [],
      home_workInfoArray = [],
      jobDetailsInfoArray = [];
    for (let key in this.state.personalInfo) {
      personalInfoArray.push({
        id: key,
        config: this.state.personalInfo[key],
      });
    }
    for (let key in this.state.home_workInfo) {
      home_workInfoArray.push({
        id: key,
        config: this.state.home_workInfo[key],
      });
    }
    for (let key in this.state.jobDetails) {
      jobDetailsInfoArray.push({
        id: key,
        config: this.state.jobDetails[key],
      });
    }

    let form = (
      <form onSubmit={this.formDataHandler}>
        <fieldset>
          <legend>Personal information</legend>
          {personalInfoArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              label={formElement.config.label}
              changed={event =>
                this.personalInfoChangedHandler(event, formElement.id)
              }
            />
          ))}
        </fieldset>
        <fieldset>
          <legend>Home & Work information</legend>
          {home_workInfoArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              label={formElement.config.label}
              changed={event =>
                this.home_workInfoChangedHandler(event, formElement.id)
              }
            />
          ))}
        </fieldset>
        <fieldset>
          <legend>Job Details</legend>
          {jobDetailsInfoArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              label={formElement.config.label}
              changed={event =>
                this.jobDetailsChangedHandler(event, formElement.id)
              }
            />
          ))}
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
