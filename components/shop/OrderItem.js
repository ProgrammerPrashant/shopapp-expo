import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CartItem from './CartItem';
import Card from '../UI/Card';
const OrderItem = props => {

    const[showDetails, setShowDetails] = useState(false);


return (
<Card style={styles.OrderItem}> 
    <View style={styles.summary}>
<Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
<Text style={styles.date}>{props.date}</Text>
</View>
<Button color="grey" title={showDetails ? "Hide Details" : "Show Details"} onPress={
    () => {
        setShowDetails(prevState => !prevState);
    }} />

{showDetails  && (
     <View style={styles.detailItems}>
    {props.items.map(cartItem => (
    <CartItem
     key={cartItem.productId}
     quantity={cartItem.quantity}
     amount={cartItem.sum}
     title={cartItem.productTitle}
     />
     ))}
    </View>
    
    )}
    </Card>

);
    };




const styles = StyleSheet.create({

detailItems: {

    width: '100%'

},

OrderItem : {

  
     margin : 20,
     padding: 10,
    
    alignItems: 'center'

},

summary: {

flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
width: '100%',
marginBottom: 15

},

totalAmount: {

    fontSize: 16

},

date: {

fontSize: 16,
color: '#888'

}

});


export default OrderItem;