import React, { Component } from 'react';
import { getAllImages } from '../actions';
import { connect } from 'react-redux';
import { Loading } from '../components/Loading.jsx';
import { PicsLoaderComponent } from '../components/PicsLoaderComponent.jsx';
import './css/app.css';

export class App extends Component {

  constructor(props) {
    super(props);
    this.props.getAllImages();
  }

  render() {
    const { isLoading, imageData } = this.props;
    return (
      <div>
        <header className="app-header">
          <div className='app-name'>Imaginary</div>
        </header>
        <div>
          {isLoading ? <Loading /> : <PicsLoaderComponent imageData={imageData} />}
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = {
  getAllImages: getAllImages,
};

const mapStateToProps = (state) => ({
  imageData: state.imageData,
  isLoading: state.loading
});

App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);


export default App;
