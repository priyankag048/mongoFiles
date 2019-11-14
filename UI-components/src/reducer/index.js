import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { image, attachments } from './files.reducer';

export default combineReducers({
    image,
    attachments,
    toastr:toastrReducer
});