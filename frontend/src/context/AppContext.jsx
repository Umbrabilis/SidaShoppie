import {createContext, useEffect, useState} from "react";
import {fetchCategories} from "../Service/CategoryService";
import {fetchItems} from "../Service/ItemService";
import item from "../components/Item/Item";

export const AppContext = createContext(null);
export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [auth, setAuth] = useState({token: null, role: null});
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (itemId) => {
        const existingItems = cartItems.find(cartItem => cartItem.name === item.name);
        if(existingItems) {
            setCartItems(cartItems.map((cartItem) => cartItem.name === item.name ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem));
        } else{
            setCartItems([...cartItems, {...item, quantity: 1}]);
        }
    }

    useEffect(() => {
        async function loadData(){
            if (localStorage.getItem("token") && localStorage.getItem("role")) {
                setAuth(
                    localStorage.getItem("token"),
                    localStorage.getItem("role"),
                );
            }
            const response = await fetchCategories();
            const itemsresponse = await fetchItems();
            setCategories(response.data);
            setItemData(itemsresponse.data);
        }
        loadData();
    }, []);

    const setAuthData =(token, role) => {
        setAuth({token, role});
    }

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        itemData,
        setItemData,
        addToCart,
        cartItems,
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}