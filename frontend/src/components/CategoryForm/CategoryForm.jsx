const CategoryForm = () => {
    return(
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
                                <input type="text" name={"name"} id={"name"} className={"form-control"} placeholder={"Nombre de la Categoria"}/>
                            </div>
                            <div className={"mb-3"}>
                                <label htmlFor="description" className={"form-label"}>Descripcion</label>
                                <textarea rows={"5"} type="text" name={"description"} id={"description"} className={"form-control"} placeholder={"Escribe la descripcion..."}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgColor" className={"form-label"}>Color de Fondo</label>
                                <br/>
                                <input type="color" name={"bgColor"} id={"bgColor"} placeholder={"#ffffff"}/>
                            </div>
                            <button type={"submit"} className={"btn btn-warning w-100"}>Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm;