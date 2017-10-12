import {createStore} from 'redux';
import reducer from '../reducer/reducer';

export default function makeStore() {
  return createStore(reducer);
}