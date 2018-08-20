import React from 'react';
import  {View,Text,TextInput,Button,Alert, props, TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-gesture-handler';


class App extends React.Component{

  state = {
      domain:null,
      email:null,
      password:null,
      todos:[],
      cancel: false
    };
    today = new Date();


_prepareLoginData() {

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
  clearText = () =>{
    this.setState({text:""})
    
  }
  handleText(cancel=false){

    if (cancel===false){
      this.setState({todo:this.state.todos.push(this.state.text)})
      }
    this.clearText()
  }
  changeTodo=()=>{
    if (this.state.text != ""){
      if (this.state.todos.includes(this.state.text)){
        Alert.alert("warning","the text you submitted is already in the list",
        [
          {text: 'Cancel', onPress: () => this.handleText(true)},
          {text: 'OK', onPress: () => this.handleText(false)}
        ])
      }
      else{
        this.handleText()
      }
        
    }
    else{
      Alert.alert("error", "Enter a text into the box before proceeding")
    }
  }

  deleteTodo=(t)=>{
    var arr = this.state.todos
    // arr = arr.splice(arr.indexOf(t),1)
    this.setState({todos:arr.filter(item => !t)})
  }
  renderTodos = () =>{
    return this.state.todos.map(t=>{
      return(
        <TouchableOpacity key={this.state.todos.indexOf(t)}
        
        style={styles.TodoStyle}>
        <Text onPress={()=>{this.deleteTodo(t)}}>
        {t}
        </Text>
        </TouchableOpacity>
      )
    })
  }
  
  render(){
    return (
      <View style={styles.mainView}>
        <View style={styles.viewStyle}>
          

          <Text style = {styles.titleStyle}>Todo List</Text>
          <TextInput style={styles.inputStyle}
          placeholder="Enter Todo"
          
          onChangeText={(text)=>this.setState({text:text})}
          value = {this.state.text}
          />

          
          <Button  title="Add Todo" onPress={this.changeTodo}/>

          <View style={styles.todoList}>
          {this.renderTodos()}
          </View>
        <Text> Ahmad © {this.today.getFullYear()}</Text>

        </View>
      </View>
      )
  }
}


const styles = {
  mainView:{
    flex:1,
    backgroundColor:"#CEEAF7"

  },
  viewStyle:{
    marginTop:50,
    alignItems: 'center',
    justifyContent:'center'
  },
  todoList:{
    marginTop:20,
    alignItems: 'center',
    justifyContent:'center'
  },
  inputStyle:{
    height: 50,
    width:100,
    marginBottom:30

  },
  TodoStyle:{
    height: 50,
    width:100,
    alignItems: 'center',
    justifyContent:'center'
  },
  titleStyle:{
    fontWeight:"bold",
    color:"#35383D",
    fontSize:30,
    marginBottom:30
  }
}

export default App;