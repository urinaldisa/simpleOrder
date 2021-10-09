/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Gap, Text, TextInput} from '../../components/atom';
import 'moment/locale/id';
import moment from 'moment';
import {API_HOST} from '../../config';
import {images} from '../../themes/images';

const Home = () => {
  const [res, setResult] = useState('');
  const getData = () => {
    axios.get(`${API_HOST.url}`).then(({data}: any) => {
      setResult(data);
      console.log('data :', res);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(res);
  return (
    <View style={styles.page}>
      <View style={styles.buble} />
      <Gap height={heightPercentageToDP(0.6)} />
      <Text align="center" size={20} type="semibold" color="white">
        {res.name}
      </Text>
      <Text align="center" size={18} type="regular" color="white">
        {moment().format('LL')}
      </Text>
      <Gap height={heightPercentageToDP(0.5)} />
      <View style={styles.content}>
        <View style={styles.box}>
          <Text type="semibold" color="white">
            Temp
          </Text>
          <Text type="semibold" color="white">
            {res.main?.temp}
          </Text>
        </View>
        <View style={styles.box}>
          <Text type="semibold" color="white">
            Condition
          </Text>
          <Text type="semibold" color="white">
            {res.wind?.speed}
          </Text>
        </View>
        <View style={styles.box}>
          <Text type="semibold" color="white">
            Humidity
          </Text>
          <Text type="semibold" color="white">
            {res.main?.humidity} %
          </Text>
        </View>
      </View>
      <Gap height={heightPercentageToDP(0.5)} />
      <Text align="center" color="white" type="semibold" size={20}>
        Forecast Report
      </Text>
      <View style={styles.desc}>
        <View style={styles.text}>
          <Text type="regular" color="white">
            Condition : {res.weather?.[0].main}
          </Text>
          <Text type="regular" color="white">
            Description : {res.weather?.[0].description}
          </Text>
          <Text type="regular" color="white">
            Pressure : {res.main?.pressure}
          </Text>
        </View>
      </View>
      <Image source={images.vector} style={styles.img} />
    </View>
  );
};

export default Home;

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
  content: {
    width: widthPercentageToDP(90),
    alignSelf: 'center',
    height: heightPercentageToDP(10),
    backgroundColor: '#12122B',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: heightPercentageToDP(30),
    position: 'absolute',
    marginTop: heightPercentageToDP(55),
    marginLeft: widthPercentageToDP(20),
    opacity: 0.7,
  },
  desc: {
    width: widthPercentageToDP(90),
    alignSelf: 'center',
    height: heightPercentageToDP(12),
    backgroundColor: '#12122B',
    borderRadius: 12,
  },
  text: {
    marginLeft: widthPercentageToDP(5),
    marginTop: heightPercentageToDP(1),
  },
});
