import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, Divider, Subheading, Title} from 'react-native-paper';
import shallow from 'zustand/shallow';
import {Counter} from '../../components/Counter';
import {GradientWrapper} from '../../components/GradientWrapper';
import {SearchHeader} from '../../components/header/SearchHeader';
import {SearchActions} from '../../components/SearchActions';
import {useSearchStore} from '../../global-stores/useSearchStore';
import {GuestsScreenNavigationProp} from '../../navigation/RootNavigation';

export const GuestsController: React.FC<GuestsScreenNavigationProp> = ({
  navigation,
}) => {
  const [adults, children, infants, startDate, endDate] = useSearchStore(
    state => [
      state.adults,
      state.children,
      state.infants,
      state.startDate,
      state.endDate,
    ],
    shallow,
  );
  const [setAdults, setChildren, setInfants] = useSearchStore(
    state => [state.setAdults, state.setChildren, state.setInfants],
    shallow,
  );

  const onPress = () => {
    navigation.navigate('Home', {
      screen: 'Explore',
      params: {
        screen: 'Listings',
      },
    });
  };

  return (
    <GradientWrapper>
      <SearchHeader title="Paris    " />
      <View style={styles.mainWrapper}>
        <View style={styles.rowFlex}>
          <View>
            <Title style={styles.title}>Adults</Title>
            <Subheading style={styles.agesText}>Ages 13 or above</Subheading>
          </View>

          <View style={styles.counterView}>
            <Counter value={adults} updateValue={setAdults} />
          </View>
        </View>
        <Divider />

        <View style={styles.rowFlex}>
          <View>
            <Title style={styles.title}>Children</Title>
            <Subheading style={styles.agesText}>Ages 2-12</Subheading>
          </View>

          <View style={styles.counterView}>
            <Counter value={children} updateValue={setChildren} />
          </View>
        </View>
        <Divider />

        <View style={styles.rowFlex}>
          <View>
            <Title style={styles.title}>Infants</Title>
            <Subheading style={styles.agesText}>Under 2</Subheading>
          </View>

          <View style={styles.counterView}>
            <Counter value={infants} updateValue={setInfants} />
          </View>
        </View>
        <Divider />
      </View>

      <SearchActions
        disabled={(adults || children || infants) === 0}
        navigation={navigation}
        route={'Home'}
        params={{screen: 'Explore', params: {screen: 'Listings'}}}
        onPress={onPress}
        text="Search"
      />
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
    color: Colors.grey500,
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
