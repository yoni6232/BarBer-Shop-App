import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Image, Button,TextInput,AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getActiveChildNavigationOptions } from 'react-navigation';

export default function Auth(props) {
//10.0.0.16:8000
    const [username,setUser]= useState()
    const [password,setpassword]= useState()
    const [registerview,setregisterview]= useState(false)
    const [token,setToken] =useState(null)

    useEffect(()=>{
      getData();
    },[])

    const auth = ()=>{
      if(registerview){
        fetch(`http://10.0.0.9:8000/api/users/`, {
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
        fetch(`http://10.0.0.9:8000/auth/`, {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({username,password})
        })
        .then(resp => resp.json())
        .then(resp=>{
          console.log("sadsad" + resp.status)
          if(resp.status!=="200")
          {
             alert("you have a problem with your ID or Password")
          }
          else{
          setToken(resp.token);
          console.log(token)
          props.navigation.navigate("Home",{username:username,token:token});
          }
        })
        .catch(err => console.log(err))
      }
    }

    //asyc func need to do await to get the token 
const saveToken = async(token) =>{
    await AsyncStorage.setItem('MR_Token',token)
}

const getData = async () => {
  console.log(username + password)
  setToken(await AsyncStorage.getItem('MR_Token'));
    if(token)  {
      props.navigation.navigate("Home");
    }

}

    return (
        <View style={styles.container}>
   
        {registerview ?  
        
          <View style={styles.container}>
       
         <Text  style={styles.label}>User Name</Text>
         <TextInput 
            style={styles.input}
            placeholder = "User Name"
            onChangeText={text=> setUser(text)}
            value={username}
            autoCapitalize={'none'}
        />
        <Text  style={styles.label}>Password</Text>
        <TextInput 
            style={styles.input}
            placeholder = "Password"
            onChangeText={text=> setpassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize={'none'}

        />
            <Text  style={styles.label}>Phone Number</Text>
        <TextInput 
            style={styles.input}
            placeholder = "Phone"
            onChangeText={text=> setpassword(text)}
            value={password}  
            secureTextEntry={true}
            autoCapitalize={'none'}

        />
        </View>
        :  
          <View style={styles.container}>
          <Image style={{width: 200, height: 200 , marginLeft:100}} 
            source={require('../assets/bbb.png')}></Image>
         <Text  style={styles.label}>User Name</Text>
         <TextInput 
            style={styles.input}
            placeholder = "User Name"
            onChangeText={text=> setUser(text)}
            value={username}
            autoCapitalize={'none'}
        />
        <Text  style={styles.label}>Password</Text>
        <TextInput 
            style={styles.input}
            placeholder = "Password"
            onChangeText={text=> setpassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize={'none'}
        />
        </View>
}

        
        <Button onPress={()=>auth()} title= { registerview  ? "Register" : "Login"}/>
        <TouchableOpacity onPress={ () => setregisterview(!registerview)}>
        {registerview ? <Text style = {styles.viewText}>Alredy have an account ? go back to Login</Text> :
          <Text style = {styles.viewText}>Donet have an account? register here</Text>
        }
        </TouchableOpacity>
        </View>
    );
}

Auth.navigationOptions = screenProps => ({
    title : "Login",
    headerStyle:{
        backgroundColor:'#004dcf',

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
    backgroundColor: '#000000',
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
