import { Image, StyleSheet, ActivityIndicator, Text, View, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

import {
  ButtonText,
  InnerContainer,
  LeftIcon,
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
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { login } from '../../service/login';

// 0002651348;

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [visible, setVisible] = useState(false);

  const { loading: loginLoading, data: response } = useSelector((state) => state.loginUser);

  const loginHandler = () => {
    // console.log('>>>>>e', email, password);
    if (!email || !password) {
      return setError('Please enter credentials');
    }
    const data = { email, password, navigation };
    dispatch(login(data));
  };

  return (
    <ScrollView>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <InnerContainer>
            <Image resizeMode="contain" source={logo} style={styles.image} />
            <PageTitle>Login</PageTitle>
            <Text style={styles.errorStyle}>{error}</Text>
            <StyledFormArea>
              <StyledInputLabel>Email</StyledInputLabel>
              <TextInput
                style={styles.textInputStyle}
                label="Email"
                placeholder="Enter email"
                onChangeText={(text) => setEmail(text)}
                clearButtonMode="always"
              />

              <StyledInputLabel>Password</StyledInputLabel>
              <TextInput
                style={styles.textInputStyle}
                label="Password"
                placeholder="Enter password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                clearButtonMode="always"
              />

              <StyledButton onPress={loginHandler}>
                {loginLoading ? <ActivityIndicator /> : <ButtonText>Login</ButtonText>}
              </StyledButton>
            </StyledFormArea>
          </InnerContainer>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 100,
  },

  errorStyle: {
    color: 'red',
    fontSize: 15,
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
});

export default Login;
