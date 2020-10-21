/**
 * Copyright (c) ...
 * All rights reserved.
 */

import Store from 'diox';
import routes from 'scripts/store/routes';
import router from 'diox/extensions/router';

const store = new Store();
console.log(router([]));
store.register('router', router(Object.keys(routes)));

export { Store, store };
