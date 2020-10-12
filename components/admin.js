import React, { Component,useEffect,useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList, Button
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
export default function Admin(props){
  
//const userId = props.navigation.getParam('userId');
const [appointment,setappointment] = useState(null)
const [day,setDay] = useState( new Date().getDate())
const [month,setmonth] = useState( new Date().getMonth() + 1)
const [year,setyear] = useState(new Date().getFullYear())


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
    .catch(err => Alert.alert("Error",err))

},[])

    
    const slots = jsonData.slots
    const getCurrentDate=(i,y,m,d)=>{
      console.log(y,m,d) 

        if(m==month&&d==day&&y==year) {
            return true; 

        }
        else return false
  }

    return (
      <View style={styles.container}>
       <FlatList
            data = {appointment}
            renderItem = {({item}) => (
              <TouchableOpacity >
             
                {getCurrentDate(item,item.year,item.month,item.day) ?  <View style={styles.item}>   <Text style={styles.itemText} >{item.hour} </Text> </View>: null}  
                
                </TouchableOpacity>
            )}
            keyExtractor = {(item,index) => index.toString()}
        />
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item:{
    flex : 1,
    padding: 15,
    margin : 0.5,
    backgroundColor: '#282c35',
    alignItems: 'center',
  },
  itemText:{
    color:'#fff',
    fontSize:24,
  },
});