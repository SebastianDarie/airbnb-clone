import React, {useCallback, useState} from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaleButton} from '../../components/button/ScaleButton';
import {TripsScreenNavigationProp} from '../../navigation/RootNavigation';

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const TripsController: React.FC<TripsScreenNavigationProp> = ({}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            colors={['#ff385c', '#ff385d']}
            tintColor="#ff385c"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Text style={styles.title}>Trips</Text>
        <View style={styles.divider} />
        <View>
          <Text style={styles.helloTitle}>Say hello to the world again</Text>
          <Text style={styles.planParagraph}>
            Plan a new trip and explore places to stay close to all the places
            you love.
          </Text>

          <ScaleButton style={styles.scaleBtnContainer}>
            <Text style={styles.scaleText}>Start exploring</Text>
          </ScaleButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  divider: {
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 1,
    width: '100%',
  },

  helloTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    lineHeight: 26,
    marginTop: 40,
    marginBottom: 5,
  },

  planParagraph: {
    fontSize: 15,
    letterSpacing: 0.5,
    marginBottom: 10,
  },

  scaleBtnContainer: {
    justifyContent: 'center',
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    width: '50%',
  },

  scaleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  scrollView: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
