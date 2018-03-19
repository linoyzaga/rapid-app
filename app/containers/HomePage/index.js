import React from 'react';
import { Button, Avatar } from 'antd';
import H1 from '../../components/H1';
import styles from './HomePage.css';
import jwtDecode from 'jwt-decode';
import Draggable from 'react-draggable';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 50,
      y: 50,
    };

    this.logout = this.logout.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
  }

  componentWillMount() {
    const token = JSON.parse(localStorage.getItem('token'));

    this.name = jwtDecode(token).name;
    this.id = jwtDecode(token).id;

    const position = localStorage.getItem(this.id);
    if (position) {
      const parsedPosition = JSON.parse(position);

      this.setState({
        x: parsedPosition.x,
        y: parsedPosition.y,
      });
    }
  }

  logout() {
    localStorage.removeItem('token');

    this.props.history.push('/');
  }

  saveLocation(e, data) {
    localStorage.setItem(this.id, JSON.stringify({ x: data.x, y: data.y }));
  }

  render() {
    return (<div>
      <div className={styles.logout}>
        <Button onClick={this.logout}>Log out</Button>
      </div>
      <H1>Hello, {this.name}</H1>
      <Draggable onStop={this.saveLocation} defaultPosition={{ x: this.state.x, y: this.state.y }}>
        <Avatar shape="square" size="large" icon="user" className={styles.thumbnail} />
      </Draggable>
    </div>);
  }
}
