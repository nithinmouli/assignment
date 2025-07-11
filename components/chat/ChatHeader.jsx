import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
export default function ChatHeader({ chatInfo }) {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const currentUserId = "67eab7475e5e4dd0903e133705213b43";
  useEffect(() => {
    if (chatInfo?.chats?.length > 0) {
      const uniqueMembers = {};
      chatInfo.chats.forEach(chat => {
        if (chat.sender?.user_id) {
          uniqueMembers[chat.sender.user_id] = {
            id: chat.sender.user_id,
            image: chat.sender.image,
            name: `User ${chat.sender.user_id.substring(0, 5)}`,
            self: chat.sender.user_id === currentUserId || chat.sender.self === true,
            isVerified: chat.sender.is_kyc_verified
          };
        }
      });
      setMembers(Object.values(uniqueMembers));
    }
  }, [chatInfo]);
  if (!chatInfo) return null;

  const handleBackPress = () => router.back();
  const toggleMenu = () => setMenuVisible(!menuVisible);
  const handleMenuOption = (option) => {
    setMenuVisible(false);
    if (option === 'members') setShowMembers(true);
  };
  const formatDate = () => {
    const now = new Date();
    return `${now.getDate()} ${now.toLocaleString('default', { month: 'short' }).toUpperCase()}, ${now.getFullYear()}`;
  };
  const renderMemberAvatars = () => {
    if (members.length === 0) {
      return (
        <View style={styles.tripIconContainer}>
          <MaterialIcons name="group" size={22} color="white" />
        </View>
      );
    }
    return (
      <View style={styles.avatarCollage}>
        {members.slice(0, 3).map((member, index) => (
          <Image
            key={member.id}
            source={{ uri: member.image }}
            style={[styles.collageAvatar, { zIndex: members.length - index, left: index === 0 ? 0 : -10 * index }]}
          />
        ))}
      </View>
    );
  };
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{chatInfo.name || ""}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.groupInfo}>
        {renderMemberAvatars()}
        <View style={styles.groupDetails}>
          <View style={styles.tripDetails}>
            <Text style={styles.tripLabel}>From</Text>
            <Text style={styles.tripText}>{chatInfo.from || ""}</Text>
          </View>
          <View style={styles.tripDetails}>
            <Text style={styles.tripLabel}>To</Text>
            <Text style={styles.tripText}>{chatInfo.to || ""}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <Text style={styles.dateText}>{formatDate()}</Text>
      <Modal transparent={true} visible={menuVisible} animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
                {[
                  { key: 'members', icon: 'people-outline', text: 'Members' },
                  { key: 'share', icon: 'call-outline', text: 'Share Number' },
                  { key: 'report', icon: 'flag-outline', text: 'Report' }
                ].map(item => (
                  <TouchableOpacity key={item.key} style={styles.menuItem} onPress={() => handleMenuOption(item.key)}>
                    <Ionicons name={item.icon} size={20} color="black" style={styles.menuIcon} />
                    <Text style={styles.menuText}>{item.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal transparent={true} visible={showMembers} animationType="slide" onRequestClose={() => setShowMembers(false)}>
        <View style={styles.membersModalContainer}>
          <View style={styles.membersContent}>
            <View style={styles.membersHeader}>
              <Text style={styles.membersTitle}>Members</Text>
              <TouchableOpacity onPress={() => setShowMembers(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.membersList}>
              {members?.length > 0 ? (
                members.map((user, index) => (
                  <View key={user.id || index} style={styles.memberItem}>
                    <Image source={{ uri: user.image }} style={styles.memberAvatar} />
                    <View style={styles.memberInfo}>
                      <Text style={styles.memberName}>{user.name || `User ${index + 1}`}</Text>
                      {user.self && <Text style={styles.memberYou}>You</Text>}
                    </View>
                    {user.isVerified && (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                      </View>
                    )}
                  </View>
                ))
              ) : (
                <Text style={styles.noMembersText}>No members found</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: 0, zIndex: 1},
  headerTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15},
  headerLeftContainer: {flexDirection: 'row', alignItems: 'center', flex: 1},
  backButton: {padding: 4, marginRight: 12},
  title: {fontSize: 20, fontWeight: 'bold', color: 'black', textAlign: 'left'},
  groupInfo: {flexDirection: 'row', alignItems: 'center'},
  menuButton: {padding: 4},
  avatarCollage: {flexDirection: 'row', height: 40, width: 60, alignItems: 'center', marginRight: 10},
  collageAvatar: {width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'white', position: 'absolute'},
  tripIconContainer: {width: 40, height: 40, borderRadius: 20, backgroundColor: '#25D366', justifyContent: 'center', alignItems: 'center', marginRight: 10},
  groupDetails: {flex: 1},
  tripDetails: {flexDirection: 'row', alignItems: 'center', marginBottom: 2},
  tripLabel: {fontSize: 14, fontWeight: '600', marginRight: 5, color: 'black'},
  tripText: {fontSize: 14, color: '#666666'},
  divider: {height: 0.5, backgroundColor: '#E0E0E0', marginTop: 10, marginBottom: 5},
  dateText: {fontSize: 12, color: '#999999', textAlign: 'center'},
  modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-start'},
  menuContainer: {position: 'absolute', top: 120, right: 16, backgroundColor: 'white', borderRadius: 8, elevation: 3, shadowColor: '#00000080', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.3, shadowRadius: 4, width: 180},
  menuItem: {flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16},
  menuIcon: {marginRight: 12},
  menuText: {fontSize: 14, color: 'black'},
  membersModalContainer: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'},
  membersContent: {width: '85%', maxHeight: '70%', backgroundColor: 'white', borderRadius: 12, padding: 20, elevation: 3},
  membersHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 10},
  membersTitle: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  membersList: {maxHeight: '90%'},
  memberItem: {flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0'},
  memberAvatar: {width: 50, height: 50, borderRadius: 25, marginRight: 15},
  memberInfo: {flex: 1},
  memberName: {fontSize: 16, fontWeight: '500', color: 'black'},
  memberYou: {fontSize: 12, color: '#999999', marginTop: 2},
  verifiedBadge: {marginLeft: 5},
  noMembersText: {textAlign: 'center', color: '#999999', padding: 20}
});