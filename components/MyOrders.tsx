import { useHomeStyles } from '@/assets/styles/styles'
import useTheme from '@/hooks/useTheme'
import React from 'react'
import { Text, View } from 'react-native'
import OrdersList from './OrdersList'

const MyOrders = () => {
    const styles = useHomeStyles()
    const {colors}=useTheme();
   const orderDummyData = [
  {
    "id": "67a20934b3db72db5cc77b2b",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "items": [
      {
        "product": {
          "id": "67a1f4e43f34a77b6dde9144",
          "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
          "name": "Apple AirPods Pro",
          "description": "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit.",
          "price": 499.99,
          "offerPrice": 399.99,
          "image": [
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/lrllaprpos2pnp5c9pyy.png"
          ],
          "category": "Earphone",
          "date": 1738667236865,
          "__v": 0
        },
        "quantity": 1,
        "id": "67a20934b3db72db5cc77b2c"
      }
    ],
    "amount": 399.99,
    "address": {
      "id": "67a1e4233f34a77b6dde9055",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "fullName": "GreatStack",
      "phoneNumber": "09123456789",
      "zipcode": 654321,
      "area": "Main Road, 123 Street, A Block",
      "city": "Metro City",
      "province": "Province A",
      "__v": 0
    },
    "status": "Order Placed",
    "date": 1738672426822,
    "__v": 0
  },
  {
    "id": "67a20949b3db72db5cc77b2e",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "items": [
      {
        "product": {
          "id": "67a1f52e3f34a77b6dde914a",
          "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
          "name": "Bose QuietComfort 45",
          "description": "The Bose QuietComfort 45 headphones deliver exceptional sound and noise cancellation for all-day listening.",
          "price": 429.99,
          "offerPrice": 329.99,
          "image": [
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667311/m16coelz8ivkk9f0nwrz.png"
          ],
          "category": "Headphone",
          "date": 1738667310300,
          "__v": 0
        },
        "quantity": 2,
        "id": "67a20949b3db72db5cc77b2f"
      }
    ],
    "amount": 659.98,
    "address": {
      "id": "67a1e4233f34a77b6dde9056",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "fullName": "TechStack",
      "phoneNumber": "09876543210",
      "zipcode": 123456,
      "area": "Second Avenue, 45 Street, B Block",
      "city": "New City",
      "province": "Province B",
      "__v": 0
    },
    "status": "Shipped",
    "date": 1738675526822,
    "__v": 0
  },
  {
    "id": "67a2095ab3db72db5cc77b30",
    "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    "items": [
      {
        "product": {
          "id": "67a1f5663f34a77b6dde914c",
          "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
          "name": "Samsung Galaxy S23",
          "description": "Samsung Galaxy S23 with top-tier AMOLED display and premium performance.",
          "price": 899.99,
          "offerPrice": 799.99,
          "image": [
            "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667366/xjd4eprpwqs7odbera1w.png"
          ],
          "category": "Smartphone",
          "date": 1738667366224,
          "__v": 0
        },
        "quantity": 1,
        "id": "67a2095ab3db72db5cc77b31"
      }
    ],
    "amount": 799.99,
    "address": {
      "id": "67a1e4233f34a77b6dde9057",
      "userId": "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      "fullName": "MobileStack",
      "phoneNumber": "09112223344",
      "zipcode": 789012,
      "area": "Third Street, 78 Block, C Area",
      "city": "Old Town",
      "province": "Province C",
      "__v": 0
    },
    "status": "Delivered",
    "date": 1738678626822,
    "__v": 0
  }
];

    
  return (
    <View>
      <View style={styles.titleContainerNotCentered}>
                  <Text style={styles.title} >My
                      <Text style={{ color: colors.primary, fontWeight:500 }}>{" "}Orders</Text>
                      </Text>
              </View>
              <OrdersList orders={orderDummyData} currency={"₱"}/>
    </View>
  )
}

export default MyOrders