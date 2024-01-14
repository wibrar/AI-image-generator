import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [imageBase64, setImageBase64] = useState(null);
  const [input, setInput] = useState("");

  const getImage = async () => {
    try {
      async function query(data) {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        const result = await response.blob();
        return result;
      }

      const imageBlob = await query({ "inputs": input });

      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);

      reader.onloadend = () => {
        const base64data = reader.result;
        setImageBase64(base64data);
      };
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

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