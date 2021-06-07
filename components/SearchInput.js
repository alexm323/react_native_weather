import React,{useState} from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

export default function SearchInput({placeholder,getLocation}) {
    const [text, setText] = useState('')
    return (
        <View style={styles.container}>
            <TextInput 
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor='white'
                style={styles.textInput}
                value={text}
                onChangeText={setText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height: 40,
      marginTop: 20,
      backgroundColor: '#666',
      marginHorizontal: 40,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    textInput: {
      flex: 1,
      color: 'white',
    },
  });
  