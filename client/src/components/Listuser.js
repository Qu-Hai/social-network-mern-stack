import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from './../actions/usersAction';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import * as Config from './../constants/Config';
import Divider from '@material-ui/core/Divider';
const styles = (theme) => ({
  theme: {
    marginTop: 10,
    borderRadius: 5,
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    display: 'flex',
    color: '#fff',
  },
});
class Listuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }
  componentWillMount() {
    this.props.getUsers();
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <List className={classes.theme}>
          {this.props.users.map((el, i) =>
            el._id !== this.props.profile._id ? (
              <Link exact to={el._id} key={i}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt=" "
                      src={`${Config.API_URL}/img/profile/${el.avatar}`}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={el.name} />
                </ListItem>
              </Link>
            ) : null
          )}
          <Divider orientation="vertical" />
        </List>
      </>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    users: state.users,
    profile: state.profile,
  };
}
export default withStyles(styles, { theme: true })(
  connect(mapStateToProps, { getUsers })(Listuser)
);
/* <div className="nav-right">
        {this.props.users.map((el, i) => (
          <Link exact to={el._id} key={i} className="user">
            <img src="" alt="avt" />
            <p>{el.name}</p>
          </Link>
        ))}
      </div> */
// <ListItem className={classes.root} key={i} button>
/* <ListItemAvatar>
<Avatar
  alt=" "
  src={`${Config.API_URL}/img/profile/${el.avatar}`}
/>
</ListItemAvatar>
<ListItemText primary={el.name} /> */
