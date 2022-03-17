import Store from 'diox';
import routes from 'scripts/store/routes';
import router from 'diox/extensions/router';
import connect from 'diox/connectors/react';

const store = new Store();
const useCombiner = connect(store);
const mutate = store.mutate.bind(store);
const dispatch = store.dispatch.bind(store);
store.register('router', router(Object.keys(routes)));

export default store;
export { useCombiner, mutate, dispatch };
