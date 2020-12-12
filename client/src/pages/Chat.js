import PrivateChat from './../components/PrivateChat';

import './../Style.css';

import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Profile from './../components/Profile';
// import Mainpage from './../components/Mainpage';
import Container from '@material-ui/core/Container';
import Listuser from './../components/Listuser';

const useStyle = makeStyles({
  root: {
    backgroundColor: '#121212',
    marginTop: '64px',
    paddingTop: 10,
    minHeight: 'calc(100vh - 64px)',
    maxHeight: 'calc(100vh - 64px)',
    overflow: 'hidden',
  },
});

export default function Chat() {
  // return <Container Main={Mainpage}></Container>;
  const classes = useStyle();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item xl={3} lg={3} sm={3} md={3} xs={12}>
            <Listuser />
          </Grid>
          <Grid item xl={6} lg={6} sm={6} md={6} xs={12}>
            <PrivateChat />
          </Grid>
          <Grid item xl={3} lg={3} sm={3} md={3} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
