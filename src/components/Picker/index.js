import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function Picker(props){
    return(
        <RNPickerSelect
         items={props.moedas}
         onValueChange={(value)=> props.onChange(value)}
         style={{
             inputIOS:{
                 color:'green'
             },
             inputAndroid:{
                 color:'green'
             }
         }}
        />
    )
}