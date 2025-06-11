import './Dashboard.css';
import {useEffect, useState} from "react";
import {fetchDashboardData} from "../../Service/Dashboard";
import {toast} from "react-hot-toast";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await fetchDashboardData();
                setData(response.data)
            }catch(error){
                console.log(error)
                toast.error("Incapaz de cargar los datos de la dashboard");
            }finally {
                setLoading(false);
            }
        }
        loadData();
    },[]);

    if (loading) {
        return <div className={"loading"}>Cargando Dashboard...</div>;
    }

    if(!data){
        return <div className={"error"}>Fallo en cargar los datos de la Dashboard</div>;
    }

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Ventas de hoy</h3>
                            <p>{data.todaySales.toFixed(0)}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-cart-check"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Pedidos de hoy</h3>
                            <p>{data.todayOrderCount}</p>
                        </div>
                    </div>
                </div>
                <div className={"recent-orders-card"}>
                    <h3 className="recent-order-tittle">
                        <i className="bi bi-clock-history"></i>
                        Pedidos recientes
                    </h3>
                    <div className={"orders-table-container"}>
                        <table className={"orders-table"}>
                            <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Cliente</th>
                                <th>Monto</th>
                                <th>Metodo de Pago</th>
                                <th>Estado</th>
                                <th>Tiempo</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.recentOrders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId.substring(0,8)}...</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.grandTotal.toFixed(2)}</td>
                                    <td>
                                        <span className={`payment-method ${order.paymentMethod.toLowerCase()}`}>
                                            {order.paymentMethod}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${(order.status || '').toLowerCase()}`}>
                                                    {order.status || 'COMPLETADO'}
                                        </span>
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleDateString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;