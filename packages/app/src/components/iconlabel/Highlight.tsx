import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption, Colors, Title} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HighlightProps {
  ant: boolean;
  name: string;
  title: string;
  caption: string;
}

export const Highlight: React.FC<HighlightProps> = ({
  ant,
  caption,
  name,
  title,
}) => {
  return (
    <View style={styles.highlight}>
      {ant ? (
        <AntDesignIcon
          name={name}
          color={Colors.black}
          size={25}
          style={styles.icon}
        />
      ) : (
        <MaterialCommunityIcon
          name={name}
          color={Colors.black}
          size={25}
          style={styles.icon}
        />
      )}
      <View style={styles.highlightText}>
        <Title>{title}</Title>
        <Caption style={styles.captionText}>{caption}</Caption>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  icon: {
    marginTop: 5,
  },

  highlightText: {
    flexShrink: 1,
    marginLeft: 10,
  },

  captionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
