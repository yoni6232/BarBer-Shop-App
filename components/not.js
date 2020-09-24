import React, { useState } from "react";
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class Check extends React.Component {
    
  state={
    email:"",
    password:""
  }
  render(){

  return (
    <View style={styles.container}>
      <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="Email..." 
        placeholderTextColor="#003f5c"
        onChangeText={text => this.setState({email:text})}/>
    
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="Password..." 
        placeholderTextColor="#003f5c"
        onChangeText={text => this.setState({email:text})}/>
    
    </View>
    <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      <TouchableOpacity >
          <Text style={{color:"white"}} style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
   
  </View>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  inputText:{
    height:50,
    color:"white"
  },
  inputView:{
    width:"80%",
    backgroundColor:'#465881',
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  loginText:{
    color:"white",
    width:'80%',
    fontSize:15,
    borderRadius:50,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  }
});

