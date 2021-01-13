import React, { Component } from 'react'
import { connect } from 'react-redux'
import img from '../assets/loading_spinner.gif'


export class Loading extends Component {

  render() {
  const loadingWidget = <div style={{ textAlign: 'center', margin: '10em 0 0 0' }}>
                          <img src={img} alt='loading' />
                        </div>;
  return (<div>{this.props.loading && loadingWidget}</div>)
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading
})

Loading = connect(
  mapStateToProps,
  null
)(Loading)


export default Loading;


