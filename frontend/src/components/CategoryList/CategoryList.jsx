import {useContext} from "react";
import {AppContext} from "../../context/AppContext";

const CategoryList = () => {
    const{categories} = useContext(AppContext);
    return(
        <div className="category-list-container">

        </div>
    )
}

export default CategoryList;