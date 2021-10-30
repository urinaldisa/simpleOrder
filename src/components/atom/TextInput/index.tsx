/* eslint-disable react-native/no-inline-styles */

import React, {FC, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput as TextInputRN,
  KeyboardType,
  Image,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button} from '..';
import {colors} from '../../../themes/color';
import {images} from '../../../themes/images';
import {sizes} from '../../../themes/sizes';
import Text from '../Text';

type PropsInput = {
  label?: string;
  labeltype?: 'thin' | 'regular' | 'semibold' | 'bold';
  labelColor?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  value?: string;
  textColor?: string;
  type?: 'default' | 'password' | 'phone-number';
  focusedBorderColor?: string;
  blurBorderColor?: string;
  defaultCountry?: any;
  isPhoneNumber?: boolean;
  keyboardType?: KeyboardType;
};

const TextInput: FC<PropsInput> = ({
  label,
  labeltype = 'bold',
  labelColor,
  placeholder,
  placeholderTextColor,
  focusedBorderColor,
  blurBorderColor,
  textColor,
  type,
  keyboardType,
  onChangeText,
}: PropsInput) => {
  const [isFocused, setFocused] = useState<boolean>(false),
    [hide, setHide] = useState<boolean>(true);

  const onBlur = () => {
    setFocused(false);
  };

  const onFocus = () => {
    setFocused(true);
  };

  const toggleHide = () => {
    setHide(!hide);
  };

  return (
    <View style={styles.container}>
      <Text type={labeltype} style={styles.label} color={labelColor}>
        {label}
      </Text>
      <TextInputRN
        placeholderTextColor={placeholderTextColor}
        onBlur={onBlur}
        selectionColor={colors.primary}
        onFocus={onFocus}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        style={[
          styles.input,
          {
            color: textColor,
            borderColor: isFocused
              ? focusedBorderColor || colors.primary
              : blurBorderColor || 'grey',
            borderWidth: isFocused ? 2 : 1,
          },
        ]}
        clearButtonMode="always"
        secureTextEntry={type === 'password' && hide}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <Button
          onPress={toggleHide}
          rounded
          type="none"
          style={styles.buttonIcon}>
          <Image
            source={hide ? images.eye : images.eye_off}
            style={styles.iconHide}
          />
        </Button>
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(7),
    marginVertical: heightPercentageToDP(3),
  },
  label: {marginBottom: heightPercentageToDP(2)},
  input: {
    borderRadius: sizes.radiusMedium,
    height: heightPercentageToDP(7),
    padding: 10,
    overflow: 'hidden',
    fontFamily: 'Montserrat-Regular',
  },
  buttonIcon: {
    height: heightPercentageToDP(7),
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -heightPercentageToDP(8 / 2),
    right: widthPercentageToDP(3),
  },
  iconHide: {
    height: 26,
    width: 26,
  },
  thin: {
    fontFamily: 'Montserrat-Thin',
  },
  regular: {
    fontFamily: 'Montserrat-Regular',
  },
  semibold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
  },
});
