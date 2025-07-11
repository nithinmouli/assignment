import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatHeader, ChatInput, LoadingIndicator, MessageBubble } from '../../components';
import API from '../../constants/Api';
export default function ChatScreen() {
  const [chatData, setChatData] = useState({
    chats: [],
    from: "",
    name: "",
    to: ""
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const currentUserId = "67eab7475e5e4dd0903e133705213b43";
  const flatListRef = useRef(null);
  const insets = useSafeAreaInsets();
  const fetchChatData = async (pageNumber = 0) => {
    if (!hasMore && pageNumber > 0) return;
    try {
      setLoading(true);
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.CHAT}?page=${pageNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (pageNumber === 0) {
        setChatData(data);
      } else {
        setChatData(prevData => ({
          ...prevData,
          chats: [...prevData.chats, ...data.chats]
        }));
      }
      setPage(pageNumber);
      setHasMore(data.chats && data.chats.length > 0);
    } catch (error) {
      console.error('Error fetching chat data:', error);
      Alert.alert('Error', 'Failed to load chat data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchChatData(0);
  }, []);
  const renderMessage = ({ item }) => {
    const isSender = item.sender.user_id === currentUserId || item.sender.self === true;
    return <MessageBubble message={item} isSender={isSender} />;
  };
  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      message: messageText,
      sender: {
        image: "",
        is_kyc_verified: true,
        self: true,
        user_id: currentUserId
      },
      time: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setChatData(prevData => ({
      ...prevData,
      chats: [newMessage, ...prevData.chats]
    }));
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };
  const loadMoreMessages = () => {
    if (!loading && hasMore) {
      fetchChatData(page + 1);
    }
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ChatHeader chatInfo={chatData} />
      <FlatList
        ref={flatListRef}
        style={styles.chatList}
        data={chatData.chats}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
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
    backgroundColor: 'white',
  },
  chatList: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F8F8F8',
  },
});