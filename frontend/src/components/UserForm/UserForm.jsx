import React, {useState} from 'react';
import {addUser} from "../../Service/UserService";
import {toast} from "react-hot-toast";

const UserForm = ({setUsers}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'ROLE_USER'
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await addUser(data);
            setUsers((prevUsers) => [...prevUsers, response.data]);
            toast.success("Usuario agregado exitosamente");
            setData({
                name: '',
                email: '',
                password: '',
                role: 'ROLE_USER'
            });
        } catch (error) {
            console.error(error);
            toast.error("Error al agregar el usuario");
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
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input type="text" name="name" id="name"
                                       className="form-control" placeholder="Null" onChange={onChangeHandler} value={data.name}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" id="email"
                                       className="form-control" placeholder="tucorreo@ejemplo.com" onChange={onChangeHandler} value={data.email}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contrasena</label>
                                <input type="password" name="password" id="password"
                                       className="form-control" placeholder="*********" onChange={onChangeHandler} value={data.password}/>
                            </div>
                            <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading ? "Cargando..." : "Guardar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;