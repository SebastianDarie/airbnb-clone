import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CalendarList, DateObject, PeriodMarking} from 'react-native-calendars';
import {Colors} from 'react-native-paper';
import shallow from 'zustand/shallow';
import {GradientWrapper} from '../../components/GradientWrapper';
import {SearchHeader} from '../../components/header/SearchHeader';
import {SearchActions} from '../../components/SearchActions';
import {useSearchStore} from '../../global-stores/useSearchStore';
import {CalendarScreenNavigationProp} from '../../navigation/RootNavigation';

export const CalendarController: React.FC<CalendarScreenNavigationProp> = ({
  navigation,
}) => {
  const [fromDate, setFromDate] = React.useState('');
  const [isStartDatePicked, setIsStartDatePicked] = React.useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = React.useState(false);
  const [markedDates, setMarkedDates] = React.useState<{
    [date: string]: PeriodMarking;
  }>({});
  const [setStartDate, setEndDate] = useSearchStore(
    state => [state.setStartDate, state.setEndDate],
    shallow,
  );

  const setupStartMarker = (day: DateObject) => {
    let _markedDates: {[date: string]: PeriodMarking} = {
      [day.dateString]: {
        startingDay: true,
        color: '#ff385d',
        textColor: Colors.white,
      },
    };
    setIsStartDatePicked(true);
    setIsEndDatePicked(false);
    setFromDate(day.dateString);
    setMarkedDates(_markedDates);
  };

  const setupMarkedDates = (
    _fromDate: string,
    toDate: string,
    _markedDates: {[date: string]: PeriodMarking},
  ): [{[date: string]: PeriodMarking}, number] => {
    let mFromDate = dayjs(_fromDate);
    let mToDate = dayjs(toDate);
    let range = mToDate.diff(mFromDate, 'days');
    if (range >= 0) {
      if (range === 0) {
        _markedDates = {[toDate]: {color: '#ff385d', textColor: Colors.white}};
      } else {
        for (let i = 1; i <= range; i++) {
          let tempDate = mFromDate.add(i, 'day').format('YYYY-MM-DD');
          if (i < range) {
            markedDates[tempDate] = {color: '#ff385d', textColor: Colors.white};
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: '#ff385d',
              textColor: Colors.white,
            };
          }
        }
      }
    }
    return [markedDates, range];
  };

  const onDayPress = (day: DateObject) => {
    if (!isStartDatePicked || (isStartDatePicked && isEndDatePicked)) {
      setupStartMarker(day);
    } else if (!isEndDatePicked) {
      let _markedDates = {...markedDates};
      let [mMarkedDates, range] = setupMarkedDates(
        fromDate,
        day.dateString,
        _markedDates,
      );
      if (range >= 0) {
        setIsStartDatePicked(true);
        setIsEndDatePicked(true);
        setMarkedDates(mMarkedDates);
      } else {
        setupStartMarker(day);
      }
    }
  };

  const markedArray = Object.keys(markedDates);
  const disabled = markedArray.length <= 1;

  const onPress = () => {
    setStartDate(markedArray[0]);
    setEndDate(markedArray[markedArray.length - 1]);
    navigation.navigate('Guests');
  };

  let during = '';
  let startDay = dayjs(markedArray[0]);
  let endDay = dayjs(markedArray[markedArray.length - 1]);
  if (startDay.day() === endDay.day()) {
    during = startDay.format('MMM DD ');
  } else if (startDay.month() === endDay.month()) {
    during = startDay.format('MMM DD ') + endDay.format('- DD');
  } else {
    during = startDay.format('MMM DD ') + endDay.format('- MMM DD');
  }

  return (
    <GradientWrapper>
      <View style={styles.calendarContainer}>
        <SearchHeader title="When will you be there?" subheading={during} />
        <CalendarList
          current={fromDate}
          minDate={new Date()}
          futureScrollRange={12}
          hideExtraDays
          markingType="period"
          markedDates={markedDates}
          pastScrollRange={0}
          theme={{
            'stylesheet.day.period': {
              base: {
                overflow: 'hidden',
                height: 34,
                alignItems: 'center',
                width: 38,
              },
            },
          }}
          onDayPress={onDayPress}
        />
      </View>

      <SearchActions
        disabled={disabled}
        navigation={navigation}
        route={'Guests'}
        onPress={onPress}
        setMarkedDates={setMarkedDates}
      />
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },
});
