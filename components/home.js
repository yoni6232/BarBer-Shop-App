import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View,Image,Alert, ImageBackground } from 'react-native';

export default function Home(props) {
    const [name,setName] = useState(props.navigation.getParam('username'))
    const token = props.navigation.getParam('token');
    const [userId,setUserId] = useState(null)
    const [usersuper,setusersuper] = useState(false)

    useEffect(()=>{
        fetch(`http://10.0.0.21:8000/auth/user`, {
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Token ${token}`
          },
        })
        .then(resp => resp.json())
        .then(resp=>{    
            console.log(resp)

            setUserId(resp.id)
            setusersuper(resp.is_superuser)
            console.log(resp.is_superuser)
        })
        .catch(err => console.log(err))
      },[])
    

  return (
    <View style={styles.home}>
        <ImageBackground style={{width:'100%' , height: '100%'}} 
            source={require('../assets/barber.png')}>
                <Text style={styles.title} >Welcome to BarBer Shop {name} </Text>
                <Button
                   onPress={()=> props.navigation.navigate("Scdule",{userId:userId})}
                    title="Set up Hair Cut"
                    color = "black"
                />
        
                 <View style={styles.fixToText}>
                 <Button
                    onPress={()=> props.navigation.navigate("MyGallery")}
                    //onPress={()=>alert("Go to Gallery")}
                    title="Gallery"
                    color = "black"
                />
                    <Button
                    onPress={()=> props.navigation.navigate("MyHaircut")}
                    title="My Hair Cut Line"
                    color = "black"
                    onPress={() => Alert.alert('Left button pressed')}
                    />
                    <Button
                    title="Right button"
                    color = "black"
                    onPress={() => Alert.alert('Right button pressed')}
                    />
                
                </View>
                {usersuper ?
                        <Button
                    title="see all appointment"
                    color = "black"
                    onPress={()=> props.navigation.navigate("Admin")}
                    />
                    :
                    null }
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
    headerRight:() =>(
        <View style={styles.butContainer}>
          <Button title="Logout" style ={{'color':'red'}}
              onPress={()=> removieToken(screenProps)}
          />
          </View>
      )

})
const removieToken = async (props) =>{
    await AsyncStorage.removeItem('MR_Token');
    props.navigation.navigate('Auth')
  }
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
        marginVertical: 15,
        margin:80,
        marginLeft:15,
        marginRight:15,

        color: '#737373',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:45,
        
      },
}
);
