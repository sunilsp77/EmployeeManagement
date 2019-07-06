import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';

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
      },
      gender: {
        elementType: 'input',
        elementConfig: {
          type: 'radio',
        },
        value: 'male',
      },
      birthdate: {
        elementType: 'input',
        elementConfig: {
          type: 'date',
          min: '1970-01-01',
          max: '2050-01-01',
        },
        value: '2018-07-22',
      },
      photo: {
        elementType: 'input',
        elementConfig: {
          type: 'file',
          accept: 'image/png, image/jpeg',
        },
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
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Phone number',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
      },
    },
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
  render() {
    let personalInfoArray = [],
      home_workInfoArray = [];
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

    let form = (
      <form>
        <fieldset>
          <legend>Personal information</legend>
          {personalInfoArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
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
              changed={event =>
                this.home_workInfoChangedHandler(event, formElement.id)
              }
            />
          ))}
        </fieldset>
      </form>
    );
    return (
      <div>
        <h1>Enter your Employee Data</h1>
        {form}
      </div>
    );
  }
}
export default EmployeeBuilder;
