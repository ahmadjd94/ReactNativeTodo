// create 

import React from 'react';
import  {View,Text,TextInput,Button,Alert, props, asyn} from 'react-native';


class App extends React.Component{

  state = {
      domain:null,
      email:null,
      password:null,
      todos:[]
    };
    domain = null
    email = null
    password = null
    today = new Date();
    url = "https://1fa7ee88.ngrok.io/auth/login"
  
//   _prepareLoginData (){
//     return fetch(this.url, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       domain: this.domain,
//       email: this.email,
//       password: this.password
//     }),
// });
//   console.log(response)
//   }

_prepareLoginData() {
    // try {
      // 
      // Alert.alert("response",response)  
      // let responseJson = response.json();
      // Alert.alert("response",responseJson)
    //   return responseJson.movies;
    // } catch (error) {
    //   console.error(error);
    // }


    return fetch(this.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: this.domain,
        email: this.email,
        password: this.password
      }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      console.error(error);
    });
  }
  handleText =()=>{
    this.setState({todo:this.state.todos.push(this.state.text)})
    this.setState({text:""})
  }
  changeTodo= () =>{
    if (this.state.text != ""){
      if (this.state.todos.includes(this.state.text)){
        Alert.alert("warning","the text you submitted is already in the list",
        [
          {text: 'Cancel', onPress: () => this.setState({cancel:true})},
          {text: 'OK', onPress: () => this.setState({cancel:false})}
        ],)
      
        if (!this.state.cancel){
          this.handleText()
          }
      }
      else
      this.handleText()
    }
    else{
      Alert.alert("error", "enter a valid todo text")
    }
  }
  renderTodos = () =>{
    return this.state.todos.map(t=>{
      return(
        <Text key={this.state.todos.indexOf(t)}> {t} </Text>
      )
    })
  }
  
  render(){
    return (
      <View style={styles.viewStyle}>
        

        <Text> text</Text>
        <TextInput style={styles.inputStyle}
        placeholder="Enter Todo"
        
        onChangeText={(text)=>this.setState({text:text})}
        value = {this.state.text}
        />

        
        <Button  title="Login" onPress={this.changeTodo}/>
        {/* this.state.todos.forEach(function (value) {
            <Text> POSRocket © {value}</Text>
        
        }); */}

        {this.renderTodos()}
        <Text> POSRocket © {this.state.todos}</Text>

      <Text> POSRocket © {this.today.getFullYear()}</Text>

      </View>
      )
  }
}

// create stuff

// export Stuff

const styles = {
  viewStyle:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center'
  },
  inputStyle:{
    height: 50,
    width:100,
    borderColor:"blue",
    borderWidth:1

  }
}

export default App;