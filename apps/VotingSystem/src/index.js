import makeStore from './store/store';
import startServer from './clientServer/server';

export const store = makeStore();
startServer();