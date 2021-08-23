import dayjs from 'dayjs';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CalendarList, DateObject, PeriodMarking} from 'react-native-calendars';
import {Colors, Headline, IconButton, Title} from 'react-native-paper';
import shallow from 'zustand/shallow';
import {GradientButton} from '../../components/GradientBtn';
import {GradientWrapper} from '../../components/GradientWrapper';
import {useSearchStore} from '../../global-stores/useSearchStore';
import {ExploreNavigationProp} from '../../navigation/RootNavigation';

interface PeriodObject {
  [date: string]: PeriodMarking;
}

export const CalendarController: React.FC<ExploreNavigationProp> = ({
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

  // const isEmpty = (obj: Object) => {
  //   return Object.keys(obj).length === 0;
  // };

  // const getPeriod = (startTimestamp: number, endTimestamp: number) => {
  //   const period: {
  //     [date: string]: PeriodMarking;
  //   } = {};
  //   let start = dayjs.unix(startTimestamp);
  //   const end = dayjs.unix(endTimestamp);
  //   while (end.isAfter(start)) {
  //     period[start.format('YYYY-MM-DD')] = {
  //       color: '#ff385d',
  //       textColor: Colors.white,
  //       startingDay: dayjs(start).unix() === startTimestamp,
  //     };
  //     start = start.add(1, 'days');
  //   }
  //   period[end.format('YYYY-MM-DD')] = {
  //     color: '#ff385d',
  //     textColor: Colors.white,
  //     endingDay: true,
  //   };

  //   return period;
  // };

  // const setDate = (date: DateObject) => {
  //   const {dateString, timestamp} = date;

  //   if (isEmpty(startDate) || !isEmpty(startDate) || !isEmpty(endDate)) {
  //     const period: PeriodObject = {
  //       [dateString]: {
  //         color: '#ff385d',
  //         textColor: Colors.white,
  //         startingDay: true,
  //       },
  //     };
  //     setMarkedDates(period);
  //     setStartDate(date);
  //     setEndDate({});
  //   } else {
  //     const {timestamp: endTimestamp} = startDate;
  //     if (endTimestamp > timestamp) {
  //       const period = getPeriod(timestamp, endTimestamp);
  //       console.log(period);
  //       setMarkedDates(period);
  //     } else {
  //       const period = getPeriod(endTimestamp, timestamp);
  //       console.log(period);
  //       setMarkedDates(period);
  //     }
  //   }
  // };

  // const selectDate = (date: DateObject) => {
  //   if (isStartDatePicked === false) {
  //     let markedDates: {[date: string]: PeriodMarking} = {};
  //     markedDates[date.dateString] = {
  //       startingDay: true,
  //       color: '#ff385d',
  //       textColor: Colors.white,
  //     };
  //     setPeriod(markedDates);
  //     setIsEndDatePicked(false);
  //     setIsStartDatePicked(true);
  //     setStartDate(date.dateString);
  //   } else {
  //     let markedDates: {[date: string]: PeriodMarking} = {};
  //     let startDay = dayjs(startDate);
  //     let endDay = dayjs(date.dateString);
  //     let range = endDay.diff(startDay, 'days');
  //     if (range > 0) {
  //       for (let i = 1; i <= range; i++) {
  //         let tempDate: dayjs.Dayjs | string = startDay.add(1, 'day');
  //         tempDate = dayjs(tempDate).format('YYYY-MM-DD');
  //         if (i < range) {
  //           markedDates[tempDate] = {color: '#ff385d', textColor: Colors.white};
  //         } else {
  //           markedDates[tempDate] = {
  //             endingDay: true,
  //             color: '#ff385d',
  //             textColor: Colors.white,
  //           };
  //         }
  //       }

  //       setPeriod(markedDates);
  //       setIsEndDatePicked(true);
  //       setIsStartDatePicked(false);
  //       setStartDate('');
  //     }
  //   }
  // };

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
    // console.log(
    //   mFromDate.diff(mToDate, 'days'),
    //   mToDate.diff(mFromDate, 'days'),
    // );
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
      // console.log(mMarkedDates, range);
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

  return (
    <GradientWrapper>
      <View style={styles.calendarContainer}>
        <View style={styles.headerContainer}>
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <Title>When will you be there?</Title>
          <View style={styles.invisibleView} />
        </View>
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
      <View style={styles.calendarActions}>
        <View>
          <Pressable
            onPress={() => {
              if (disabled) {
                navigation.navigate('Guests');
              } else {
                setMarkedDates({});
              }
            }}>
            <Text style={styles.textBtn}>{disabled ? 'Skip' : 'Clear'}</Text>
          </Pressable>
        </View>
        <GradientButton disabled={disabled} onPress={onPress} />
      </View>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },

  invisibleView: {
    marginLeft: 35,
  },

  calendarActions: {
    borderTopColor: Colors.grey100,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },

  textBtn: {
    textDecorationLine: 'underline',
  },
});
