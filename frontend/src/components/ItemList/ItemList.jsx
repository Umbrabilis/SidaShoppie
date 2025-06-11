import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {toast} from "react-hot-toast";
import {deleteItem} from "../../Service/ItemService";
import './itemList.css';

const ItemList = () =>{

    const {itemData, setItemData} = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = itemData.filter((item) =>
        item && item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const removeItem = async (itemId) => {
        try{
            const response = await deleteItem(itemId);
            if (response.status === 204) {
                const updatedItems = itemData.filter(item => item.itemId !== itemId);
                setItemData(updatedItems);
                toast.success("Item eliminado correctamente");
            }else{
                toast.error("Error al eliminar el item");
            }
        }catch (error) {
            console.error(error);
            toast.error("Error al eliminar el item");
        }
    }

    return (
        <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className={"row pe-2"}>
                <div className={"input-group mb-3"}>
                    <input type="text" name="keyword" id="keyword" placeholder={"Buscar por palabra clave"}
                           className={"form-control"} onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>
            <div className="row g-3 pe-2">
                {filteredItems.map((item, index) => (
                    <div key={index} className="col-12">
                        <div className="card p-3 bg-dark">
                            <div className="d-flex align-items-center">
                                <div style={{marginRight: '15px'}}>
                                    <img src={item.imgUrl} alt={item.name} className={"item-image"}/>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className={"mb-1 text-white"}>{item.name}</h6>
                                    <p className={"mb-0 text-white"}>Categoria: {item.categoryName}</p>
                                    <span className={"mb-0 text-block badge rounded-pill text-bg-warning"}>
                                        {item.price} COP
                                    </span>
                                </div>
                                <div>
                                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.itemId)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ItemList;