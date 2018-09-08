import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import React from "react";

// import ProductDetail from "./ProductDetail";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import List from "./List";
import Search from "./Search";

const ListStack = createStackNavigator(
  {
    List: {
      screen: List
    }
  },
  {
    initialRouteName: "List",
    navigationOptions: {
      title: "Product Manager",
      headerStyle: {
        backgroundColor: "#CDA60B"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);


//Search product starts
const SearchStack = createStackNavigator(
    { 
      Search : {
          screen : Search
      },
    },
    {
      initialRouteName: "Search",
      navigationOptions: {
        title: "Search Your Products",
        headerStyle: {
          backgroundColor: "#CDA60B"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center"
        }
      }
    }
  );
  //Search product ends

export const Navigator = createBottomTabNavigator(
  {
    List: ListStack,
    Search : SearchStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "List") {
          iconName = `ios-list-box${focused ? "" : "-outline"}`;
        } else if (routeName === "Search") {
          iconName = `ios-search${focused ? "" : "-outline"}`;
        } else if (routeName === "Stores") {
          return (
            <MaterialIcons
              name="local-grocery-store"
              size={25}
              color={tintColor}
            />
          );
        }

        return <Ionicons name={iconName} size={30} color={tintColor} />;
        <Ionicons name={iconName} size={30} color={tintColor} />;
      }
    }),
    tabBarOptions: {
       activeTintColor: "#CDA60B", 
      inactiveTintColor: "gray"
    }
  }
);

export const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navState
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {
  render() {
    return (
      <Navigator
        navigation={{
          dispatch: this.props.dispatch,
          state: this.props.navState,
          addListener
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  navState: state.navState
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
