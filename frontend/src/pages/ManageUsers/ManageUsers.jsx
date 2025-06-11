import './ManageUsers.css';
import UsersList from "../../components/UsersList/UsersList";
import UserForm from '../../components/UserForm/UserForm';
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import { fetchUser } from '../../Service/UserService';

const ManageUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function loadUsers() {
            try{
                setLoading(true);
                const response = await fetchUser();
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Error al cargar los usuarios");
            }finally {
                setLoading(false);
            }
        }
        loadUsers();

    }, []);

    return (
        <div className={"users-container text-light"}>
            <div className="left-column">
                <UserForm setUsers={setUsers}/>
            </div>
            <div className="right-column">
                <UsersList users={users} setUsers={setUsers}/>
            </div>
        </div>
    )
}

export default ManageUsers;