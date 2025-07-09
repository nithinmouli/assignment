import axios from "axios";
import { useEffect, useState } from "react";
import { Api } from "../constants";

export default function useChatData() {
  const [chats, setChats] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); 
  async function fetchChats(pageNum = 0) {
    if (loading || (pageNum > 0 && !hasMore)) return;
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.get(
        `${Api.BASE_URL}${Api.ENDPOINTS.CHAT}?page=${pageNum}`
      );
      const data = response.data;
      if (pageNum === 0) {
        setChatInfo({
          name: data.name,
          from: data.from,
          to: data.to,
          users: extractUniqueUsers(data.chats)
        });
        setChats(data.chats || []);
      } else {
        if (data.chats && data.chats.length > 0) {
          setChats(prevChats => [...prevChats, ...data.chats]);
        } else {
          setHasMore(false);
        }
      }

      setPage(pageNum);
    } catch (err) {
      console.error('Error fetching chats:', err);
      setError(err.message || 'Failed to fetch chats');
    } finally {
      setLoading(false);
    }
  }

  function extractUniqueUsers(messages) {
    if (!messages || !messages.length) return [];
    const userMap = {};
    messages.forEach(message => {
      const sender = message.sender;
      if (sender && sender.user_id && !userMap[sender.user_id]) {
        userMap[sender.user_id] = {
          id: sender.user_id,
          name: `User ${Object.keys(userMap).length + 1}`,
          image: sender.image,
          isVerified: sender.is_kyc_verified,
          self: sender.self
        };
      }
    });
    return Object.values(userMap);
  }
  function loadMoreMessages() {
    if (!loading && hasMore) {
      fetchChats(page + 1);
    }
  }
  function cleanMessageText(text) {
    return text.replace(/<br>Page \d+<br>/g, '');
  }
  useEffect(() => {
    fetchChats(0);
  }, []);
  return {
    chats: chats.map(chat => ({
      ...chat,
      message: cleanMessageText(chat.message)
    })),
    chatInfo,
    loading,
    error,
    hasMore,
    loadMoreMessages,
    currentUser: chatInfo?.users?.find(user => user.self) || null
  };
}
