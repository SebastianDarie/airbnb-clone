import React, {memo, useMemo} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {BottomSheetHandleProps, TouchableOpacity} from '@gorhom/bottom-sheet';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface DetailsHandleProps extends BottomSheetHandleProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const DetailsHandle: React.FC<DetailsHandleProps> = ({
  title,
  style,
  onPress,
}) => {
  const containerStyle = useMemo(() => [styles.container, style], [style]);

  return (
    <View style={containerStyle}>
      <View style={styles.indicator} />
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={onPress}>
          <Ionicon
            name="md-close-sharp"
            color="black"
            size={20}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default memo(DetailsHandle);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.125)',
    zIndex: 99999,
  },
  indicator: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    position: 'absolute',
    width: 35,
    height: 3,
    backgroundColor: '#AFAFAF',
    borderTopStartRadius: 2,
    borderBottomStartRadius: 2,
    borderTopEndRadius: 2,
    borderBottomEndRadius: 2,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    marginTop: 20,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 5,
    marginLeft: 15,
  },
});
