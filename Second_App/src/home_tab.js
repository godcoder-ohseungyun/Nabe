// height이랑 width로 된거 flex로 나중에 바꿔줘야함!!!!!

import * as React from 'react';
import Voice from '@react-native-community/voice';
import {theme} from '../colors';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';

const TabHomeScreen: () => Node = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = payload => setText(payload);
  const addToDo = () => {
    if (text === '') {
      return;
    }
    // save to do
    setText('');
  };

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    setStarted('True');
  };
  const onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    setStarted(null);
    setEnd('True');
  };
  const onSpeechError = e => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };
  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };
  const onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };
  const onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechRecognizing = async () => {
    try {
      await Voice.start(
        'en-US',
        // , {EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000,}
      );
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      console.error(e);
    }
  };
  const stopSpeechRecognizing = async () => {
    try {
      await Voice.stop();
      setStarted(null);
    } catch (e) {
      console.error(e);
    }
  };

  const data = [
    {
      title: 'Lunch Appointment',
      subtitle: 'With Harry',
      start: new Date(2022, 5, 2, 13, 20),
      end: new Date(2022, 5, 2, 14, 20),
      color: '#390099',
    },
  ];

  LocaleConfig.locales['fr'] = {
    monthNames: [
      'January',
      'Fabruary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan.',
      'Feb.',
      'Mar',
      'Apr',
      'May',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'today',
  };
  LocaleConfig.defaultLocale = 'fr';

  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  // class TabHomeScreen extends Component {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? 'white' : theme.grey,
              flex: 1,
            }}>
            NAV=I
          </Text>
        </TouchableWithoutFeedback>

        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          value={text}
          placeholder={working ? 'Add a To Do' : 'Where do you Want to go?'}
          style={{...styles.input, flex: 3, height: 55}}
        />
        {!started ? (
          <TouchableHighlight
            onPress={startSpeechRecognizing}
            style={{flex: 1}}>
            <Image
              style={styles.button}
              source={{
                uri: 'https://png.pngtree.com/png-vector/20190329/ourlarge/pngtree-vector-microphone-icon-png-image_889382.jpg',
              }}
            />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight onPress={stopSpeechRecognizing} style={{flex: 1}}>
            <Image
              style={styles.button}
              source={{
                uri: 'https://preview.redd.it/axorctfsk4v01.jpg?auto=webp&s=b9f5f8c1a353bd10aa7f3fa61e24b756ff042a7b',
              }}
            />
          </TouchableHighlight>
        )}
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? 'white' : theme.grey,
              // flex: 1,
            }}>
            Sound
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'green'}}>
        <TouchableOpacity
          onPress={() => {
            console.log('Need to show next sentence or give a feedback');
          }}>
          <Text style={styles.secondHeader}>
            새로운 내일을 만날 준비가 됐나요?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keywordSection}>
        <TouchableOpacity
          onPress={() => {
            console.log('Keyword Pressed');
          }}>
          <Text style={styles.keywordText}>키워드</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('Practice Interview Pressed');
          }}>
          <Text style={styles.keywordText}>모의 면접</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('ToEiC Study Pressed');
          }}>
          <Text style={styles.keywordText}>토익 스터디</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondContainer}>
        {/* 음성인식한거 텍스트 아래에 추가됨 */}
        <View style={styles.messageBox}>
          <ScrollView>
            {partialResults.map((result, index) => {
              return (
                <Text key={`partial-result-${index}`} style={styles.resultBox}>
                  {result}
                </Text>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <View>
        {/* 스케줄 여기에 추가 */}
        <View style={styles.calenderBox}>
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: 'red',
              height: 440,
            }}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
            // Initially visible month. Default = now
            current={'2022-05-01'}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2022-03-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2032-03-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              console.log('selected day', day);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MMMM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            // Hide month navigation arrows. Default = false
            // hideArrows={true}

            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={direction => <Arrow />}

            // Do not show days of other months in month page. Default = false
            // hideExtraDays={true}

            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            // hideDayNames={true}

            // Show week numbers to the left. Default = false
            // showWeekNumbers={true}

            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            // disableArrowLeft={true}

            // Disable right arrow. Default = false
            // disableArrowRight={true}

            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter
            // renderHeader={date => {
            //   /*Return JSX*/
            // }}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
            // markingType={'multi-dot'}
            // markedDates={{
            //   '2022-05-25': {
            //     dots: [vacation, massage, workout],
            //     selected: true,
            //     selectedColor: 'red',
            //   },
            //   '2022-05-11': {dots: [massage, workout], disabled: true},
            // }}
            markingType={'period'}
            markedDates={{
              '2022-05-20': {textColor: 'green'},
              '2022-05-22': {startingDay: true, color: 'green'},
              '2022-05-23': {
                selected: true,
                endingDay: true,
                color: 'green',
                textColor: 'gray',
              },
              '2022-05-04': {
                disabled: true,
                startingDay: true,
                color: 'red',
                endingDay: true,
              },
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: 0,
  },
  secondContainer: {
    backgroundColor: 'grey',
  },
  messageBox: {
    height: 20,
    backgroundColor: 'orange',
  },
  resultBox: {
    backgroundColor: 'blue',
    fontSize: 20,
  },
  calenderBox: {
    backgroundColor: 'blue',
  },
  button: {
    width: 50,
    height: 50,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: 'red',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: -10,
    marginRight: 0,
    fontSize: 18,
  },
  secondHeader: {
    color: 'black',
    marginVertical: 10,
    // marginLeft: 10,
    fontSize: 15,
    backgroundColor: 'blue',
  },
  keywordSection: {
    flexDirection: 'row',
  },
  keywordText: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    width: 100,
    backgroundColor: 'green',
  },
});

export default TabHomeScreen;


// 1
markedDates={{
  '2022-05-25': {
    dots: [vacation, massage, workout],
    selected: true,
    selectedColor: 'red',
  },
  '2022-05-26': {dots: [massage, workout], disabled: true},
}}

markedDates={{
  {data[0].User_sc.date}: {
    dots: [vacation, massage, workout],
    // selected: true,
    // selectedColor: 'red',
  },
  {data[1].User_sc.user_sc_list[0]}: {dots: [massage, workout]}
}}



// 2 and 3
const myEvents = [
  {
    id: 1,
    description: 'Event',
    startDate: new Date(2022, 5, 5, 12, 0),
    endDate: new Date(2022, 5, 5, 12, 30),
    color: 'blue',
    // ... more properties if needed,
  },
  // More events...
];

const myEvents = [
  {
    id: 1, // i같은거 사용
    description: {data[0].User_sc.user_sc_list[0].detail},
    startDate: generateDates(
      Number(
        data[0].User_sc.user_sc_list[0].s_time[0] +
          data[0].User_sc.user_sc_list[0].s_time[1],
      ),
    ),
    endDate: generateDates(
      Number(
        data[0].User_sc.user_sc_list[0].e_time[0] +
          data[0].User_sc.user_sc_list[0].e_time[1],
      ),
    ),
    color: 'blue', // 색은 배열하나 만들어서 거기서 가져와서 쓰는걸로
    // ... more properties if needed,
  },
  // More events...
];






























