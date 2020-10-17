import React, { Component,useState,useEffect } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
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
const [appointment,setappointment] = useState([]);
const [bookingDate,setbookingDate] = useState(props.navigation.state.params.bookingDate);
const userId = props.navigation.getParam('userId');
const [chechhour,setchechhour] = useState(false)
const slots = jsonData.slots


useEffect(()=>{
  fetch(`http://10.0.0.9:8000/api/appoin/`, {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json'
      },
    })
    .then(resp => resp.json())
    .then(resp=>{
      setappointment(resp);
    })
    .catch(err => alert("Error",err))
},[])

  const bookSlot = (key,value) =>{
    const year = bookingDate.year
    const month = bookingDate.month
    const day = bookingDate.day
    let userDataJson = {}
    fetch(`http://10.0.0.9:8000/api/appoin/`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({year,day,month,hour:value,user:userId})
      })
      .then(resp => resp.json())
      .then(resp=>{
        console.log(resp)
        if(resp.status == "200"){
          alert("you set ap an appoinetment at : " + resp.hour);       

        }
        else {
          alert("This line are alredy taken please choose different hour"); 

        }
      })
      .catch(err => console.log(err))

  }
  const check = () =>{
    console.log(slots.slot1)
     }
 
  const checkSlot=() => {
    let hour;
    let appointhour = appointment.map(function(item,index){
      if(bookingDate.day == item.day && bookingDate.month == item.month){
        return item.hour
      }
      });

      const slotsarr1 = Object.keys(slots).map( function(k) {
       hour = appointhour.map(function(item,index){
          if(slots[k] == item){ console.log("");
          }
          else{return [k] + ": " + slots[k] + ","}
        })
      });

      const namesArr = hour.filter(function(elem, pos) {
        return hour.indexOf(elem) == pos;
    }); 
    console.log("slotsarr   " + namesArr)

}
    

    const slotsarr = Object.keys(slots).map( function(k) {
      return (  <View key={k} style={{margin:5}}>
                <Button  countCheck={0} onColor={"green"} effect={"pulse"} onPress={() => bookSlot(k,slots[k]) } title={slots[k]} /> 
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