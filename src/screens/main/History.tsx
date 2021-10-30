/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Gap, Text} from '../../components/atom';
import {API_HOST} from '../../config';

const History = ({navigation, route}: any) => {
  const [data, setData]: any = useState([]),
    getListData = () => {
      axios.post(`${API_HOST.order}`, {users_id: params.id}).then(res => {
        setData(res.data?.data);
      });
    };
  const params = route.params;
  console.log('params :', params);
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.box}>
        <View style={styles.title}>
          <Text type="semibold" size={20}>
            {item.name}
          </Text>
          <Text type="regular" size={20}>
            {item.price}
          </Text>
        </View>
        {item.status === 'On Delivery' ? (
          <Text
            align="right"
            style={styles.status}
            type="semibold"
            color="orange"
            size={18}>
            {item.status}
          </Text>
        ) : (
          <Text
            align="right"
            style={styles.status}
            color="green"
            type="semibold"
            size={18}>
            {item.status}
          </Text>
        )}
      </View>
    );
  };
  useEffect(() => {
    getListData();
  }, []);
  console.log(data.status);
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text type="semibold" size={25}>
          Order History
        </Text>
      </View>
      <Gap height={heightPercentageToDP(0.6)} />
      <FlatList
        data={data.slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={(_, idx: number) => idx.toString()}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: heightPercentageToDP(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: '#dfe6e9',
  },
  box: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(15),
    backgroundColor: 'white',
    marginBottom: heightPercentageToDP(3),
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  title: {
    marginLeft: widthPercentageToDP(5),
    marginTop: heightPercentageToDP(2),
  },
  status: {
    marginLeft: widthPercentageToDP(29),
    marginTop: heightPercentageToDP(2),
  },
});
