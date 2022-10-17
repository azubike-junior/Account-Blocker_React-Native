import styled from 'styled-components';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

// console.log('>>>>>statusbar', StatusBarHeight);

export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#6D28D9',
  green: '#005D30',
  red: '#EF4444',
  gold: '#B3803E',
};

const { primary, secondary, green } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${Colors.primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const PageLogo = styled.Image`
  width: 250px;
  height: 200px;
`;

export const PageTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  color: green;
  padding-top: 50px;
  padding-bottom: 30px;
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: bold;
  color: '#1F2937';
  margin-vertical: 10px;
`;

export const StyledFormArea = styled.View`
  flex: 1;
  width: 100%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: lightgray;
  padding: 15px;
  /* padding-left: 55px;
  padding-right: 55px; */
  border-radius: 5px;
  font-size: 16px;
  height: 50px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: black;
`;

export const StyledInputLabel = styled.Text`
  color: black;
  font-size: 13px;
  padding-bottom: 5px;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${Colors.gold};
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 10px;
  height: 60px;
  cursor: pointer;
`;

export const LogoutButton = styled.Pressable`
  margin-vertical: 100px;
  width: 100px;
  background-color: ${Colors.green};
  border-radius: 5px;
  padding: 10px;
  font-size: 15px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`;
