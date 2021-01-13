import { GET_ALL_IMAGES, IMAGES_RECEIVED } from "../constants/AppConstants";

const reducer = (state = {}, action) => {
   switch (action.type) {
      case GET_ALL_IMAGES:
         return { ...state, loading: true };
      case IMAGES_RECEIVED:
         return { ...state, imageData: getDerivedTest(action.imageData), loading: false }
      default:
         return state;
   }
};

/**
 * This will add isLike flag to the store every time. We can call this as 'Selector';
 * @param {*} state 
 */
const getDerivedTest = (state) => {
   return state.pics.map((dataObj, index) => {
      if (index === 1) {
         dataObj.isLike = false;
      } else {
         dataObj.isLike = true;
      }
      return dataObj;
   })
}

export default reducer;
