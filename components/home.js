import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View,Image,Alert, ImageBackground } from 'react-native';

export default function Home(props) {
    const [name,setName] = useState(props.navigation.getParam('username'))


  return (
    <View style={styles.home}>
        <ImageBackground style={{width:'100%' , height: '100%'}} 
            source={require('../assets/barber.png')}>
                <Text style={styles.title} >Welcome to BarBer Shop {name} </Text>

                <View style={styles.fixToText}>
                <Button
                    onPress={()=>alert("you click the cutton " + name)}
                    title="click me"
                    color = "black"
                />
                <Button
                    onPress={()=> props.navigation.navigate("MyGallery")}
                    title="Go to check"
                    color = "black"
                />
                </View>
                 <View style={styles.fixToText}>
                    <Button
                    title="Left button"
                    color = "black"
                    onPress={() => Alert.alert('Left button pressed')}
                    />
                    <Button
                    title="Right button"
                    color = "black"
                    onPress={() => Alert.alert('Right button pressed')}
                    />
                </View>
       </ImageBackground>
    </View>
    
  );
}
Home.navigationOptions = screenProps => ({
    title : "BarBer Shop",
    headerStyle:{
        backgroundColor:'orange',

    },
    headerTintColor: '#fff',
    headerTitleStyle:{
        fontWeight:'bold',
        fontSize:24,
        alignSelf: 'center',
        justifyContent:"flex-start",    
    },

})

const styles = StyleSheet.create(
{
    home: 
    {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color:'red',
        textAlign:'center',
        fontSize:50
    },
    name :{
        color:'green'
    },
    fixToText: {
        marginVertical: 8,
        margin:80,
        color: '#737373',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:45,
        
      },
}
);
