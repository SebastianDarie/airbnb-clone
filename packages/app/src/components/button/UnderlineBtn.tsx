import {TouchableOpacity} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';

interface UnderlineBtnProps {
  text: string;
  onPress: () => void;
}

export const UnderlineBtn: React.FC<UnderlineBtnProps> = ({text, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  labelWrapper: {
    paddingVertical: 10,
  },

  label: {
    color: Colors.grey500,
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
