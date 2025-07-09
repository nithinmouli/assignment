import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants';

export default function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
});