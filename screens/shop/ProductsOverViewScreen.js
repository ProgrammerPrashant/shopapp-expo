import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, StyleSheet, Button, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActtions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';
const ProductsOverViewScreen = props => {
const [isLoading, setIsLoading] = useState(false);
const [isRefreshing, setIsRefreshing] = useState(false);
const [error, setError] = useState();
const products = useSelector(state => state.products.availableProducts);

const dispatch = useDispatch();

const loadProducts = useCallback(async () => {
        setError(null);

        setIsRefreshing(true);
       
        try {
        await dispatch(productActions.fetchProducts());
        }
        catch(err) {
        setError(err.message);
        }
        setIsRefreshing(false);

}, [dispatch, loadProducts, setError]);

useEffect(() => {
     const willFocusSub =  props.navigation.addListener('willFocus', loadProducts);
        return () => {
                willFocusSub.remove();
        };
}, [loadProducts]);


useEffect(() => {
       
        setIsLoading(true);
        loadProducts().then(() => {
                setIsLoading(false);
        });

}, [dispatch, loadProducts]);

const selectItemHandler = (id, title) => {

        props.navigation.navigate('ProductDetail', {
                productId : id,
                productTitle: title
            
            });

};

        if(error) {
                return (
                <View style={styles.centered}>
                        <Text>An Error Ocured</Text>
                        <Button title="Try Again" onPress={loadProducts} color={Colors.secondary} />
                        </View>
                        );
        }
        if(isLoading) {
                return <View style={styles.centered}>
                        <ActivityIndicator size="large" color={Colors.primany} />
                        </View>
        }

        if(!isLoading && products.length === 0) {
                return <View style={styles.centered}>
                        <Text>No Products Found !! </Text>
                        </View>
        }

return ( <FlatList onRefresh={loadProducts} refreshing={isRefreshing} data={products} keyExtractor={item => item.id}
        renderItem={itemData => <ProductItem image={itemData.item.imageUrl} 
        price={itemData.item.price}
        title={itemData.item.title}
         onSelect={() => { 
                selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        
          >

                <Button color={Colors.secondary} 
                title="View Details"
                 onPress={() => { 
                        selectItemHandler(itemData.item.id, itemData.item.title);
                  }} 
                 />


                <Button color={Colors.secondary}
                 title="To Cart"
                  onPress={() => {
                        dispatch(cartActtions.addToCart(itemData.item)); }
                  }
                  />
          </ProductItem>
        }
/>
);
};

ProductsOverViewScreen.navigationOptions = navData => {
    return {
    headerTitle : "All Products",
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

};

};

const styles = StyleSheet.create({

centered : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
}

});

export default ProductsOverViewScreen;