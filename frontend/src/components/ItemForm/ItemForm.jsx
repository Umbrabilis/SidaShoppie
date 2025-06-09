
const ItemForm = () =>{
    return (
        <div className={"items-form-container"} style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-8 form-container">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        <img src="https://placehold.co/48x48" alt="" width={48}/>
                                    </label>
                                    <input
                                        type="file" name="image" id="image" className="form-control" hidden />
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor="name" className={"form-label"}>Nombre</label>
                                    <input type="text" name={"name"} id={"name"} className={"form-control"} placeholder={"Nombre del Item"}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Categoria</label>
                                    <select name="category" id="category" className="form-control">
                                        <option value="">Selecciona la categoria</option>
                                        <option value="Categoria 1">Categoria 1</option>
                                        <option value="Categoria 2">Categoria 2</option>
                                        <option value="Cateogira 3">Categoria 3</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className={"form-label"}>Precio</label>
                                    <input type="numbe" name={"price"} id={"price"} className={"form-control"} placeholder={"$0"}/>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor="description" className={"form-label"}>Descripcion</label>
                                    <textarea rows={"5"} type="text" name={"descripcion"} id={"descripcion"} className={"form-control"} placeholder={"Escribe la descripcion..."}/>
                                </div>
                                <button type={"submit"} className={"btn btn-warning w-100"}>Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemForm;