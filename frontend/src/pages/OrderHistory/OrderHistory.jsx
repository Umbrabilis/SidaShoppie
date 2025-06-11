import "./OrderHistory.css"
import {useEffect, useState} from "react";
import {latestOrders} from "../../Service/OrderService";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const response = await latestOrders();
                setOrders(response.data);
            }catch(error){
                console.error(error);
            }finally {
                setLoading(false);
            }
        }
        fetchOrders()
    },[]);

    const formatItems = (items) => {
        return items.map((item) => `${item.name} x ${item.quantity}`).join(", ");
    }

    const formatDate = (dateString) => {
        const options= {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return new Date(dateString).toLocaleDateString("es-CO", options);
    }

    if (loading) {
        return <div className="text-center py-4">
            Cargando Ordenes...
        </div>
    }

    if (orders.length === 0) {
        return <div className="text-center py-4">
            No hay ordenes recientes.
        </div>
    }

    return (
        <div className="orders-history-container">
            <h2 className={"mb-2 text-light"}>Ordenes Recientes</h2>

            <div className="table-responsive">
                <table className={"table table-striped table-hover"}>
                    <thead className={"table-dark"}>
                    <tr>
                        <th>Order Id</th>
                        <th>Cliente</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Metodo de Pago</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.customer.name} <br/>
                                <small className={"text-muted"}>{order.mobileNumber}</small>
                            </td>
                            <td>{formatItems(order.items)}</td>
                            <td>${order.total.toFixed(0)}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                                <span className={"bg-success"}>REALIZADO</span>
                            </td>
                            <td>{formatDate(order.createdAt)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )


}

export default OrderHistory;