import './CartSummary.css';
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import item from "../Item/Item";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";

const CartSummary = ({customerName, mobileNumber, setCustomerName, setMobileNumber}) => {
    const {cartItems} = useContext(AppContext);
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const iva = totalAmount * 0.18;
    const grandTotal = totalAmount + iva;

    return(
        <div className="mt-1">
            <div className="cart-summary-details">
                <div className="d-flex justify-content-between mb-1">
                    <span className="text-light small">Item:</span>
                    <span className="text-light small">{totalAmount.toFixed(0)} COP</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                    <span className="text-light small">Iva(18%):</span>
                    <span className="text-light small">{iva.toFixed(0)} COP</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light small fw-bold">Total:</span>
                    <span className="text-light small fw-bold">{grandTotal.toFixed(0)} COP</span>
                </div>
            </div>

            <div className="d-flex gap-2 mb-2">
                <button className="btn btn-success flex-grow-1 btn-sm">
                    Efectivo
                </button>
                <button className="btn btn-primary flex-grow-1 btn-sm">
                    Transferencia
                </button>
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-warning flex-grow-1 btn-sm">
                    Realizar orden
                </button>
            </div>
        </div>
    )
}

export default CartSummary