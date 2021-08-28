import {TouchableHighlight} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, Subheading} from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AmenityProps {
  amenity: string;
  name: string;
}

export const Amenity: React.FC<AmenityProps> = ({amenity, name}) => {
  return (
    <TouchableHighlight underlayColor={Colors.grey300}>
      <View style={styles.amenityContainer}>
        <View style={styles.textContainer}>
          <Subheading>{amenity}</Subheading>
        </View>
        <MaterialCommunityIcon
          name={name}
          color={Colors.black}
          size={24}
          style={styles.icon}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  amenityContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 20,
  },

  icon: {
    marginTop: 5,
  },

  textContainer: {
    color: Colors.black,
    flex: 1,
    fontSize: 18,
    marginTop: 5,
    marginLeft: 10,
  },
});
