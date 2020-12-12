import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import callAPI from './../utils/apiCaller';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import PermMediaIcon from '@material-ui/icons/PermMedia';

const styles = (theme) => ({
  root: {
    maxWidth: 900,
  },
  icon: {
    maxWidth: 50,
    margin: '10px 0',
  },
});
class PostStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image: [],
      text: '',
      isLoad: false,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleFileChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append('image', this.state.image);
    data.append('author', this.props.profile._id);
    data.append('text', this.state.text);
    callAPI('', 'POST', data).then((res) => {
      this.setState({ open: false, isLoad: true });
    });
  };
  render() {
    if (this.state.isLoad === true) {
      window.location.assign('/');
    }
    const { classes } = this.props;
    return (
      <Fragment>
        <IconButton onClick={this.handleOpen} >
          <AddCircleIcon />
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <IconButton onClick={this.handleClose} className={classes.icon}>
            <CloseIcon />
          </IconButton>
          <DialogTitle>Tạo bài viết</DialogTitle>
          <DialogContent>
            <form onSubmit={this.submitHandler} autocomplete="off">
              <TextField
                color="primary"
                id="text-field-post"
                className={classes.root}
                rows="3"
                variant="filled"
                label="Write Something..."
                type="text"
                name="text"
                onChange={this.changeHandler}
              />
              <Button id="input-file" variant="contained" component="label">
                <PermMediaIcon />
                <input
                  onChange={this.handleFileChange}
                  type="file"
                  style={{ display: 'none' }}
                />
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Đăng
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(PostStatus)
);
