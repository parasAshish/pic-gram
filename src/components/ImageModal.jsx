import React, { Component } from 'react';
import './css/imageModal.css';


export class ImageModal extends Component {

  closeModal = (e) => {
    e.stopPropagation();
    this.props.closeDialog();
  }
  render() {
    const { selectedImage, show } = this.props;
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
      <div className={showHideClassName} onClick={(e) => { this.closeModal(e) }}>
        <div className='modal-main'>
          <img
            src={selectedImage.url}
            alt={selectedImage.category}
            width={600}
            height={500}
          />
        </div>
      </div>
    );
  }
}

export default ImageModal;


