import { Image, StyleSheet, ActivityIndicator, Button, Text, View, TextInput, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ButtonText,
  InnerContainer,
  LeftIcon,
  LogoutButton,
  PageTitle,
  StyledButton,
  StyledContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  SubTitle,
} from '../../styles';
import logo from '../../assets/st_logo.png';
import { validateAccountNumber } from '../../service/nameEnquiry';
import { blockAccount } from '../../service/blockAccount';
import { PopupModal } from '../../components/AlertModal';
// 0002651348;

const Blocker = ({navigation}) => {
  const dispatch = useDispatch();
  const [account, setAccount] = useState('');
  const [visible, setVisible] = useState(true);
  const [accountVisible, setAccountVisible] = useState(true);

  const inputRef = useRef();

  const { loading: nameEnquiryLoading, data: accountName } = useSelector((state) => state.validateAccount);
  const { loading: blockerLoading, data: statusCode } = useSelector((state) => state.blockAccountNumber);

  const validateAccount = (text) => {
    if (text.length === 6 || text.length === 10) {
      setAccount(text);
      setAccountVisible(true);
      dispatch(validateAccountNumber(text));
    }
  };

  const logoutHandler = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login')
  }

  const blockAccountNum = async () => {
    const value = await AsyncStorage.getItem('@data');
    if (!account) {
      return;
    }
    const { StaffName, StaffID } = await JSON.parse(value);
    if (accountName) {
      const data = {
        staffId: StaffID,
        accountName,
        staffName: StaffName,
        account,
        inputRef,
        setAccountVisible,
      };

      dispatch(blockAccount(data));
    }
  };

  return (
    <ScrollView>
      <StyledContainer>
        {statusCode === '00' && (
          <PopupModal visible={visible} setVisible={setVisible} child="Account Blocked Successfully" />
        )}
        <InnerContainer>
          <Image resizeMode="contain" source={logo} style={styles.image} />
          <PageTitle>Account Blocker</PageTitle>
          <StyledFormArea>
            <StyledInputLabel>Account Number</StyledInputLabel>
            <TextInput
              style={styles.textInputStyle}
              label="Account Name"
              placeholder="Enter Nuban or CusNum"
              onChangeText={(text) => validateAccount(text)}
              maxLength={10}
              keyboardType="numeric"
              clearButtonMode="always"
              ref={inputRef}
            />

            {nameEnquiryLoading && <ActivityIndicator size="small" color="#005D30" />}

            <StyledInputLabel>Account Name</StyledInputLabel>
            <TextInput
              style={styles.textInputStyle}
              label="Account Name"
              value={accountVisible ? accountName : ''}
              editable={false}
            />

            <StyledButton onPress={blockAccountNum}>
              {blockerLoading ? <ActivityIndicator /> : <ButtonText>Block Account</ButtonText>}
            </StyledButton>
          </StyledFormArea>
        </InnerContainer>

        <LogoutButton onPress={logoutHandler}>
          <ButtonText>Logout</ButtonText>
        </LogoutButton>
      </StyledContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 100,
  },

  textInputStyle: {
    backgroundColor: '#e0d9d9',
    paddingBottom: 10,
    padding: 15,
    borderRadius: 5,
    fontSize: 16,
    height: 50,
    marginVertical: 5,
    marginBottom: 20,
    color: '#000000',
  },

  logoutStyle: {
    marginVertical: 30,
    width: 10,
  },
});

export default Blocker;
