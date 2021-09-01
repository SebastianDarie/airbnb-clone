import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading, Title} from 'react-native-paper';
import ReservationStore from '../../global-stores/useReservationStore';
import {Counter} from '../Counter';
import DetailsHandle from '../header/DetailsHandle';

interface GuestsModalProps {
  adults: number;
  children: number;
  infants: number;
}

export const GuestsModal: React.FC<GuestsModalProps> = ({
  adults,
  children,
  infants,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => [1, '25%'], []);

  const renderDetailsHandle = useCallback(
    props => (
      <DetailsHandle
        title="Guests"
        onPress={() => bottomSheetModalRef.current?.close()}
        {...props}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      handleComponent={renderDetailsHandle}>
      <View style={styles.mainWrapper}>
        <View style={styles.rowFlex}>
          <View>
            <Title style={styles.title}>Adults</Title>
            <Subheading style={styles.agesText}>Ages 13 or above</Subheading>
          </View>

          <View style={styles.counterView}>
            <Counter
              value={adults}
              updateValue={ReservationStore.updateAdults}
            />
          </View>
        </View>

        <View style={styles.rowFlex}>
          <View>
            <Title style={styles.title}>Children</Title>
            <Subheading style={styles.agesText}>Ages 2-12</Subheading>
          </View>

          <View style={styles.counterView}>
            <Counter
              value={children}
              updateValue={ReservationStore.updateChildren}
            />
          </View>
        </View>

        <View style={styles.rowFlex}>
          <View>
            <Title style={styles.title}>Infants</Title>
            <Subheading style={styles.agesText}>Under 2</Subheading>
          </View>

          <View style={styles.counterView}>
            <Counter
              value={infants}
              updateValue={ReservationStore.updateInfants}
            />
          </View>
        </View>
      </View>
    </BottomSheetModal>
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
    fontSize: 13,
    marginTop: -5,
  },

  counterView: {
    width: '30%',
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
