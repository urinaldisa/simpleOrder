/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Gap, Text} from '../../components/atom';
import {API_HOST} from '../../config';
import {images} from '../../themes/images';
import {getData} from '../../utils/storage/storage';

const Home = () => {
  const [data, setData] = useState(),
    [get, setGetData] = useState({}),
    getListData = () => {
      axios.get(`${API_HOST.url}/foods`).then(res => {
        console.log('cek', res.data?.data);
        setData(res.data?.data);
      });
    };
  const navigation = useNavigation();
  const renderItem = ({item}: any) => {
    return (
      <Button
        rounded
        type="none"
        style={styles.render}
        onPress={() => navigation.navigate('Order', item)}>
        <Image source={{uri: item.photo}} style={styles.img} />
        <View style={styles.text}>
          <Text type="semibold" size={18}>
            {item?.name}
          </Text>
          <Text color="darkgreen" type="regular" size={18}>
            {item?.price}
          </Text>
        </View>
      </Button>
    );
  };
  useEffect(() => {
    getListData();
    getData('profile').then(res => {
      setGetData(res);
    });
  }, []);
  console.log(get);
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text type="semibold" size={25}>
          Food Order
        </Text>
        <Button
          rounded
          type="none"
          style={styles.btn}
          onPress={() => navigation.navigate('History', get)}>
          <Image source={images.tab.other} />
        </Button>
      </View>
      <Gap height={heightPercentageToDP(0.7)} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, idx: number) => idx.toString()}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: heightPercentageToDP(10),
    flexDirection: 'row',
  },
  page: {
    backgroundColor: '#dfe6e9',
    flex: 1,
  },
  render: {
    backgroundColor: 'white',
    height: heightPercentageToDP(14),
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP(3),
    marginBottom: heightPercentageToDP(5),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  img: {
    width: widthPercentageToDP(25),
    height: '100%',
  },
  text: {
    marginLeft: widthPercentageToDP(5),
  },
  btn: {
    backgroundColor: 'lightgrey',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginLeft: widthPercentageToDP(50),
  },
});
