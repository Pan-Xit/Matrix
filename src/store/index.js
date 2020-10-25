import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import {matrixReducer} from '../reducers';


export default createStore(matrixReducer, devToolsEnhancer());