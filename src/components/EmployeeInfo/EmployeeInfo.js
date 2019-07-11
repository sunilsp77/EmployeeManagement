import React from 'react';

import classes from './EmployeeInfo.module.css';

const employee = props => {
  const details = [];
  for (let info in props.empInfo) {
    details.push({
      name: info,
      value: props.empInfo[info],
    });
  }

  console.log(details);
  return (
    <div className={classes.EmployeeInfo}>
      {details.map(property => (
        <p key={property.name}>
          {property.name} ' : ' {property.value}
        </p>
      ))}
    </div>
  );
};

export default employee;
