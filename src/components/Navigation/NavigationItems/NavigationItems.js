import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      ADD Employee
    </NavigationItem>
    <NavigationItem link="/">Employee Directory</NavigationItem>
  </ul>
);

export default navigationItems;
