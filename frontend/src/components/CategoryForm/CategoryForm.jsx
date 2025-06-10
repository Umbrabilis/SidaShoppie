import {useContext, useEffect, useState} from "react";
import { assets } from "../../assets/assets";
import {formToJSON} from "axios";
import {addCategory} from "../../Service/CategoryService";
import {AppContext} from "../../context/AppContext";
import categoryList from "../CategoryList/CategoryList";
import { toast } from "react-hot-toast";

const CategoryForm = () => {

    const {setCategories, categories} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
    });

    useEffect(() => {
        console.log(data)
    }, [data])

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData({
            ...data,
            [name]: value
        });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(!image){
            toast.error("Selecciona una imagen para la categoria");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("category", JSON.stringify(data));
        formData.append("file", image);
        try{
           const response = await addCategory(formData);
           if (response.status === 201) {
               setCategories([...categories, response.data]);
               toast.success("Categoria agregada correctamente");
                setData({
                     name: "",
                     description: "",
                     bgColor: "#2c2c2c",
                });
                setImage(false);
           }
        }catch (error) {
            console.error(error);
            toast.error("Error al agregar la categoria");
        }finally {
            setLoading(false);
        }
    }

    return(
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
                                    type="file" name="image" id="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className={"mb-3"}>
                                <label htmlFor="name" className={"form-label"}>Nombre</label>
                                <input type="text" name={"name"} id={"name"} className={"form-control"}
                                       placeholder={"Nombre de la Categoria"} onChange={onChangeHandler} value={data.name}/>
                            </div>
                            <div className={"mb-3"}>
                                <label htmlFor="description" className={"form-label"}>Descripcion</label>
                                <textarea rows={"5"} type="text" name={"description"} id={"description"} className={"form-control"}
                                          placeholder={"Escribe la descripcion..."} onChange={onChangeHandler} value={data.description}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgColor" className={"form-label"}>Color de Fondo</label>
                                <br/>
                                <input type="color" name={"bgColor"} id={"bgColor"}
                                       placeholder={"#ffffff"} onChange={onChangeHandler} value={data.bgColor}/>
                            </div>
                            <button type={"submit"}
                                    disabled={loading}
                                    className={"btn btn-warning w-100"}>{loading? "Cargando..." : "Guardar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm;