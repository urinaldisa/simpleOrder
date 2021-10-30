import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Gap, Text, TextInput} from '../../components/atom';
import {API_HOST} from '../../config';
import {useForm} from '../../utils';
import {getData, storeData} from '../../utils/storage/storage';

const Login = ({navigation}: any) => {
  const [form, setForm] = useForm({
    username: '',
    password: '',
  });
  const [get, setGetData] = useState('');
  const onSubmit = () => {
    axios.post(`${API_HOST.url}/login`, form).then(res => {
      console.log(res.data.status);
      if (res.data.status === 200) {
        storeData('profile', res.data.data);
        navigation.replace('MainApp');
      } else {
        console.log('error sob');
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
      <Gap height={heightPercentageToDP(3)} />
      <Text align="center" type="semibold" size={36}>
        Food Order
      </Text>
      <View style={styles.content}>
        <TextInput
          placeholder="Email Address Here"
          placeholderTextColor="grey"
          textColor="black"
          value={form.username}
          onChangeText={value => setForm('username', value)}
        />
        <TextInput
          placeholder="Password Here"
          placeholderTextColor="grey"
          textColor="black"
          type="password"
          value={form.password}
          onChangeText={value => setForm('password', value)}
        />
        <Gap height={heightPercentageToDP(1)} />
        <Button type="success" rounded title="Login" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginHorizontal: widthPercentageToDP(5),
  },
});
