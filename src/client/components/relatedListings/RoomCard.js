import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Rating from './Rating';
import { heart } from '../../lib/svg';
import updateFavorites from "../../actionCreators/updateFavorites";

const RoomCard = function ({type, tag, description, id, beds, price, rating, reviews, imgs, favorites, updateFavorites}) {

  const favorite = (favorites.includes(id) ? true : false)

  const onClick = function() {
    updateFavorites(id)
  }

  if (imgs) {
    const thumbNail = imgs[0];
    return (
      <div className="p-2">
        <div style={{ position: 'relative' }} className="card">
          {heart(favorite, onClick)}
          <a target="_self" href={`${window.location.origin}/rooms/${id}`}><img style={{cursor: "pointer"}} className="m-auto w-100 h-auto card-img-top" src={thumbNail} alt=""/></a>
        </div>
  
        <div style={{cursor: "pointer"}} className="mt-2 p-0 card-body" >
          <div className="mb-0 room-type d-flex" style={{ height: '20px' }}>
            {tag === 'PLUS' ? (
              <span
                className="mr-1 small px-1 border rounded"
                style={{ backgroundColor: 'rgb(166, 30, 85)' }}
              >
                <span className="text-light" style={{ fontWeight: 800 }}>
                  PLUS
                </span>
              </span>
            ) : (
              ""
            )}
  
            <div className=" " style={{ fontSize: '10px', lineHeight: '20px' }}>
              <span
                style={
                  tag === 'PLUS'
                    ? { color: 'rgb(166, 29, 85)', fontWeight: 800 }
                    : { fontWeight: 800 }
                }
              >
                {tag === 'PLUS' ? 'VERIFIED' : type} &#183; {beds} BEDS
              </span>
            </div>
          </div>
          <div className="h6 m-0">
            <strong style={{ fontSize: '14px' }}>{description}</strong>
          </div>
          <div className="small">${price} per night</div>
          <div className="small">
            <Rating
              rating={rating}
              roomId={id}
              color={tag === 'PLUS' ? 'purple' : 'teal'}
            />
            <span>{reviews}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return ""
  }
}

const mapStateToProps = function(state) {
  return {
    favorites: state.user.favorites
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    updateFavorites: bindActionCreators(updateFavorites, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomCard);

 