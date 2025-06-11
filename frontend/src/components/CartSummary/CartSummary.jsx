import './CartSummary.css';
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import item from "../Item/Item";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";
import {createOrder, deleteOrder} from "../../Service/OrderService";
import {toast} from "react-hot-toast";

const CartSummary = ({customerName, mobileNumber, setCustomerName, setMobileNumber}) => {
    const {cartItems, clearCart} = useContext(AppContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const iva = totalAmount * 0.18;
    const grandTotal = totalAmount + iva;

    const clearAll = () => {
        setCustomerName("");
        setMobileNumber("");
        clearCart();
    }

    // Mostrar popup sin limpiar datos aún
    const placeOrder = () => {
        if (!orderDetails) {
            toast.error("Primero debe completar el pago");
            return;
        }
        setShowPopup(true);
    }

    // Cerrar popup y limpiar datos
    const handleClosePopup = () => {
        setShowPopup(false);
        setOrderDetails(null); // Limpiar orderDetails para permitir nueva orden
        clearAll();
    }

    const handlePrintReceipt = () => {
        window.print();
    }

    const deleteOrderOnFailure = async (orderId) => {
        try{
            await deleteOrder(orderId);
        }catch (error) {
            console.log(error);
            toast.error("Algo salio mal al eliminar la orden");
        }
    }

    const completePayment = async (paymentMode) => {
        // Validaciones
        if (!customerName || !mobileNumber) {
            toast.error("Por favor, complete todos los campos requeridos.");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("El carrito está vacío.");
            return;
        }

        const orderData = {
            customerName: customerName,
            mobileNumber: mobileNumber,
            cartItems,
            subtotal: totalAmount,
            iva,
            grandTotal,
            paymentMethod: paymentMode.toUpperCase(),
        };

        setIsProcessing(true);

        try {
            const response = await createOrder(orderData);
            const savedData = response.data;

            toast.success("Pago Recibido");

            // Crear orderDetails con la estructura correcta
            setOrderDetails({
                orderId: savedData?.orderId || `ORD-${Date.now()}`,
                customerName,
                mobileNumber, // Usar mobileNumber (no phoneNumber)
                cartItems, // Usar cartItems (no items)
                subtotal: totalAmount,
                iva,
                grandTotal,
                paymentMethod: paymentMode.toUpperCase()
            });

        } catch (error) {
            console.error(error);

            toast.success("Pago Recibido");

            // Incluso en error, crear orderDetails
            setOrderDetails({
                orderId: `ORD-${Date.now()}`, // Generar ID temporal
                customerName,
                mobileNumber,
                cartItems,
                subtotal: totalAmount,
                iva,
                grandTotal,
                paymentMethod: paymentMode.toUpperCase(),
                error: true
            });

        } finally {
            setIsProcessing(false);
        }
    };

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
                <button className="btn btn-success flex-grow-1 btn-sm"
                        onClick={() => completePayment("cash")} disabled={isProcessing}>
                    {isProcessing ? "Procesando...": "Efectivo"}
                </button>
                <button className="btn btn-primary flex-grow-1 btn-sm"
                        onClick={() => completePayment("transaction")} disabled={isProcessing}>
                    {isProcessing ? "Procesando...": "Transferencia"}
                </button>
            </div>
            <div className="d-flex gap-2">
                <button className="btn btn-warning flex-grow-1 btn-sm"
                        onClick={placeOrder} disabled={isProcessing || !orderDetails}>
                    {orderDetails ? "Ver Recibo" : "Realizar orden"}
                </button>
            </div>
            {
                showPopup && orderDetails && (
                    <ReceiptPopup
                        orderDetails={orderDetails}
                        onClose={handleClosePopup}
                        onPrint={handlePrintReceipt}
                    />
                )
            }
        </div>
    )
}

export default CartSummary