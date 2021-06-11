import React,{useState} from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

// create a search input that allows us to find a location based off of the metaweather api 
export default function SearchInput({placeholder,getLocation}) {
    // update the text when a user types 
    const [text, setText] = useState('')
    const handleSubmit = () => {
      // fire off the function that gets passed down to update the state in app 
      getLocation(text)
    // make the search blank on submission
      setText('')
    }
    return (
        <View style={styles.container}>
            <TextInput 
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor='white'
                style={styles.textInput}
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleSubmit}
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
  