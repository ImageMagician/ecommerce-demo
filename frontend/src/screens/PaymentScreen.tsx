// GENERAL
import { useState, useEffect }      from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate }              from "react-router-dom";

// COMPONENTS
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps.tsx";

// SLICES
import { savePaymentMethod } from "../slices/cartSlice.ts";

// TYPES
import type { RootState } from "../store.ts";

const PaymentScreen = () => {
    const [ paymentMethod, setPaymentMethod ] = useState( "PayPal" );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart= useSelector( ( state: RootState ) => state.cart );
    const { shippingAddress } = cart;

    useEffect( () => {
        if ( !shippingAddress ) {
            navigate( "/shipping" );
        }
    }, [ shippingAddress, navigate ] );

    const submitHandler = ( e: { preventDefault: () => void; } ) => {
        e.preventDefault();

        dispatch( savePaymentMethod( paymentMethod ) );
        navigate( "/placeorder" );
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <form onSubmit={submitHandler}>
                <h1 className="text-3xl font-bold mb-4">Payment Method</h1>
                <h2 className="text-xl font-semibold mb-4">Select Method</h2>
                <div className="my-4">
                    <label htmlFor="paymentMethod" className="label">
                        <input type="checkbox"
                               id="paymentMethod"
                               name="paymentMethod"
                               value="PayPal"
                               onChange={ ( e ) => setPaymentMethod( e.target.value ) }
                               checked
                               className="me-2"
                        />
                        PayPal or Credit Card
                    </label>
                </div>
                <div className="my-4">
                    <button type="submit" className="primary-button">Continue</button>
                </div>
            </form>
        </FormContainer>
    )
}

export default PaymentScreen;