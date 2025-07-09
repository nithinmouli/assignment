import React, { useRef } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatHeader, MessageBubble, ChatInput, LoadingIndicator } from '../../components';
import { useChatData } from '../../hooks';
import { Colors } from '../../constants';
export default function ChatScreen() {
  const { chats, chatInfo, loading, loadMoreMessages } = useChatData();
  const currentUserID = 'user_1'; 
  const flatListRef = useRef(null);
  const insets = useSafeAreaInsets();

  const renderMessage = ({ item }) => {
    const isSender = item.sender.id === currentUserID;
    return <MessageBubble message={item} isSender={isSender} />;
  };

  const handleSendMessage = (messageText) => {
    console.log('Sending message:', messageText);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ChatHeader chatInfo={chatInfo} />
      
      <FlatList
        ref={flatListRef}
        style={styles.chatList}
        data={chats}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        inverted
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.3}
        ListFooterComponent={loading ? <LoadingIndicator /> : null}
      />
      
      <ChatInput onSendMessage={handleSendMessage} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  chatList: {
    flex: 1,
    padding: 10,
  },
});