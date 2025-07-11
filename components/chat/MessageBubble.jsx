import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
export default function MessageBubble({ message, isSender }) {
  const messageText = message.message || message.text || "";
  return (
    <View style={[
      styles.container,
      isSender ? styles.senderContainer : styles.receiverContainer
    ]}>
      {!isSender && (
        <Image 
          source={{ uri: message.sender?.image  }} 
          style={styles.avatar}
        />
      )}
      <View style={[
        styles.bubble,
        isSender ? styles.senderBubble : styles.receiverBubble
      ]}>
        <Text style={[
          styles.messageText,
          isSender ? styles.senderText : styles.receiverText
        ]}>
          {messageText.replace(/<br>Page 0<br>/g, '')}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  senderContainer: {
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  bubble: {
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  receiverBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  senderBubble: {
    backgroundColor: '#0066FF',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'System',
    letterSpacing: 0.1,
  },
  receiverText: {
    color: '#333333',
  },
  senderText: {
    color: 'white',
  },
});