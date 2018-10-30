import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import changeActiveImage from '../../actionCreators/changeActiveImage';
import toggleModal from '../../actionCreators/toggleModal'

const GalleryImage = function ({idx, img, changeActiveImage, toggleModal}) {
  return <img src={img} alt="" onClick={() => {
    changeActiveImage(idx);
    toggleModal();
  }} />
}

const mapDispatchToProps = function(dispatch) {
  return {
    changeActiveImage: bindActionCreators(changeActiveImage, dispatch),
    toggleModal: bindActionCreators(toggleModal, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(GalleryImage);