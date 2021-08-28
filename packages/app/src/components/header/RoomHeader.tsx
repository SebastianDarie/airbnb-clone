import {TouchableOpacity} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface RoomHeaderProps {
  onPress: () => void;
}

export const RoomHeader: React.FC<RoomHeaderProps> = ({onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={styles.backBtn}>
          <View style={styles.maxWidth}>
            <TouchableOpacity onPress={onPress}>
              <View style={styles.circle}>
                <FontAwesome5Icon
                  name="arrow-left"
                  color={Colors.grey800}
                  size={14}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    position: 'absolute',
    top: -10,
    left: 15,
    zIndex: 100,
  },

  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },

  backBtn: {
    position: 'absolute',
    marginTop: 5,
  },

  maxWidth: {
    width: '100%',
  },

  circle: {
    backgroundColor: 'white',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
