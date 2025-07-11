import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const insets = useSafeAreaInsets();
  const textInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      textInputRef.current?.focus();
    }
  };

  const handleInputPress = () => {
    textInputRef.current?.focus();
  };

  return (
    <View style={[
      styles.container, 
      { paddingBottom: Math.max(10, insets.bottom) }
    ]}>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={24} color={Colors.lightText} />
        </TouchableOpacity>
        <TextInput
          ref={textInputRef}
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={Colors.lightText}
          multiline
          maxLength={500}
          onFocus={handleInputPress}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />
        <TouchableOpacity style={styles.emojiButton}>
          <Ionicons name="happy-outline" size={24} color={Colors.lightText} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.sendButton} 
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Ionicons name="send" size={20} color={Colors.background} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 10,
    backgroundColor: Colors.background,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    maxHeight: 100,
    fontSize: 16,
    color: Colors.text,
  },
  attachButton: {
    padding: 8,
  },
  emojiButton: {
    padding: 8,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});