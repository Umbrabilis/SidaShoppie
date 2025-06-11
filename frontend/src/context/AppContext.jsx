import {createContext, useEffect, useState} from "react";
import {fetchCategories} from "../Service/CategoryService";
import {fetchItems} from "../Service/ItemService";

export const AppContext = createContext(null);
export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [auth, setAuth] = useState({token: null, role: null});

    useEffect(() => {
        async function loadData(){
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
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}