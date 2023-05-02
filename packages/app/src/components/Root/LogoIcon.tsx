import React from 'react';
import { makeStyles } from '@material-ui/core';
import wiproLogo from './Wipro-logo.png';

const useStyles = makeStyles({
  img: {
    height: 20,
  },
});

const LogoIcon = () => {
  const classes = useStyles();

  return (
    <img className={classes.img} alt="app-logo" src={wiproLogo} />
  );
};

export default LogoIcon;
