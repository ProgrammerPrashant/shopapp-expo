import React, {useState} from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import ShopNavigator from './navigation/ShopNavigator';
import { enableScreens } from 'react-native-screens';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import { Provider } from 'react-redux';
enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart : cartReducer,
  orders : ordersReducer,
  auth : authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'fontawesome': require('./assets/fonts/fontawesome-webfont.ttf'),
//     'glyph': require('./assets/fonts/glyphicons-halflings-regular.ttf'),
//     'ionicons': require('./assets/fonts/ionicons.ttf')
//   });
  

// };

export default function App() {
  
//   const[fontLoaded, setFontLoaded] = useState(false);

//   if(!fontLoaded) {

// return (
//   <AppLoading
//   startAsync={fetchFonts}
//   onFinish={() => setFontLoaded(true)}
//   />

// );

//   }
  return <Provider store={store}>
    <ShopNavigator />
    </Provider>;
}


