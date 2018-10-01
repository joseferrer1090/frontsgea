import { createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";

const layoutSiderCollapse = (state={siderCollapse:true,isMobile:false}, action) => {
  if (action.type === "CHANGE_LAYOUT_COLLAPSED") {
    return  Object.assign({},state,{siderCollapse:action.payload})
  } else if(action.type ==="IS_MOBILE"){
    return {...state, isMobile:action.payload}
  }
  return state;
}

const logger = store => next => action =>{
  console.log('dispatching',action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

export default createStore(layoutSiderCollapse, applyMiddleware(logger, thunk));