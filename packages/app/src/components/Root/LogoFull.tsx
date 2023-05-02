import React from 'react';
import { makeStyles } from '@material-ui/core';
import wiproLogo from './Wipro-logo.png';

const useStyles = makeStyles({
  img: {
    height: 80,
  },
});
const LogoFull = () => {
  const classes = useStyles();

  return (
    <img className={classes.img} alt="app-logo" src={wiproLogo} />
  );
};

export default LogoFull;
