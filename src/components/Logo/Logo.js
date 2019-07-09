import React from 'react';

import companyLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = props => (
  <div className={classes.Logo}>
    <img src={companyLogo} alt="MyCompany" />
  </div>
);
export default logo;
