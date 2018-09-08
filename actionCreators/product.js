import {GET_PRODUCTS,  GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, SEARCH_PRODUCT} from "../actionTypes/product";

export function getProducts(page, limit) {
    return {
        type: GET_PRODUCTS,
        page,
        limit
    }
}

export function getProductsSuccess(products) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products
    }
}

export function getProductsFailure(error) {
    return {
        type: GET_PRODUCTS_FAILURE,
        error
    }
}

//Searching products

export function searchAllProductList(products, productsName) {
    return {
      type: SEARCH_PRODUCT,
      products: products,
      productsName: productsName
    };
  }
  