import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Gap, Text} from '../../components/atom';
import AwesomeAlert from 'react-native-awesome-alerts';
import {getData} from '../../utils/storage/storage';
import axios from 'axios';
import {API_HOST} from '../../config';
import {useNavigation} from '@react-navigation/core';

const Order = ({route}: any) => {
  const params = route.params,
    [alert, setAlert] = useState(false);
  const [get, setGetData] = useState('');
  const showAlert = () => {
    setAlert(true);
  };
  const navigation = useNavigation();
  const hideAlert = () => {
    navigation.navigate('Home');
  };
  const orderBy = {
    users_id: get?.id,
    foods_id: params.id,
  };

  const handleOrder = () => {
    axios
      .post(`${API_HOST.order}/create`, orderBy)
      .then(res => {
        showAlert();
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
  useEffect(() => {
    getData('profile').then(res => {
      setGetData(res);
    });
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text size={25} type="semibold">
          {params.name}
        </Text>
      </View>
      <Gap height={heightPercentageToDP(0.7)} />
      <Image source={{uri: params.photo}} style={styles.img} />
      <View style={styles.content}>
        <Text style={styles.desc} type="regular">
          {params.description}
        </Text>
        <View style={styles.bottomTab}>
          <Text type="bold" color="green" size={20}>
            Rp {params.price}
          </Text>
          <Button
            type="success"
            rounded
            title="Order"
            style={styles.btn}
            onPress={handleOrder}
          />
        </View>
      </View>
      <AwesomeAlert
        show={alert}
        title="ORDER PLACED"
        message="Mari Check Status Orderan Anda"
        showConfirmButton
        confirmText="ke Home"
        onConfirmPressed={hideAlert}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: heightPercentageToDP(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    backgroundColor: '#dfe6e9',
  },
  img: {
    width: widthPercentageToDP(90),
    alignSelf: 'center',
    height: heightPercentageToDP(40),
    borderRadius: 20,
  },
  content: {
    backgroundColor: 'white',
    height: heightPercentageToDP(40),
    marginTop: heightPercentageToDP(4),
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  desc: {
    marginHorizontal: widthPercentageToDP(8),
    marginTop: heightPercentageToDP(5),
  },
  btn: {
    width: widthPercentageToDP(40),
  },
  bottomTab: {
    marginTop: heightPercentageToDP(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
