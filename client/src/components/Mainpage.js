import React, { Component } from 'react';
import CreateStatus from './CreateStatus';
// import WriteStatus from './WriteStatus';
import { connect } from 'react-redux';
import { getStatus } from './../actions/statusAction';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
const styles = (theme) => ({
  root: {
    maxWidth: '100%',
  },
});
class Mainpage extends Component {
  UNSAFE_componentWillMount = () => {
    if (localStorage.IDToken === undefined)
      // this.props.history.push('/login')
      window.location.assign('/login');
  };
  componentDidMount = () => {
    this.props.getStatus();
  };

  render() {
    dayjs.extend(relativeTime);
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        {this.props.status.map((el, i) => (
          <CreateStatus
            key={i}
            id={el._id}
            likePerson={el.likePerson}
            avatar={el.author.avatar}
            name={el.author.name}
            text={el.text}
            image={el.image}
            like={el.like}
            dayjs={dayjs(el.create).fromNow()}
          />
        ))}
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return { status: state.status, profile: state.profile };
}
export default withStyles(styles)(
  connect(mapStateToProps, { getStatus })(Mainpage)
);
