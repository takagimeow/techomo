import { createStore, combineReducers } from 'redux';
import { coreReducer } from 'src/reducers/coreReducer';

const rootReducer = combineReducers({
  core: coreReducer,
});

export const configureStore = () => createStore(rootReducer);
