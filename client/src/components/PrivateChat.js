import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
const styles = (theme) => ({
  root: {
    minHeight: 'calc(100vh - 84px)',
    maxHeight: 'calc(100vh - 84px)',
    maxWidth: 600,
    margin: '10px 25px 0',
    backgroundColor: theme.palette.background.paper,
    color: '#ffffff',
    overflowY: 'scroll',
  },
  fixed: {
    position: 'fixed',
    bottom: 10,
    marginLeft: 50,
  },
  paper: {
    backgroundColor: '#121212',
    display: 'inline',
    maxWidth: '70%',
    whiteSpace: 'normal',
  },
  name: {
    position: 'fixed',
    top: 100,
    marginLeft: 50,
  },
  divider: {
    marginTop: 50,
  },
});
class PrivateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      data: [],
      text: '',
      user: [],
    };
  }
  initSocket = () => {
    const socket = io('http://localhost:5000/chat');
    this.setState({ socket });
    const id = window.location.pathname.substring(6);
    console.log(id);
    socket.emit('new', localStorage.IDUser);
    socket.on(id, (data) => {
      this.setState({ data: [...this.state.data, data] });
      console.log(this.state);
    });
  };
  componentWillMount() {
    this.initSocket();
  }
  componentWillUpdate() {
    axios
      .get(
        `http://localhost:5000/users/chat/${window.location.pathname.substring(
          6
        )}`
      )
      .then((res) => {
        this.setState({ user: res.data.data });
      });
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.state.socket.emit('send_message', {
      mss: this.state.text,
      from: this.props.profile._id,
      to: window.location.pathname.substring(6),
    });
    this.setState({
      data: [
        ...this.state.data,
        {
          mss: this.state.text,
          from: this.props.profile._id,
          to: this.state.user._id,
        },
      ],
    });
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={`scroll ${classes.root}`}>
        <Typography className={classes.name}>{this.state.user.name}</Typography>
        <Divider color="primary" className={classes.divider} />
        {this.state.data.map((el) => (
          <div className="mess-left">
            <Box
              display="flex"
              flexDirection={
                el.from === this.props.profile._id ? 'row-reverse' : 'row'
              }
            >
              <Box
                component="div"
                mt={1}
                ml={1}
                mr={1}
                p={1}
                borderRadius={15}
                className={classes.paper}
              >
                {el.mss}
              </Box>
            </Box>
          </div>
        ))}

        <form className={classes.fixed} onSubmit={this.submitHandler}>
          <Input
            inputProps={{ 'aria-label': 'description' }}
            name="text"
            onChange={this.changeHandler}
          />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return { profile: state.profile };
}
export default withStyles(styles)(connect(mapStateToProps)(PrivateChat));
