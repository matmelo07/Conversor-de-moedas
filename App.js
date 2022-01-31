import React, { useEffect,useState } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground,ActivityIndicator,Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import Picker from './src/components/Picker';
import api from './src/services/api';


export default function App(){

const [moedas,setMoedas] = useState([]);
const [loading,setLoading] = useState(true);
const [valorConvertido,setValorConvertido] = useState(0)
const [moedaValor,setMoedaValor] = useState(0);
const [moedaSelecionada,setMoedaSelecionada] = useState(null);


useEffect(()=>{
  async function loadMoeda(){
    const response = await api.get('all')
    let moedaArray = []
    Object.keys(response.data).map((key)=>{
      moedaArray.push({
        key:key,
        label:key,
        value:key
      })
    })
    setMoedas(moedaArray);
    setLoading(false)

   
  } 
  loadMoeda()
},[])



 async function Converter(){
  if(moedaValor === 0 || moedaSelecionada === 0){
    alert('Digite um valor')
    return;
  }
   const response = await api.get(`all/${moedaSelecionada}-BRL`)

   let result = (response.data[moedaSelecionada].ask * parseFloat(moedaValor))
   setValorConvertido(`R$ ${result.toFixed(2)}`)
   setMoedaValor(moedaValor)
   Keyboard.dismiss();
 }
  
 



 if(loading){
   return(
     <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'black',flex:1}}>
          <ActivityIndicator color='green' size={45} />
         
     </View>
   )
 
 }else{
   
  return(
   
   
    <View style={styles.container}>
    
     <ImageBackground
     source={require('./assets/money2.jpg')}
     style={styles.imgback}
     >


       
     <View style={styles.areamoeda}>
    
       <Text style={styles.titulo}>Selecione uma moeda</Text>
       <Picker moedas={moedas} onChange={(moeda)=> setMoedaSelecionada(moeda)}/>
     </View>

     <View style={styles.areabotao}>
       <Text style={styles.titulo}>Digite um valor para converter</Text>
       <TextInput style={styles.input}
        keyboardType='numeric'
        placeholder='Ex 150'
        onChangeText={(value)=> setMoedaValor(value)}
        ></TextInput>
     </View>
     <TouchableOpacity style={styles.botao} onPress={Converter}>
       <Text style={styles.txtbtn}>Converter</Text>
     </TouchableOpacity>


       {valorConvertido !==0 &&(
       <View style={styles.arearesult}>
       <Text style={styles.txtresult}>{moedaValor} {moedaSelecionada}</Text>
       <Text style={[styles.titulo],{color:'green',fontSize:35,fontWeight:'bold'}}><Ionicons name='cash' color={'green'} size={32}/></Text>
       <Text style={[styles.txtresult],{color:'#353',fontSize:40}}>{valorConvertido}</Text>
      
       

       
     </View>
    
    )}
     </ImageBackground>
   
  
    </View>
    
  
    
  
  )

 }

  
}
const styles = StyleSheet.create({
  container:{
    flex:1 ,
   backgroundColor:'black',
   alignItems:'center',
   justifyContent:'center',
    paddingTop:60,
   
    

  },
  areamoeda:{
    width:'90%',
    backgroundColor:'white',
    paddingTop:9,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    marginBottom:1,
    opacity:.9
  },
  titulo:{
    fontSize:15,
    paddingLeft:10,
    fontWeight:'bold'
  },
  areabotao:{
    width:'90%',
    backgroundColor:'white',
    opacity:.9,
    paddingTop:9,
    paddingBottom:9
  },
  input:{
    width:'100%',
    height:45,
    fontSize:20,
    marginTop:15,
    borderBottomWidth:0.2
  },
  botao:{
    backgroundColor:'green',
    width:'90%',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    height:45,
    justifyContent:'center',
    alignItems:'center'
  },
  txtbtn:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  arearesult:{
    width:'90%',
    backgroundColor:'white',
    marginTop:40,
    alignItems:'center',
    justifyContent:'center',
    padding:15,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    opacity:.9
    
  },
  txtresult:{
    fontSize:30,
    fontWeight:'bold',
    color:'black',
    padding:15
   
  },
  imgback:{
    width:'100%',
    resizeMode:'repeat',
    justifyContent:'center',
    flex:1,
    alignItems:'center',
   
  }
  
  
  

})