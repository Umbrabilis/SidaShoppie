import './ReceiptPopup.css'
import './Print.css'

const ReceiptPopup = ({orderDetails, onClose, onPrint}) => {
    if (!orderDetails) {
        return null;
    }

    return(
        <div className="receipt-popup-overlay text-dark">
            <div className="receipt-popup">
                <div className="text-center mb-4">
                    <i className="bi bi-check-circle-fill text-success fs-1"></i>
                </div>
                <h3 className="text-center mb-4">Order Receipt</h3>
                <p>
                    <strong>Order ID:</strong> {orderDetails.orderId || 'N/A'}
                </p>
                <p>
                    <strong>Nombre:</strong> {orderDetails.customerName}
                </p>
                <p>
                    <strong>Telefono:</strong> {orderDetails.mobileNumber || orderDetails.phoneNumber}
                </p>
                <hr className="my-3"/>
                <h5 className="mb-3">Items Ordenados</h5>
                <div className="cart-items-scrollable">
                    {(orderDetails.cartItems || orderDetails.items || []).map((item, index) => {
                        return (
                            <div key={index} className="d-flex justify-content-between mb-2">
                                <span>{item.name} x{item.quantity}</span>
                                <span>{(item.price * item.quantity).toFixed(0)} COP</span>
                            </div>
                        )
                    })}
                </div>
                <hr className="my-3"/>
                <div className="d-flex justify-content-between mb-2">
                    <span>
                        <strong>Subtotal:</strong>
                    </span>
                    <span>{orderDetails.subtotal?.toFixed(0)} COP</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span>
                        <strong>Iva(18%):</strong>
                    </span>
                    <span>{orderDetails.iva?.toFixed(0)} COP</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span>
                        <strong>Total:</strong>
                    </span>
                    <span>{orderDetails.grandTotal?.toFixed(0)} COP</span>
                </div>
                <p>
                    <strong>Metodo de Pago:</strong> {orderDetails.paymentMethod}
                </p>
                <div className="d-flex justify-content-end gap-3 mt-4">
                    <button className="btn btn-warning" onClick={onPrint}>Imprimir Recibo</button>
                    <button className="btn btn-danger" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}

export default ReceiptPopup