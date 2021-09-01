import {
  BottomSheetModal,
  BottomSheetScrollView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import {ListingQuery} from '@second-gear/controller';
import React, {useCallback, useMemo, useRef} from 'react';
import {Text, View} from 'react-native';
import {Colors, Paragraph} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DetailsHandle from '../../components/header/DetailsHandle';
import {styles} from './styles';

interface DescriptionSectionProps {
  data: ListingQuery;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  data,
}) => {
  const {top: topSafeArea, bottom: bottomSafeArea} = useSafeAreaInsets();
  const bottomModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => [1, '100%'], []);

  const contentContainerStyle = useMemo(
    () => ({
      ...styles.contentContainer,
      paddingBottom: bottomSafeArea,
    }),
    [bottomSafeArea],
  );

  const renderDetailsHandle = useCallback(
    props => (
      <DetailsHandle
        title="About this space"
        onPress={() => bottomModalRef.current?.close()}
        {...props}
      />
    ),
    [],
  );

  return (
    <View style={styles.section}>
      <Paragraph>{data?.listing?.description.slice(0, 100)}</Paragraph>
      <TouchableOpacity onPress={() => bottomModalRef.current?.present()}>
        <View style={styles.showMoreContainer}>
          <Text style={styles.showMore}>Show More</Text>
          <FeatherIcon
            name="chevron-right"
            color={Colors.black}
            size={18}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginTop: 4}}
          />
        </View>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomModalRef}
        index={1}
        snapPoints={snapPoints}
        topInset={topSafeArea}
        handleComponent={renderDetailsHandle}
        enablePanDownToClose>
        <BottomSheetScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={contentContainerStyle}
          focusHook={useFocusEffect}
          bounces>
          <Text>{data?.listing?.description}</Text>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
