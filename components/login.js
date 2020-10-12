import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Image, Button,TextInput,AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getActiveChildNavigationOptions } from 'react-navigation';
import LoginScreen from "react-native-login-screen";

export default function Login(props) {
//10.0.0.16:8000
    const [username,setUser]= useState("")
    const [password,setpassword]= useState("")
    const [registerview,setregisterview]= useState(false)
    const [token,setToken] =useState()

    useEffect(()=>{
      getData();
    },[])

    const auth = ()=>{
        console.log(username)
      if(registerview){
        fetch(`http://10.0.0.16:8000/api/users/`, {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({username,password})
        })
        .then(resp => resp.json())
        .then(resp=>{
          setregisterview(false);         
        })
        .catch(err => console.log(err))
      }
      else{
        fetch(`http://10.0.0.16:8000/auth/`, {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({username,password})
        })
        .then(resp => resp.json())
        .then(resp=>{
          saveToken(resp.token);
          props.navigation.navigate("Home",{username:username,token:token});
  
        })
        .catch(err => console.log(err))
      }
    }

    //asyc func need to do await to get the token 
const saveToken = async(token) =>{
    await AsyncStorage.setItem('MR_Token',token)
}

const getData = async () => {
  setToken(await AsyncStorage.getItem('MR_Token'));
    if(token)  {
      props.navigation.navigate("Home");
    }

}
/*    onPressLogin={() => {
                setSpinnerVisibility(true);
                setTimeout(() => {
                setSpinnerVisibility(false);
                }, 2000);
            }}*/ 

    return (
        <LoginScreen
         
            labelTextStyle={{
                color: "#adadad",
            }}
            logoTextStyle={{
                fontSize: 27,
                color: "#fdfdfd",
            }}
           /* loginButtonTextStyle={{
                color: "#fdfdfd",

            }}*/
            textStyle={{
                color: "#757575",
            }}
            signupStyle={{
                color: "#fdfdfd",
                }}
            usernameOnChangeText={(username) => setUser(username)}
            onPressSettings={() => alert("Settings Button is pressed")}
            passwordOnChangeText={(password) =>setpassword(password)}
          
            onPressSignup={()=>auth()}
            >
            <View
                style={{
                position: "relative",
                alignSelf: "center",
                marginTop: 64,
                }}
            >
                <Text style={{ color: "white", fontSize: 30 }}>
                Inside Login Screen Component
                </Text>
            </View>
    </LoginScreen>
    )
}

Login.navigationOptions = screenProps => ({
    title : "Login",
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c35',
    padding:10
  },
  label:{
    fontSize:24,
    color:'white',
    padding:10
  },
  input:{
    fontSize:24,
    backgroundColor:"white",
    padding:10,
    margin:10
  },
  viewText:{
    color:'white',
    fontSize : 20,
    paddingTop : 30,
    paddingLeft : 10

  }
});
