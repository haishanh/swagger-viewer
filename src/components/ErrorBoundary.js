import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = { error: null };

  // componentDidMount() { }

  componentDidCatch(error, _info) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return <h1>something is wrong!!!</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
