import React, { Component,useState,useEffect } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar, Button
} from 'react-native';
const jsonData = { "slots" : {
    "slot1": "9:00am to 9:30am",
    "slot2": "9:30am to 10:00am",
    "slot3": "10:00am to 10:30am",
    "slot4": "10:30am to 11:00am",
    "slot5": "11:00am to 11:30am",
    "slot6": "11:30am to 12:00pm"
 }
}
export default function Slot(props){
  
const [bookingDate,setbookingDate]  =useState(props.navigation.state.params.bookingDate)
const userId = props.navigation.getParam('userId');
const [appointment,setappointment] = useState(null)

useEffect(()=>{
  fetch(`http://10.0.0.21:8000/api/appoin/`, {
      method : 'GET',
      headers : {

      },
    })
    .then(resp => resp.json())
    .then(resp=>{
      setappointment(resp);        
    })
    .catch(err => Alert.alert("Error",err))

},[])


  const bookSlot = (key,value) =>{
    const year = bookingDate.year
    const month = bookingDate.month
    const day = bookingDate.day
    let userDataJson = {}
    fetch(`http://10.0.0.21:8000/api/appoin/`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({year,day,month,hour:value,user:userId})
      })
      .then(resp => resp.json())
      .then(resp=>{
        console.log(resp);         
      })
      .catch(err => console.log(err.response))

  }
 
  const checkSlot=(slots) => {
      console.log(appointment)
      let Names = appointment.map(function(item, index){
        console.log(item)
      });
    return true
}
    
    const slots = jsonData.slots

    const slotsarr = Object.keys(slots).map( function(k) {

      return (  <View key={k} style={{margin:5}}>
                  {checkSlot(slots[k]) ? <Button  countCheck={0} onColor={"green"} effect={"pulse"} onPress={() => bookSlot(k,slots[k]) } title={slots[k]} /> : null}
                </View>)
    });
    return (
      <View style={styles.container}>
      { slotsarr }
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});