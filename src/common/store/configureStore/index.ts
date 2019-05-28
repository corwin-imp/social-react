import storeDev from './configureStore.dev';
import storeProd from './configureStore.prod';
let store = storeDev;
if (process.env.NODE_ENV === 'production') {
  let store = storeProd;

}
export default store;
