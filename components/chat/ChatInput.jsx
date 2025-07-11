import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [showMedia, setShowMedia] = useState(false);
  const insets = useSafeAreaInsets();
  const textInputRef = useRef(null);
  const mediaAnimation = useRef(new Animated.Value(0)).current;
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      textInputRef.current?.focus();
    }
  };
  const toggleMediaButtons = () => {
    const newShowMedia = !showMedia;
    setShowMedia(newShowMedia);
    Animated.timing(mediaAnimation, {
      toValue: newShowMedia ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const handleInputPress = () => {
    textInputRef.current?.focus();
    if (showMedia) {
      toggleMediaButtons();
    }
  };
  return (
    <View style={[
      styles.container, 
      { paddingBottom: Math.max(10, insets.bottom) }
    ]}>
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Reply "
            multiline
            maxLength={500}
            onFocus={handleInputPress}
            blurOnSubmit={false}
            placeholderTextColor="#999999"
          />
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={toggleMediaButtons}>
          <Feather name="paperclip" size={22} color="#999999" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Feather name="send" size={22} color={message.trim() ? "#25D366" : "#999999"} />
        </TouchableOpacity>
      </View>
      {showMedia && (
        <Animated.View 
          style={[
            styles.mediaButtonsContainer,
            {
              opacity: mediaAnimation,
              transform: [{ 
                translateY: mediaAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })
              }]
            }
          ]}
        >
          <View style={styles.mediaButtonsWrapper}>
            <TouchableOpacity style={styles.mediaButton}>
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton}>
              <Ionicons name="videocam" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton}>
              <MaterialIcons name="description" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 5,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'relative',
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 8,
  },
  input: {
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
    color: 'black',
  },
  iconButton: {
    padding: 8,
    marginLeft: 2,
  },
  mediaButtonsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 90,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  mediaButtonsWrapper: {
    flexDirection: 'row',
    backgroundColor: '#008000',
    borderRadius: 20,
    padding: 3,
    justifyContent: 'space-between',
  },
  mediaButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
});