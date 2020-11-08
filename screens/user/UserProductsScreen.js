import React from 'react';
import {  Text, FlatList, Button, Alert, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const UserProductsScreen = props => {

const userProducts = useSelector(state => state.products.userProducts);
const dispatch = useDispatch();
const editProductHandler = (id) => {

    props.navigation.navigate('EditProduct', {productId: id});

};

const deleteHandler = (id) => {

    Alert.alert('Are You Sure ?', "Do You Really Want to delete This Item ?",[

    {text: 'No', style:'default'},
    {text: 'Yes', style:'destructive', onPress: () =>  {
            dispatch(productActions.deleteProduct(id));
        }
    } 
]);

};

if(userProducts.length === 0) {

    return <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <Text>No Products Found, maybe start creating more</Text>
        </View>

}

            return  (
            <FlatList data={userProducts}
            keyExtractor={item => item.id} 
            renderItem={itemData => ( 
            <ProductItem  
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    editProductHandler(itemData.item.id);
                }}
                
        >
            
            <Button color={Colors.secondary} 
                title="Edit"
                 onPress={() => { 
                    editProductHandler(itemData.item.id);
                  }} 
                 />


                <Button color={Colors.secondary}
                 title="Delete"
                  onPress={deleteHandler.bind(this, itemData.item.id)}
                  />
            </ProductItem>
        )}
/>
);
};

UserProductsScreen.navigationOptions = navData => {
return {
headerTitle: 'Your Products',
headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
<Item title="Menu" iconName={'md-menu'} onPress={() => {
        navData.navigation.toggleDrawer();
}} />
</HeaderButtons>,
headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
<Item title="Add" iconName={'md-create'} onPress={() => {
        navData.navigation.navigate('EditProduct');
}} />
</HeaderButtons>

};
}

export default UserProductsScreen;