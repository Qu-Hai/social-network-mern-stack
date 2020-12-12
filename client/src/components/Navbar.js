import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';

import PostStatus from './PostStatus';
import Notifications from './Notifications';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
});
class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed" justify="center" className={classes.root}>
        <Toolbar className="nav-container">
          <PostStatus />

          <IconButton component={Link} to="/" color="inherit">
            <HomeIcon />
          </IconButton>
          <IconButton>
            <MailIcon />
          </IconButton>

          <Notifications />

          <IconButton>
            <AccountCircle />
          </IconButton>
          <Button color="inherit">{this.props.profile.name}</Button>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile: state.profile,
    users: state.users,
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Navbar));
// <div className="nav-left">
//   <ul>
//     <li>
//       <NavLink exact to="/" activeClassName="active">
//         <FaHome className="fas" />
//         Home
//       </NavLink>
//     </li>
//     <li>
//       <NavLink exact to="/chat/:slug" activeClassName="active">
//         <IoIosChatboxes className="fas" /> Chat
//       </NavLink>
//     </li>
//     <li>
//       <NavLink exact to="/about" activeClassName="active">
//         <MdAccountBox className="fas" />
//         About
//       </NavLink>
//     </li>
//     <li>
//       <NavLink exact to="/setting" activeClassName="active">
//         <MdSettings className="fas" />
//         Setting
//       </NavLink>
//     </li>
//     <li>
//       <NavLink exact to="/logout" activeClassName="active">
//         <IoIosRedo className="fas" />
//         Logout
//       </NavLink>
//     </li>
//   </ul>
// </div>
