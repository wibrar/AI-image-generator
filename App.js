import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [imageBase64, setImageBase64] = useState(null);
  const [input, setInput] = useState("");


  return (
    <View style={styles.container}>
      <Text>Enter text to convert it into an image</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setInput(text)}
        value={input}
      />
      <TouchableOpacity
        onPress={getImage}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonText}>Click to generate</Text>
      </TouchableOpacity>
      {imageBase64 && (
        <Image
          source={{ uri: imageBase64 }}
          style={styles.image}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

