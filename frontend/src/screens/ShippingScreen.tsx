import { useState }                 from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate }              from "react-router-dom";
import type { RootState }           from '../store.ts';

import FormContainer                from "../components/FormContainer";
import CheckoutSteps                from "../components/CheckoutSteps.tsx";

import { saveShippingAddress }      from "../slices/cartSlice.ts";

const ShippingScreen = () => {
    const cart = useSelector( ( state: RootState ) => state.cart );
    const { shippingAddress } = cart;

    const [ address,    setAddress ]    = useState( shippingAddress?.address    || '' );
    const [ city,       setCity ]       = useState( shippingAddress?.city       || '' );
    const [ province,   setProvince ]   = useState( shippingAddress?.province   || '' );
    const [ postalCode, setPostalCode ] = useState( shippingAddress?.postalCode || '' );
    const [ country,    setCountry ]    = useState( shippingAddress?.country    || '' );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = ( e: { preventDefault: () => void; } ) => {
        e.preventDefault();
        dispatch( saveShippingAddress({ address, city, province, postalCode, country } ) );
        navigate( '/payment' );
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1 className="text-3xl font-bold mb-4">Shipping Address</h1>
        <form onSubmit={ submitHandler }>
            <div className="my-3">
                <label htmlFor="address"
                       className="label"
                >
                    Address
                </label>
                <input type="text"
                       id="address"
                       name="address"
                       value={ address }
                       placeholder="Enter address"
                       className="input-text w-full"
                       onChange={ ( event ) => setAddress( event.target.value ) }
                />
            </div>
            <div className="my-3 flex gap-3">
                <div>
                    <label htmlFor="city"
                           className="label"
                    >
                        City
                    </label>
                    <input type="text"
                           id="city"
                           name="city"
                           value={ city }
                           placeholder="Enter City"
                           className="input-text w-full"
                           onChange={ ( event ) => setCity( event.target.value ) }
                    />
                </div>
                <div>
                    <label htmlFor="province"
                           className="label"
                    >
                        State
                    </label>
                    <input type="text"
                           id="province"
                           name="province"
                           value={ province }
                           placeholder="Enter state"
                           className="input-text w-full"
                           onChange={ ( event ) => setProvince( event.target.value ) }
                    />
                </div>
                <div>
                    <label htmlFor="postalCode"
                           className="label"
                    >
                        Postal Code
                    </label>
                    <input type="text"
                           id="postalCode"
                           name="postalCode"
                           value={ postalCode }
                           placeholder="Enter postal code"
                           className="input-text w-full"
                           onChange={ ( event ) => setPostalCode( event.target.value ) }
                    />
                </div>
            </div>
            <div className="my-3">
                <label htmlFor="country" className="label">
                    Country
                </label>
                <input type="text" id="country"
                       name="country"
                       value={ country }
                       placeholder="Enter Country"
                       onChange={ ( event ) => setCountry( event.target.value ) }
                       className="input-text w-full"
                />
            </div>
            <div className="my-4">
                <button type="submit" className="primary-button">Continue</button>
            </div>

        </form>
    </FormContainer>;
}

export default ShippingScreen;