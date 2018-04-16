import React, { Component } from "react";
import DetailNewsScreen from "../screens/detail_news";
import { StackNavigator } from "react-navigation";


export const RootStack = StackNavigator({
    DetailNewsScreen: {
        screen: DetailNewsScreen
    }
});