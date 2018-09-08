import {GET_PRODUCTS, GET_PRODUCTS_FAILURE,GET_PRODUCTS_SUCCESS,SEARCH_PRODUCT,} from "../actionTypes/product";

export default (prevState = {
    products: [],
    product: {},
    isLoading: false,
    isRefreshing: false,
    page: 1,
    limit: 40
}, action) => {
    console.log(action.type);
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...prevState,
                isLoading: prevState.products.length > 0 ? false:true,
                page: action.page
            }
        case GET_PRODUCTS_SUCCESS:
            return { ...prevState,
                isLoading: false,
                products: prevState.products.concat(action.products)
            }
     
        case GET_PRODUCTS_FAILURE:
            return { ...prevState,
                isLoading: false,
                error: action.error
            }

         // Searching products   
            case SEARCH_PRODUCT:
            return {
              ...prevState,
              isLoading: false,
              filteredAllProducts: action.products.filter(function(item) {
                return (
                  item.title.toLowerCase().search(action.productsName.toLowerCase()) !==
                  -1
                );
              })
            };

        default:
            return prevState;

    }
}