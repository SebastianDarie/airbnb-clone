import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, Subheading, Title} from 'react-native-paper';
import {GradientWrapper} from '../../components/GradientWrapper';

interface GuestsControllerProps {}

export const GuestsController: React.FC<GuestsControllerProps> = ({}) => {
  return (
    <GradientWrapper>
      <View style={styles.mainWrapper}>
        <View style={styles.rowFlex}>
          <View>
            <Title>Adults</Title>
            <Subheading style={styles.agesText}>Ages 13 or above</Subheading>
          </View>
        </View>
      </View>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    padding: 25,
  },

  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },

  agesText: {
    color: Colors.grey300,
  },
});
