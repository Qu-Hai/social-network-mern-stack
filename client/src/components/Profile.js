import React, { Component } from 'react';
import { getProfile } from './../actions/profileAction';
import * as Config from './../constants/Config';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';

import EditProfile from './EditProfile';
// import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
// import Button from '@material-ui/core/Button';
// import callAPI from './../utils/apiCaller';
const styles = (theme) => ({
  root: {
    marginTop: 10,
    backgroundColor: theme.palette.background.paper,
  },
  img: {
    margin: '10px auto 0',
    width: 200,
    height: 200,
    borderRadius: '50%',
  },
  name: {
    textAlign: 'center',
    fontWeight: 900,
  },
  text: {
    margin: '0 auto',
    textAlign: 'center',
  },
  icon: {
    display: 'block',
    margin: '0px auto',
    maxWidth: 50,
  },
});
class Profile extends Component {
  componentDidMount = () => {
    this.props.getProfile();
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.img}
          component="img"
          src={`${Config.API_URL}/img/profile/${this.props.profile.avatar}`}
        />
        <EditProfile id="edit-profile" />

        <CardContent>
          <Typography
            className={classes.name}
            variant="button"
            component="h2"
            gutterBottom
          >
            {this.props.profile.name}
          </Typography>
        </CardContent>
        <Typography className={classes.text}>
          Joined {dayjs(Date.now()).format('DD MMM YYYY')}
        </Typography>
        <Typography className={classes.text}>
          <RoomIcon color="secondary" />
          <h3>{this.props.profile.location}</h3>
        </Typography>
      </Card>
    );
  }
}
function mapStateToProps(state, ownProp) {
  return { profile: state.profile };
}
export default withStyles(styles)(
  connect(mapStateToProps, { getProfile })(Profile)
);
