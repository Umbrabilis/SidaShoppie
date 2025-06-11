import './CartItems.css'
import {AppContext} from "../../context/AppContext";
import {useContext} from "react";

const CartItems = () => {
    const {cartItems, removeFromCart, updateQuantity} = useContext(AppContext);
    return (
        <div className="p-2 h-100 overflow-y-auto">
            {cartItems.length === 0 ? (
                <p className={"text-light small"}>
                    Tu carrito está vacio
                </p>
            ) : (
                <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item mb-2 p-2 bg-dark rounded">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <h6 className={"mb-0 text-light small"}>{item.name}</h6>
                                <p className={"mb-0 text-light small fw-bold"}>
                                    {(item.price * item.quantity).toFixed(0)} COP
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-1">
                                    <button className="btn btn-danger btn-sm p-1"
                                            onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                                            disabled={item.quantity === 1}>
                                        <i className="bi bi-dash"></i>
                                    </button>
                                    <span className="text-light small mx-2">{item.quantity}</span>
                                    <button className="btn btn-primary btn-sm p-1" onClick={() => updateQuantity(item.itemId, item.quantity + 1)}>
                                        <i className="bi bi-plus"></i>
                                    </button>
                                </div>
                                <button className="btn btn-danger btn-sm p-1" style={{width: "auto"}} onClick={() => removeFromCart(item.itemId)}>
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