import {combineReducers} from "redux";
import productReducer from "./product";
import storeReducer from "./store"
import { createNavigationReducer} from "react-navigation-redux-helpers";
import {Navigator} from "../containers/Navigator";


const navReducer = createNavigationReducer(Navigator);

const rootReducer = combineReducers({
    productState: productReducer,
    storeState: storeReducer,
    navState: navReducer
})

export default rootReducer;