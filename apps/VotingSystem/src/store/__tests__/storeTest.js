import {Map, fromJS} from 'immutable';
import * as matchers from "jest-immutable-matchers";

import makeStore from '../store';

describe('store', () => {
  beforeEach(function() {
    jest.addMatchers(matchers);
  });

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).toEqualImmutable(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', '28 Days Later']
    });
    expect(store.getState()).toEqualImmutable(fromJS({
      entries: ['Trainspotting', '28 Days Later']
    }));
  });

});