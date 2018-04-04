import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  Navigator,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from "react-native";

export default class HomePage extends Component {
  static navigationOptions = {
    drawerLabel: "首页",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("../images/icon/happy.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text onPress={this._skip.bind(this)}>点击跳转</Text>
      </View>
    );
  }

  _skip() {
    this.props.navigation.navigate("Mine");
  }
}
