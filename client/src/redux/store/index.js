// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from 'redux/reducers';

// let composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     trace: true,
//     traceLimit: 25
//   })) ||
//   compose;

//   if(process.env.NODE_ENV !== 'development') {
//     composeEnhancers = compose
//   }

//   const store =  createStore(
//     rootReducer,
//     composeEnhancers(applyMiddleware(thunk))
//   )

//   export default store;