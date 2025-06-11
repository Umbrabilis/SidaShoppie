import './CartItems.css'
import {AppContext} from "../../context/AppContext";
import {useContext} from "react";

const CartItems = () => {
    const {cartItems} = useContext(AppContext);
    return (
        <div className="p-3 h-100 overflow-y-auto">
            {cartItems.length === 0 ? (
                <p className={"text-light"}>
                    Tu carro está vacio
                </p>
            ) : (
                <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item mb-3 p-3 bg-dark rounded">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className={"mb-0 text-light"}>{item.name}</h6>
                                <p className={"mb-0 text-light"}>
                                    {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-item-center">
                                <div className="d-flex align-items-center gap-2">
                                    <button className="btn btn-danger btn-sm"
                                        disabled={cartItems.quantity === 1}>
                                        <i className="bi bi-dash"></i>
                                    </button>
                                    <span className="tet-light">{item.quantity}</span>
                                    <button className="btn btn-primary btn-sm">
                                        <i className="bi bi-plus"></i>
                                    </button>
                                </div>
                                <button className="btn btn-danger btn-sm" style={{width: "auto"}}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default CartItems;