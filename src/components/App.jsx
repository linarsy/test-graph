import React from 'react';

import connect from '../connect';
// import {  } from '../selectors';
import Header from './Header';
import Tablee from './Table';

// const mapStateToProps = (state) => {

//   return {  };
// };

// @connect(mapStateToProps)
class App extends React.Component {
  render() {
    // const {

    // } = this.props;

    return (
      <div className="container my-5">
        <Header />
        <Tablee />
      </div>
    );
  }
}

export default App;
