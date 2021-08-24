import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';

interface CounterProps {
  value: number;
  updateValue: (value: number) => void;
}

export const Counter: React.FC<CounterProps> = ({value, updateValue}) => {
  return (
    <View style={styles.container}>
      <View style={styles.btnWrapper}>
        <IconButton
          icon="minus"
          color={Colors.grey700}
          style={styles.countBtnWrapper}
          onPress={() => {
            if (value > 0) {
              updateValue(value - 1);
            }
          }}
        />
      </View>
      <View style={styles.countWrapper}>
        <Text style={styles.count}>{value}</Text>
      </View>
      <View style={styles.btnWrapper}>
        <IconButton
          icon="plus"
          color={Colors.grey700}
          style={styles.countBtnWrapper}
          onPress={() => {
            if (value < 16) {
              updateValue(value + 1);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },

  btnWrapper: {
    alignItems: 'center',
    width: '30%',
  },

  countBtnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grey200,
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 2,
    height: 30,
    width: 30,
  },

  countWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },

  count: {
    textAlign: 'center',
  },
});
