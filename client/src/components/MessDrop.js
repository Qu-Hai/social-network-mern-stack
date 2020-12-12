import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
const styles = () => ({
  root: {
    maxWidth: 400,
    top: 64,
    bgColor: '#121212',
  },
});
class MessDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <IconButton onClick={this.handleOpen} color="inherit"></IconButton>
        <Menu open={this.state.open} onClose={this.handleClose}>
          <ListItemText className={classes.root}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ea
            dicta autem id odio nobis. Quis dolor minima id temporibus?
          </ListItemText>
        </Menu>
      </Fragment>
    );
  }
}
export default withStyles(styles)(MessDrop);
