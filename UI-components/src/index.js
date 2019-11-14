import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './index.css';
import App from './components/App/App';
import combinedReducers from './reducer';
import rootSaga from './saga';

let sagaMiddleware = createSagaMiddleware();
let store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
