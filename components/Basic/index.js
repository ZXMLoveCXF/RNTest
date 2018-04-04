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
import Swiper from "react-native-swiper";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import HomeScreen from "../../pages/HomePage";
import MineScreen from "../../pages/MinePage";

const { width } = Dimensions.get("window");

/*
  定义TabNavigator
*/
const Tab = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "首页",
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require("../../images/icon/index.png")}
            selectedImage={require("../../images/icon/indexAct.png")}
          />
        )
      })
    },

    Mine: {
      screen: MineScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "我",
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require("../../images/icon/mine.png")}
            selectedImage={require("../../images/icon/mineAct.png")}
          />
        )
      })
    }
  },

  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: "#06c1ae",
      inactiveTintColor: "#979797",
      style: { backgroundColor: "#ffffff" },
      labelStyle: {
        fontSize: 20 // 文字大小
      }
    }
  }
);

const Navigator = StackNavigator(
  {
    Tab: { screen: Tab },
    Product: { screen: ProductScreen }
  },

  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: "#333333",
      showIcon: true,
      swipeEnabled: false,
      animationEnabled: false
    },

    mode: "card"
  }
);

class ListRowComponent extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.text}>{this.props.data.text}</Text>
      </View>
    );
  }
}

export default class recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperShow: false,
      titleTool: {
        recoverRun: {
          title: "发现跑团",
          more: "更多 〉 "
        },
        runRank: {
          title: "跑团排行",
          more: "查看完整排行 〉 "
        }
      },
      user: [
        {
          title: "321Go",
          src: require("../../images/head/1.jpg")
        },
        {
          title: "坂田银时",
          src: require("../../images/head/2.jpg")
        },
        {
          title: "神乐",

          src: require("../../images/head/3.jpg")
        },
        {
          title: "夏目贵志",

          src: require("../../images/head/4.jpg")
        },
        {
          title: "娘口三三",

          src: require("../../images/head/5.jpg")
        },
        {
          title: "野比大雄",

          src: require("../../images/head/6.jpg")
        },
        {
          title: "黑崎一护",

          src: require("../../images/head/7.jpg")
        }
      ],
      isRefreshing: false
    };
  }

  //TabBarItem
  renderTabBarItem() {
    return (
      <Image
        source={
          this.props.focused ? this.props.selectedImage : this.props.normalImage
        }
        style={{ tintColor: this.props.tintColor, width: 25, height: 25 }}
      />
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        swiperShow: true
      });
    }, 0);
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 2000);
  }

  //StatusBar
  renderStatusBar() {
    return (
      <StatusBar
        animated={true}
        hidden={false}
        backgroundColor={"#fff"}
        translucent={false}
        barStyle={"default"}
        showHideTransition={"fade"}
        networkActivityIndicatorVisible={true}
      />
    );
  }

  //TopBar
  renderTopBar() {
    return (
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Image
            source={require("../../images/icon/search.png")}
            style={styles.topBarSearch}
          />
        </View>
        <View style={styles.topBarMid}>
          <Text style={styles.topBarTitle}>跑团</Text>
        </View>
        <View style={styles.topBarRight}>
          <Text style={styles.topBarText}>我的跑团</Text>
        </View>
      </View>
    );
  }

  // Swiper
  renderBanner() {
    if (this.state.swiperShow) {
      return (
        <View style={styles.container}>
          <Swiper
            style={styles.wrapper}
            autoplay
            paginationStyle={styles.dot}
            autoplayTimeout={2}
            dot={<View style={[styles.dotNoAct, styles.dotAll]} />}
            activeDot={<View style={[styles.dotAct, styles.dotAll]} />}
          >
            <Image
              resizeMode="stretch"
              style={styles.img}
              source={require("../../images/banner/1.jpg")}
            />
            <Image
              resizeMode="stretch"
              style={styles.img}
              source={require("../../images/banner/2.jpg")}
            />
            <Image
              resizeMode="stretch"
              style={styles.img}
              source={require("../../images/banner/3.jpg")}
            />
          </Swiper>
        </View>
      );
    } else {
      return (
        <View style={styles.noSwiper}>
          <Image
            source={require("../../images/banner/1.jpg")}
            style={styles.img}
          />
        </View>
      );
    }
  }

  //recoverRun
  renderRecoverRun(name) {
    let data = this.state.titleTool;
    return (
      <View style={styles.recoverRun}>
        <View style={styles.rRunTitle}>
          <View style={styles.rRunLeft}>
            <Text style={styles.rRLText}>{data[name].title}</Text>
          </View>
          <View style={styles.rRunRight}>
            <Text style={styles.rRRText}>{data[name].more}</Text>
          </View>
        </View>
      </View>
    );
  }

  //flatList
  renderFlatList() {
    return (
      <View style={styles.FlatList}>
        <FlatList
          data={this.state.user}
          keyExtractor={(item, index) => index}
          renderItem={this.renderFlatListItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
  //TouchableOpacity
  renderFlatListItem = ({ item }) => {
    let src = item.src;
    return (
      <TouchableOpacity style={styles.FLItem}>
        <Image source={item.src} style={styles.FLImg} />
        <View style={styles.FLContainer}>
          <Text style={styles.FLTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        {this.renderStatusBar()}
        {this.renderTopBar()}
        {/* <ScrollView
          style={styles.scrollview}
          refreshControl={
            //设置下拉刷新组件
            <RefreshControl
              colors={["red", "blue"]}
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)} //(()=>this.onRefresh)或者通过bind来绑定this引用来调用方法
              tintColor="red"
              title={this.state.isRefreshing ? "刷新中...." : "下拉刷新"}
            />
          }
        >
          {this.renderBanner()}
          {this.renderRecoverRun("recoverRun")}
          {this.renderFlatList()}
          <View style={{ height: 10, backgroundColor: "#f0f0f1" }} />
          {this.renderRecoverRun("runRank")}
        </ScrollView> */}
        {this.renderTabBarItem()}
        <ScrollableTabView
          locked={true}
          scrollWithoutAnimation={true}
          tabBarPosition="bottom"
          renderTabBar={() => (
            <TabBar tabIcons={tabIcons} tabNames={tabNames} />
          )}
        >
          <HomeScreen tabLabel="首页" navigator={this.props.navigator} />
          <MineScreen tabLabel="我" navigator={this.props.navigator} />
        </ScrollableTabView>
      </View>
    );
  }
}

var tabIcons = ['ios-home', 'ios-compass', 'ios-heart', 'ios-contact'];

var styles = {
  container: {
    height: 200,
    padding: 10
  },
  wrapper: {
    height: 180
  },
  img: {
    width: Dimensions.width,
    height: 180,
    backgroundColor: "transparent",
    justifyContent: "center",
    borderRadius: 10
  },
  noSwiper: {
    height: 180,
    padding: 10,
    marginBottom: 20
  },
  dot: {
    bottom: 10,
    right: "-80%"
  },
  dotAct: {
    backgroundColor: "#318dfe"
  },
  dotNoAct: {
    backgroundColor: "#000"
  },
  dotAll: {
    width: 5,
    height: 5,
    borderRadius: 7,
    marginLeft: 4,
    marginRight: 4
  },
  topBar: {
    flexDirection: "row",
    height: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  topBarLeft: {
    flex: 1,
    justifyContent: "center"
  },
  topBarMid: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  topBarRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  topBarSearch: {
    height: 20,
    width: 20,
    resizeMode: "stretch"
  },
  topBarTitle: {
    fontWeight: "500",
    color: "#000",
    fontSize: 16
  },
  topBarText: {
    color: "#000",
    fontSize: 14
  },
  recoverRun: {},
  rRunTitle: {
    flexDirection: "row",
    height: 14,
    paddingRight: 10,
    marginTop: 13,
    marginBottom: 13
  },
  rRunLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    borderLeftWidth: 3,
    borderColor: "#318dfe",
    paddingLeft: 5
  },
  rRunRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  rRLText: {
    color: "#000",
    fontSize: 14
  },
  rRRText: {
    color: "#ccc",
    fontSize: 12
  },

  FlatList: {
    width: width,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 10,
    marginBottom: 10
  },
  FLItem: {
    width: 80,
    marginLeft: 10
  },
  FLImg: {
    width: 80,
    height: 80,
    borderRadius: 5
  },
  FLContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  FLTitle: {
    fontSize: 12,
    color: "#666"
  }
};
