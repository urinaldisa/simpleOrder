import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Gap, Text} from '../../components/atom';
import {getData} from '../../utils/storage/storage';
import ImagePicker from 'react-native-image-crop-picker';
import axios, {AxiosError} from 'axios';
import {API_HOST} from '../../config';

const Profile = ({navigation}: any) => {
  const [get, setGetData] = useState({});
  useEffect(() => {
    getData('profile').then(res => {
      setGetData(res);
    });
  }, []);
  const handleUpload = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      compressImageQuality: 0.4,
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      const source = {
        uri: image.path,
        type: image.mime,
        name: image.filename || `${Date.now()}.jpg`,
      };
      axios
        .post(`${API_HOST.url}/user/update-photo`, {
          id: get.id,
          photo: source.uri,
        })
        .then(res => {
          console.log(res);
        })
        .catch(({response}: AxiosError) => {
          console.log(response);
        });
    });
  };
  const handleLogout = () => {
    navigation.replace('Login');
  };
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text type="semibold" size={25}>
          Profile
        </Text>
      </View>
      <View style={styles.content}>
        <Image source={{uri: get.photo}} style={styles.img} />
        <View style={styles.button}>
          <Button
            rounded
            type="success"
            title="Change Photo"
            onPress={handleUpload}
          />
          <Gap height={heightPercentageToDP(0.2)} />
          <Button rounded type="danger" title="LogOut" onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#dfe6e9',
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    height: heightPercentageToDP(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(50),
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: heightPercentageToDP(14),
    borderRadius: 12,
  },
  button: {
    marginTop: heightPercentageToDP(5),
    marginHorizontal: widthPercentageToDP(5),
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    alignSelf: 'center',
    marginTop: heightPercentageToDP(5),
  },
});
