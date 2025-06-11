import {assets} from "../../assets/assets";
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {toast} from "react-hot-toast";
import {addItem} from "../../Service/ItemService";

const ItemForm = () =>{
    const {categories, setItemData, itemData} = useContext(AppContext);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        categoryId: '',
        price: '',
        description: '',
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('item', JSON.stringify(data));
        formData.append('file', image);
        try{
            if(!image){
                toast.error("Por favor, sube una imagen del item");
                return;
            }
            const response = await addItem(formData);
            if(response.status === 200 || response.status === 201 || response.status === 204){
                if(response.data) {
                    setItemData([...itemData, response.data]);
                }
                toast.success("Item agregado exitosamente");
                setData({
                    name: '',
                    categoryId: '',
                    price: '',
                    description: '',
                });
                setImage(false);
            }else{
                toast.error("Error al agregar el item");
            }
        }catch (error) {
            console.error(error);
            toast.error("Error al agregar el item");
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className={"items-form-container"} style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-12 form-container">
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={48}/>
                                    </label>
                                    <input
                                        type="file" name="image" id="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0]) } />
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor="name" className={"form-label"}>Nombre</label>
                                    <input type="text" name={"name"} id={"name"}
                                           className={"form-control"} placeholder={"Nombre del Item"} onChange={onChangeHandler} value={data.name}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoryId" className="form-label">Categoria</label>
                                    <select name="categoryId" id="category" className="form-control" onChange={onChangeHandler} value={data.categoryId}>
                                        <option value="">Selecciona la categoria</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.categoryId}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className={"form-label"}>Precio</label>
                                    <input type="number" name={"price"} id={"price"}
                                           className={"form-control"} placeholder={"$0"} onChange={onChangeHandler} value={data.price}/>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor="description" className={"form-label"}>Descripcion</label>
                                    <textarea rows={"5"} type="text" name={"description"} id={"description"}
                                              className={"form-control"} placeholder={"Escribe la descripcion..."} onChange={onChangeHandler} value={data.description}/>
                                </div>
                                <button type={"submit"} className={"btn btn-warning w-100"} disabled={loading}>{loading ? "Cargando..." : "Guardar"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemForm;