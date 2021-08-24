import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Subheading, Title} from 'react-native-paper';

interface SearchHeaderProps {
  title: string;
  subheading?: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  subheading,
  title,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
      <View style={styles.titleContainer}>
        <Title style={styles.title}>{title}</Title>
        <Subheading style={styles.subHeading}>{subheading}</Subheading>
      </View>
      <View style={styles.invisibleView} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },

  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  subHeading: {
    textAlign: 'center',
  },

  invisibleView: {
    width: '12%',
  },
});
