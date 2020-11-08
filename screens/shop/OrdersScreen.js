import React, { useEffect, useState } from 'react';
import {View, FlatList, Text, ActivityIndicator, StyleSheet} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';
const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

const orders = useSelector(state => state.orders.orders);
const dispatch = useDispatch();

useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(() => {
        setIsLoading(false);
    });
}, [dispatch]);

if(isLoading) {

    return <View style={styles.centered}><ActivityIndicator size="large" color={Colors.primany} /></View>
}

if(orders.length === 0) {

    return <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <Text>No Order Found, maybe start creating more</Text>
        </View>

}

return (

    <FlatList
data={orders}
 keyExtractor={item => item.id}
  renderItem={itemData => ( 
  <OrderItem 
  items={itemData.item.items}
    amount={itemData.item.totalAmount}
   date={itemData.item.readableDate} 
   
   />
   )}
    /> 

);

};

OrdersScreen.navigationOptions = navData => {
return {
    headerTitle : "Your Orders",
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Menu" iconName={'md-menu'} onPress={() => {
            navData.navigation.toggleDrawer();
    }} />
</HeaderButtons>,
    headerRight: () =>  <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Cart" iconName={'md-cart'} onPress={() => {
                        navData.navigation.navigate({routeName: 'Cart'})
                }} />
        </HeaderButtons>

}
};

const styles = StyleSheet.create({

centered : { 
flex : 1,
justifyContent: 'center',
alignItems : 'center'
}
});

export default OrdersScreen;