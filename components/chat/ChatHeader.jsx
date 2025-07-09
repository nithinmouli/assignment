import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Colors } from '../../constants';

export default function ChatHeader({ chatInfo }) {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  if (!chatInfo) return null;

  const handleBackPress = () => {
    router.back();
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuOption = (option) => {
    setMenuVisible(false);
    switch (option) {
      case 'members':
        setShowMembers(true);
        break;
      case 'share':
        console.log('Share number option selected');
        break;
      case 'report':
        console.log('Report option selected');
        break;
      default:
        break;
    }
  };

  const formatDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'short' }).toUpperCase();
    return `${day} ${month}, ${now.getFullYear()}`;
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{chatInfo.name}</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.groupInfo}>
        <Image
          source={{
            uri:
              chatInfo.users && chatInfo.users[0]?.image
                ? chatInfo.users[0].image
                : 'https://via.placeholder.com/40'
          }}
          style={styles.groupImage}
        />
        <View style={styles.groupDetails}>
          <View style={styles.tripDetails}>
            <Text style={styles.tripLabel}>From</Text>
            <Text style={styles.tripText}>{chatInfo.from}</Text>
          </View>
          <View style={styles.tripDetails}>
            <Text style={styles.tripLabel}>To</Text>
            <Text style={styles.tripText}>{chatInfo.to}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.dateText}>{formatDate()}</Text>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuOption('members')}
                >
                  <Ionicons
                    name="people-outline"
                    size={20}
                    color={Colors.text}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>Members</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuOption('share')}
                >
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color={Colors.text}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>Share Number</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuOption('report')}
                >
                  <Ionicons
                    name="flag-outline"
                    size={20}
                    color={Colors.text}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>Report</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        transparent={true}
        visible={showMembers}
        animationType="slide"
        onRequestClose={() => setShowMembers(false)}
      >
        <View style={styles.membersModalContainer}>
          <View style={styles.membersContent}>
            <View style={styles.membersHeader}>
              <Text style={styles.membersTitle}>Members</Text>
              <TouchableOpacity onPress={() => setShowMembers(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.membersList}>
              {chatInfo.users &&
                chatInfo.users.map((user, index) => (
                  <View key={user.id || index} style={styles.memberItem}>
                    <Image
                      source={{
                        uri: user.image || 'https://via.placeholder.com/50'
                      }}
                      style={styles.memberAvatar}
                    />
                    <View style={styles.memberInfo}>
                      <Text style={styles.memberName}>{user.name}</Text>
                      {user.self && <Text style={styles.memberYou}>You</Text>}
                    </View>
                    {user.isVerified && (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                      </View>
                    )}
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    zIndex: 1
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  groupDetails: {
    flex: 1
  },
  tripDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  tripLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
    color: Colors.text
  },
  tripText: {
    fontSize: 14,
    color: Colors.lightText
  },
  dateText: {
    fontSize: 12,
    color: Colors.lightText,
    textAlign: 'center',
    marginTop: 10
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start'
  },
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#00000080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 180,
    paddingVertical: 8
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  menuIcon: {
    marginRight: 12
  },
  menuText: {
    fontSize: 16,
    color: Colors.text
  },
  membersModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  membersContent: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 20,
    elevation: 3
  },
  membersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 10
  },
  membersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text
  },
  membersList: {
    maxHeight: '90%'
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },
  memberInfo: {
    flex: 1
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text
  },
  memberYou: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 2
  },
  verifiedBadge: {
    marginLeft: 5
  }
});
