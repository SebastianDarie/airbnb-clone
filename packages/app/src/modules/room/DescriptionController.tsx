import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect, useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DetailsHandle from '../../components/header/DetailsHandle';
import {DescriptionScreenNavigationProp} from '../../navigation/RootNavigation';

export const DescriptionController: React.FC<{description: string}> = ({
  description,
}) => {
  const {bottom: bottomSafeArea} = useSafeAreaInsets();
  const bottomModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => [0, '100%'], []);

  const contentContainerStyle = useMemo(
    () => ({
      ...styles.contentContainer,
      paddingBottom: bottomSafeArea,
    }),
    [bottomSafeArea],
  );

  useLayoutEffect(() => {
    bottomModalRef.current?.expand();
  }, []);

  const renderDetailsHandle = useCallback(
    props => <DetailsHandle title="About this space" {...props} />,
    [],
  );

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomModalRef}
          snapPoints={snapPoints}
          handleComponent={renderDetailsHandle}>
          <BottomSheetScrollView
            style={styles.scrollViewContainer}
            contentContainerStyle={contentContainerStyle}
            focusHook={useFocusEffect}
            bounces>
            <Text>{description}</Text>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', padding: 20},
  contentContainer: {
    paddingHorizontal: 16,
    overflow: 'visible',
  },
  scrollViewContainer: {
    flex: 1,
    overflow: 'visible',
  },
});
