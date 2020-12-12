import React, { Component } from 'react';
import * as Config from './../constants/Config';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import { likeStatus } from './../actions/likeAction';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
const styles = () => ({
  root: {
    marginTop: 10,
    backgroundColor: '#424242',
    color: '#ffffff',
  },
  media: {
    backgroundColor: '#000',
    objectFit: 'contain',
    display: 'flex',
    justifyItems: 'center',
  },
  text: {
    marginLeft: 10,
  },
});

class CreateStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: this.props.likePerson.includes(localStorage.IDUser),
      countLike: 0,
    };
  }
  componentDidMount() {
    console.log(this.props.likePerson.includes(localStorage.IDUser));
  }
  handleLikeChange = async (e) => {
    await this.setState({
      isLike: !this.state.isLike,
    });

    if (!this.state.isLike) {
      this.setState({
        countLike: this.state.countLike - 1,
      });
      this.props.likeStatus('unlike', this.props.id, {
        likePerson: this.props.profile._id,
      });
    } else {
      this.setState({
        countLike: this.state.countLike + 1,
      });
      this.props.likeStatus('like', this.props.id, {
        likePerson: this.props.profile._id,
      });
    }
  };
  render() {
    const { classes, avatar, dayjs, name, text, image, like } = this.props;
    let { isLike } = this.state;
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar src={`${Config.API_URL}/img/profile/${avatar}`} />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name}
          subheader={dayjs}
        />

        <Typography className={classes.text} component="h4">
          {text}
        </Typography>
        <CardMedia
          className={classes.media}
          component="img"
          src={`${Config.API_URL}/img/${image}`}
        />
        <IconButton onClick={this.handleLikeChange}>
          <FavoriteIcon color={!isLike ? 'primary' : 'secondary'} />
          <Typography component="b">{like + this.state.countLike}</Typography>
        </IconButton>

        <IconButton>
          <ChatIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Card>
    );
  }
}

function mapStateToProps(state, ownProp) {
  return { profile: state.profile };
}
export default withStyles(styles)(
  connect(mapStateToProps, { likeStatus })(CreateStatus)
);
