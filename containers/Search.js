import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import { ActivityIndicator, FlatList, View, Text, Image, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";

let URI = "http://10.110.60.74:4000";

const tintColor = 'white';

class Search extends Component {
  constructor(props) {
    super(props);
    this.ifSearchProducts = this.ifSearchProducts.bind(this);
  }
  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
  }

  _getProducts = (page = 1, limit = 40) => {
    this.props.actions.getProducts(page, limit);
  };

  renderItem = ({ index, item }) => {
    return (
      <ProductListItem
        {...this.props}
        id={item.id}
        title={`${item.id} - ${item.title}`}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price}
      />
    );
  };

  _keyExtractor = (item, i) => {
    return `${i}`;
  };

  ifSearchProducts = productsName =>
    this.props.actions.searchAllProductList(this.props.products, productsName);


  render() {

    console.log(this.props.products);

    // filtering from low rating to high rating
    this.props.filteredAllProducts.sort(function (lowrating, highrating) {
      return lowrating.rating - highrating.rating
    })
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <SearchBar inputStyle={{ color: '#CCCCCC' }}
          placeholder=" Search Products Here..."
          lightTheme
          // round
          placeholderTextColor={tintColor}
          inputStyle={styles.searchBarInput}
          icon={{ color: tintColor, size: '52' }}
          onChangeText={this.ifSearchProducts}
          onClearText={this.ifSearchProducts}
        // clearIcon={{name: 'search'}}
        /><Ionicons name="md-search" size={32} color="grey" style={{ marginTop: -45, marginLeft: 360 }}></Ionicons>

        {this.props.isLoading ? (
          <ActivityIndicator color="#406fb2" />
        ) : this.props.filteredAllProducts.length > 0 ? (
          <FlatList
            data={this.props.filteredAllProducts}
            renderItem={this.renderItem}
            // keyExtractor={this.keyExtractor}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={this.getMore}
          />
        ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  No Results found{" "}
                </Text>
              </View>
            )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.productState.products,
    isLoading: state.productState.isLoading,
    isRefreshing: state.productState.isRefreshing,
    page: state.productState.page,
    limit: state.productState.limit,
    filteredAllProducts: state.productState.filteredAllProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}
const styles = StyleSheet.create({
  searchBarInput: {
    // color: tintColor,
    backgroundColor: '#fff',
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Search);
