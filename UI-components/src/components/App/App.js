import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { connect } from 'react-redux';
import Image from '../Image/Image';
import Attachments from '../Attachments/Attachments';
import { triggerRetrieveFiles } from '../../actions/files.action';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.triggerRetrieveFiles();
  }
  render() {

    return (
      <div className="App">
        <ReduxToastr
          timeOut={2000}
          newestOnTop={false}
          preventDuplicates
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar />
        <Image />
        <hr/>
        <Attachments/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    triggerRetrieveFiles: () => dispatch(triggerRetrieveFiles())
  }
}

export default connect(null, mapDispatchToProps)(App);
