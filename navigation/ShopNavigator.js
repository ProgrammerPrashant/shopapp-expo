import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
 import {createAppContainer} from 'react-navigation';
 import { createSwitchNavigator } from 'react-navigation';
 import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
 import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
 import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
 import CartScreen from '../screens/shop/CartScreen';
 import OrdersScreen from '../screens/shop/OrdersScreen';
 import { Ionicons } from '@expo/vector-icons';
 import Colors from '../constants/Colors';
 import { SafeAreaView, Button, View } from 'react-native';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/user/AuthScreen';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';


const defaultNavOptions = {  headerStyle: {

  backgroundColor : Colors.headerpink
},
headerTintColor: "white"

};

const ProductsNavigator = createStackNavigator ({

ProductsOverview: ProductsOverViewScreen,
ProductDetail: ProductDetailScreen,
Cart : CartScreen
}, {
  navigationOptions: {

    drawerIcon : drawerConfig => <Ionicons name="md-cart"
    color={drawerConfig.tintColor}
    size={23}  />

  },

defaultNavigationOptions: defaultNavOptions

});

const OrdersNavigator = createStackNavigator({

  Orders : OrdersScreen

}, {

  navigationOptions: {

    drawerIcon : drawerConfig => <Ionicons name="md-list"
    color={drawerConfig.tintColor}
    size={23}  />

  },
  defaultNavigationOptions : defaultNavOptions

});


const AdminNavigator = createStackNavigator({

  UserProducts : UserProductsScreen,
  EditProduct: EditProductScreen

}, {

  navigationOptions: {

    drawerIcon : drawerConfig => <Ionicons name="md-create"
    color={drawerConfig.tintColor}
    size={23}  />

  },
  defaultNavigationOptions : defaultNavOptions

});


const ShopNavigator = createDrawerNavigator({

Products : ProductsNavigator,
Orders : OrdersNavigator,
Admin : AdminNavigator

}, {

contentOptions: {

  activeTintColor : 'pink'

}, 

contentComponent: props => {
  const dispatch = useDispatch();
  return <View style={{flex:1, paddingTop:20}}>
      <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
        <DrawerItems {...props}  />
        <Button title="Logout" color="red" onPress={
            () => { dispatch(authActions.logout());
            props.navigation.navigate('Auth');
            }
        } />
      </SafeAreaView>
    </View>
}

});


const AuthNavigator = createStackNavigator({
  Auth : AuthScreen
}, {
  defaultNavigationOptions : defaultNavOptions
});

const MainNavigator = createSwitchNavigator({
    Startup : StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator

});

export default createAppContainer(MainNavigator);