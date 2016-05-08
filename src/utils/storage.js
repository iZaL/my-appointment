'use strict';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { API_TOKEN } from './../constants/config';

export const setUserToken = (token) => {
  forgetItem(API_TOKEN);
  AsyncStorage.setItem(API_TOKEN, token, (err)=> {
    if (err) {
      throw err;
    }
  });
};

export const getUserToken = () => {
  return AsyncStorage.getItem(API_TOKEN);
};

export const forgetItem = (key)=> {
  AsyncStorage.removeItem(key);
};