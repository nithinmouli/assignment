import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../../constants';

export default function MessageBubble({ message, isSender }) {
  const bubbleStyle = isSender ? styles.senderBubble : styles.receiverBubble;
  const textStyle = isSender ? styles.senderText : styles.receiverText;

  return (
    <View style={[styles.container, isSender ? styles.senderContainer : styles.receiverContainer]}>
      {!isSender && (
        <Image 
          source={{ uri: message.sender.image || 'https://via.placeholder.com/40' }} 
          style={styles.avatar}
        />
      )}
      <View style={[styles.bubble, bubbleStyle]}>
        <Text style={textStyle}>{message.message}</Text>
        <Text style={styles.timestamp}>{new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '80%',
  },
  senderContainer: {
    alignSelf: 'flex-end',
  },
  receiverContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    padding: 12,
    marginHorizontal: 8,
  },
  senderBubble: {
    backgroundColor: Colors.senderBubble,
  },
  receiverBubble: {
    backgroundColor: Colors.receiverBubble,
  },
  senderText: {
    color: Colors.senderText,
  },
  receiverText: {
    color: Colors.receiverText,
  },
  timestamp: {
    fontSize: 10,
    color: Colors.lightText,
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});