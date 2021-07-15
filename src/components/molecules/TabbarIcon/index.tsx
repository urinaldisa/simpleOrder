import React from 'react';
import {Image, StyleSheet, View, ImageSourcePropType} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {colors} from '../../../themes/color';
import {Text} from '../../atom';

type PropsIcon = {
  focused: boolean;
  iconActive: ImageSourcePropType;
  iconNonActive: ImageSourcePropType;
  routeName?: string;
};

function TabbarIcon({
  focused,
  iconActive,
  iconNonActive,
  routeName,
}: PropsIcon) {
  return (
    <View style={styles.box}>
      <Image
        style={styles.icon}
        source={focused ? iconActive : iconNonActive}
      />
      <Text
        type={focused ? 'semibold' : 'regular'}
        size={12}
        color={focused ? colors.primary : colors.light}>
        {routeName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    alignSelf: 'center',
    width: widthPercentageToDP(100 / 4),
    justifyContent: 'center',
  },
  icon: {
    height: heightPercentageToDP(3),
    resizeMode: 'contain',
    marginTop: -3,
  },
});

export default TabbarIcon;
