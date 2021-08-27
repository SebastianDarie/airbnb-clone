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
          <MaterialCommunityIcon name={name} color={Colors.black} size={24} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  amenityContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },

  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
