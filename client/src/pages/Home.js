import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Profile from './../components/Profile';
import Mainpage from './../components/Mainpage';
import Container from '@material-ui/core/Container';
import Listuser from './../components/Listuser';
import CssBaseline from '@material-ui/core/CssBaseline';
const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: '64px',
    paddingTop: 10,
    minHeight: 'calc(100vh - 64px)',
    maxHeight: 'calc(100vh - 64px)',
    overflowY: 'scroll',
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Home() {
  // return <Container Main={Mainpage}></Container>;
  const classes = useStyle();
  return (
    <Container className={`${classes.root} scroll`}>
      <CssBaseline />
      <Grid container justify="center" color="inherit">
        <Grid item lg={3} sm={4} md={4} xs={12}>
          <Listuser />
        </Grid>
        <Grid item lg={6} sm={4} md={4} xs={12}>
          <Mainpage />
        </Grid>
        <Grid item lg={3} sm={4} md={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    </Container>
  );
}
