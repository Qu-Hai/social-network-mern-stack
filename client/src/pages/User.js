import React, { Component } from 'react';
import { FaCircle } from 'react-icons/fa';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import ChatLeft from './../components/ChatLeft';
import ChatRight from './../components/ChatRight';

class User extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      data: [],
      text: '',
    };
  }
  initSocket = () => {
    const socket = io('http://localhost:5000/chat');
    this.setState({ socket });
    socket.emit('new', localStorage.IDUser);
    socket.on('new_message', (data) => {
      this.setState({ data: [...this.state.data, data] });
      console.log(this.state);
    });
  };
  componentWillMount() {
    this.initSocket();
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
          to: window.location.pathname.substring(6),
        },
      ],
    });
    console.log(this.state);
  };

  render() {
    return (
      <div className="main-chat">
        <div className="profile-chat">
          <img src={require('./../avatar-1.svg')} alt="" />
          <div className="action-chat">
            <p>Quach Hai</p>
            <FaCircle className="cicle" />
          </div>
        </div>
        <div className="mess">
          {this.state.data.map((el, i) =>
            el.from === this.props.profile._id ? (
              <ChatRight key={i} textcontent={el.mss} />
            ) : (
              <ChatLeft key={i} textcontent={el.mss} />
            )
          )}
        </div>
        <div className="input-chat">
          <form action="" onSubmit={this.submitHandler}>
            <input type="text" name="text" onChange={this.changeHandler} />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { profile: state.profile };
}
export default connect(mapStateToProps)(User);
