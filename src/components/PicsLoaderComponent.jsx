import React, { Component } from 'react';
import './css/picsLoaderComponent.css';
import { ImageModal } from './ImageModal.jsx';

export class PicsLoaderComponent extends Component {

  constructor(props) {
    super(props);
    this.commentRef = React.createRef();
    this.state = {
      imageData: this.props.imageData, searchText: '', isOpenDialog: false,
      selectedImage: '', commentText: '', isLike: true
    }
  }
  /**
   * This method is used to handle onclick of images.
   * @param {*} e 
   * @param {*} param1 
   */
  handleItemClick = (e, selectedImage) => {
    e.stopPropagation();
    this.setState({ selectedImage, isOpenDialog: !this.state.isOpenDialog });
  }
  /**
   * This method is used to post comment locally
   * @param {*} e 
   * @param {*} selectedImage 
   */
  postComment = (e, selectedImage) => {
    e.stopPropagation();
    const updatedData = this.state.imageData.map(dataObj => {
      if (dataObj.id === selectedImage.id) {
        dataObj.comments.push(this.state.commentText);
      }
      return dataObj;
    })
    this.setState({ imageData: updatedData });
  }
  /**
   * This method is used to delete comment locally
   * @param {*} e 
   * @param {*} selectedImage 
   * @param {*} index 
   */
  deleteComment = (e, selectedImage, index) => {
    e.stopPropagation();
    const updatedData = this.state.imageData.map(dataObj => {
      if (dataObj.id === selectedImage.id) {
        dataObj.comments.splice(index, 1);
      }
      return dataObj;
    })
    this.setState({ imageData: updatedData });
  }
  /**
   * This method is used to like or unlike pic
   * @param {*} e 
   * @param {*} selectedImage 
   */
  likeOrUnlike = (e, selectedImage) => {
    e.stopPropagation();
    const updatedData = this.state.imageData.map(dataObj => {
      if (dataObj.id === selectedImage.id) {
        if (dataObj.isLike) {
          dataObj.isLike = false;
          dataObj.likes = dataObj.likes + 1;
        } else {
          dataObj.isLike = true;
          dataObj.likes = dataObj.likes - 1;
        }
      }
      return dataObj;
    })
    this.setState({ imageData: updatedData });
  }
  /**
   * This method is on change event of search text
   * @param {*} e 
   */
  onSearchChange = (e) => {
    const filteredData = this.getDataAfterSearch(this.props.imageData, e.target.value);
    this.setState({ imageData: filteredData, searchText: e.target.value });
  }
  /**
   * This method is on change event of comment text
   * @param {*} e 
   */
  onCommentChange = (e) => {
    this.setState({ commentText: e.target.value });
  }
  /**
   * This method is used to sort the pics as per the like count
   */
  getMostLiked = () => {
    const filteredData = this.props.imageData.sort((a, b) => (b.likes > a.likes)
      ? 1 : ((a.likes > b.likes) ? -1 : 0));
    const searchedData = this.getDataAfterSearch(filteredData, this.state.searchText);
    this.setState({ imageData: searchedData });
  }
  /**
   * This method is used to sort the pictures list as per the comments count
   */
  getMostCommented = () => {
    const filteredData = this.props.imageData.sort((a, b) => (b.comments.length > a.comments.length)
      ? 1 : ((a.comments.length > b.comments.length) ? -1 : 0));
    const searchedData = this.getDataAfterSearch(filteredData, this.state.searchText);
    this.setState({ imageData: searchedData });
  }
  /**
   * This is callback from child component i.e. ImageModal to close dialog.
   */
  closeDialog = () => {
    this.setState({ isOpenDialog: false });
  }
  /**
   * This is common method to filter out pictures list as per search text
   * @param {*} filteredData 
   * @param {*} searchText 
   */
  getDataAfterSearch(filteredData, searchText) {
    return filteredData.filter(dataObj => {
      return dataObj.category.toLowerCase().includes(searchText.toLowerCase())
    });
  }

  render() {
    const { imageData, selectedImage, isOpenDialog } = this.state;
    return (
      <div className='whole-widget'>
        <div className='search-widget'>
          <span className='most-text'>
            <span className='liked-text' onClick={(e) => { this.getMostLiked() }}>Most Liked</span>
            <span>  |  </span>
            <span className='liked-text' onClick={(e) => { this.getMostCommented() }}>Most Commented</span>
          </span>
          <input type='text' onChange={(e) => { this.onSearchChange(e) }} maxLength={20} className='search-text' placeholder='Search images...' />
        </div>
        <div className='image-widget'>
          {imageData && imageData.length > 0 && imageData.map((dataObj, index) => {
            return (
              <div key={index} className='image-item'>
                <img src={dataObj.url} className='image-class'
                  onClick={(e) => { this.handleItemClick(e, dataObj) }} alt={dataObj.category}></img>
                <div className='like-section'>
                  <span className='like-number'>{dataObj.likes}</span>
                  <span className='like-unlike-text' onClick={(e) => { this.likeOrUnlike(e, dataObj) }}>{dataObj.isLike ? 'Like' : 'Unlike'}</span>
                  <span className='category-name'>{dataObj.category}</span>
                </div>
                <div className='comment-section'>
                  <div className='add-comment-section'>
                    <input onChange={(e) => { this.onCommentChange(e) }} type='text' maxLength={20} placeholder='Type your comment here...' className='comment-input' />
                    <span className='comment-post' onClick={(e) => { this.postComment(e, dataObj) }}>Post</span></div>
                  <ul className='comment-list'>
                    {dataObj.comments.length > 0 && dataObj.comments.map((commentObj, cIndex) => {
                      return (<li className='comment-list-item' key={cIndex}>{commentObj} <span onClick={(e) => { this.deleteComment(e, dataObj, cIndex) }} title="Delete Comment" className='delete-comment'>--</span></li>);
                    })}
                  </ul>
                </div>
                <ImageModal show={isOpenDialog} selectedImage={selectedImage} closeDialog={this.closeDialog}></ImageModal>
              </div>);
          })}
        </div>
      </div>
    )
  }
}

export default PicsLoaderComponent;
