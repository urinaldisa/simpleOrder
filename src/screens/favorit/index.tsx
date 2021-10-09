import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Gap, Text} from '../../components/atom';
import {API_HOST} from '../../config';

const Favorit = () => {
  const [key, setKey] = useState<string>(''),
    [show, setShow] = useState(false),
    [weather, setWeather] = useState([]),
    getData = () => {
      setShow(false);
      axios
        .get(`${API_HOST.search}${key}&appid=${API_HOST.token}`)
        .then(({data}: any) => {
          setWeather(data);
          console.log(weather.name);
          setShow(true);
        });
    };
  const RenderItem = () => {
    return (
      <View style={styles.content}>
        <Gap height={heightPercentageToDP(0.5)} />
        <Text align="center" type="semibold" color="white" size={25}>
          {weather.name}
        </Text>
        <Gap height={heightPercentageToDP(0.5)} />
        <View style={styles.wrapper}>
          <View style={styles.box}>
            <Text type="semibold" color="white">
              Temp
            </Text>
            <Text type="semibold" color="white">
              {weather.main?.temp}
            </Text>
          </View>
          <View style={styles.box}>
            <Text type="semibold" color="white">
              Condition
            </Text>
            <Text type="semibold" color="white">
              {weather.wind?.speed}
            </Text>
          </View>
          <View style={styles.box}>
            <Text type="semibold" color="white">
              Humidity
            </Text>
            <Text type="semibold" color="white">
              {weather.main?.humidity} %
            </Text>
          </View>
        </View>
        <Gap height={heightPercentageToDP(1)} />
        {/* slide 2 */}
        <View style={styles.wrapper}>
          <View style={styles.box}>
            <Text type="regular" color="white">
              Condition
            </Text>
            <Text type="semibold" color="white">
              {weather.weather?.[0].main}
            </Text>
          </View>
          <View style={styles.box}>
            <Text type="regular" color="white">
              Description
            </Text>
            <Text type="semibold" color="white">
              {weather.weather?.[0].description}
            </Text>
          </View>
          <View style={styles.box}>
            <Text type="regular" color="white">
              Pressure
            </Text>
            <Text type="semibold" color="white">
              {weather.main?.pressure}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.page}>
      <View style={styles.buble} />
      <View style={styles.label}>
        <Text align="center" size={20} type="semibold" color="white">
          Pick Location
        </Text>
        <Text align="center" size={15} type="regular" color="white">
          Find the city that you want to know the detail weather info at the
          time
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(value: string) => setKey(value)}
          value={key}
          returnKeyType="search"
          onSubmitEditing={getData}
        />
        {show === true && <RenderItem />}
      </View>
    </View>
  );
};

export default Favorit;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#06092F',
  },
  buble: {
    width: 200,
    height: 200,
    backgroundColor: '#057097',
    borderRadius: 100,
    marginLeft: widthPercentageToDP(70),
    position: 'absolute',
    top: heightPercentageToDP(-10),
    opacity: 0.7,
  },
  label: {
    marginTop: heightPercentageToDP(5),
    marginHorizontal: widthPercentageToDP(5),
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: heightPercentageToDP(2),
  },
  content: {
    height: heightPercentageToDP(50),
    backgroundColor: '#12122B',
    borderRadius: 12,
    marginTop: heightPercentageToDP(2),
  },
  wrapper: {
    width: widthPercentageToDP(90),
    alignSelf: 'center',
    height: heightPercentageToDP(10),
    backgroundColor: '#12122B',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  box: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#057097',
    width: widthPercentageToDP(20),
    height: heightPercentageToDP(10),
  },
});
