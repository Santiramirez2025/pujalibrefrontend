import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import io from 'socket.io-client';

const socket = io('https://api.pujalibre.com');

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => socket.off('message');
  }, []);

  const sendMessage = () => {
    socket.emit('message', { text: input });
    setInput('');
  };

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Escribe un mensaje..."
        className="border p-2 my-2"
      />
      <Button title="Enviar" onPress={sendMessage} />
    </View>
  );
}
