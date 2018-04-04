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

export default class MinePage extends Component {
  static navigationOptions = {
    drawerLabel: "我",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("../images/icon/happyAct.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text onPress={this._skip.bind(this)}>返回上一界面</Text>
      </View>
    );
  }

  _skip() {
    this.props.navigation.goBack();
  }
}
