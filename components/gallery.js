import React, { Component,useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default function  MyGallery(props) {

  /*constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }
  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
    this.props.navigation.navigate('Slot', { bookingDate : day })
  }
*/

    const [day,setsDay] = useState()

    const Daypress = (day) =>{
      setsDay(day);
      
    props.navigation.navigate('Slot', { bookingDate : day })
    }
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
   
        <Calendar
          onDayPress={Daypress}
          style={styles.calendar}
          hideExtraDays
         markedDates={day ? {[day.dateString]: {selected: true}} : null}
          theme={{
            selectedDayBackgroundColor: 'green',
            todayTextColor: 'green',
            arrowColor: 'green',
          }}
        />
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  }
});