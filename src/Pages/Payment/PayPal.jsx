import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../AuthProvidors/FireBase/FirebaseConfig";

const style = { layout: "vertical" };

const PaypalBtn = ({ totalPrice, product }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createOrder = () => {
    return fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_PAYPAL_SECRET}`,
        },
        body: JSON.stringify({
          cart: [
            {
              sku: "1blwyeo8",
              name: totalPrice,
              unit_amount: {
                currency_code: "USD",
                value: totalPrice,
              },
              quantity: 1,
            },
          ],
        }),
      }
    )
      .then(response => response.json())
      .then(order => {
        return order.id;
      });
  };
  const onApprove = data => {
    // replace this url with your server
    return fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    )
      .then(response => response.json())
      .then(orderData => {
        try {
          const handleOrder = async () => {
            await setDoc(doc(db, "orderDetails", user?.uid), {
              name: user?.displayName,
              email: user?.email,
              orderData,
            });
          };
          handleOrder();
          if (orderData?.status === "COMPLETED") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${product.title} purchased successfully`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong! ${error.message}`,
          });
        }
      });
  };
  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </>
    );
  };
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    components: "buttons",
  };

  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider options={initialOptions}>
        <ButtonWrapper showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
};

PaypalBtn.propTypes = {
  totalPrice: PropTypes.number,
  product: PropTypes.object,
  showSpinner: PropTypes.bool,
};
export default PaypalBtn;
