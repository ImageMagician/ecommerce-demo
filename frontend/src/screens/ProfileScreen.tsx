// GENERAL
import { useState, useEffect }      from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast }                    from "react-toastify";
import { format }                   from "date-fns";
import { Link }                     from "react-router-dom";

// COMPONENTS
import Loader       from "../components/Loader";
import Message      from "../components/Message.tsx";
import ErrorMessage from "../components/ErrorMessage.tsx";

// SLICES
import { useProfileMutation }  from "../slices/usersApiSlice.ts";
import { useGetMyOrdersQuery} from "../slices/ordersApiSlice.ts";
import { setCredentials }      from "../slices/authSlice.ts";

// TYPES
import type { RootState }   from "../store.ts";
import type { Order }       from "../slices/ordersApiSlice.ts";

const ProfileScreen = () => {
    const [ name, setName ]                 = useState("");
    const [ email, setEmail ]               = useState("");
    const [ password, setPassword ]         = useState("");
    const [ confirmPass, setConfirmPass ]   = useState("");

    const dispatch = useDispatch();

    const { userInfo } = useSelector( ( state: RootState ) => state.auth );

    const [ updateProfile, { isLoading: loadingUpdateProfile } ] = useProfileMutation();

    const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

    useEffect( () => {
        if ( userInfo ) {
            setName( userInfo.name );
            setEmail( userInfo.email );
        }
    },[ userInfo.name, userInfo.email ] );

    const submitHandler = async ( e: { preventDefault: () => void; } ) => {
        e.preventDefault();

        if ( password !== confirmPass ) {
            toast.error('Passwords don\'t match');
        }
        else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();

                dispatch( setCredentials( res ) );
                toast.success( "Password updated successfully." );
                setPassword('');
                setConfirmPass('');
            }
            catch( err ) {
                toast.error( ErrorMessage( err ) );
            }
        }
    }

    return (
        <>
        <h1 className="text-2xl text-gray-400 mb-4">Profile</h1>

        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
                <h2 className="text-xl text-gray-400 mb-3">User Profile</h2>
                <form onSubmit={ submitHandler }>
                    <div className="mb-4">
                        <label htmlFor="name" className="label">Name</label>
                        <input type="text"
                               id="name"
                               name="name"
                               className="input-text" value={ name }
                               onChange={ e => setName( e.target.value ) }
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="label">Email</label>
                        <input type="email"
                               id="email"
                               name="email"
                               className="input-text"
                               value={ email }
                               onChange={ e => setEmail( e.target.value ) }
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="label">Password</label>
                        <input type="password"
                               id="password"
                               name="password"
                               className="input-text"
                               onChange={ e => setPassword( e.target.value ) }
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPass" className="label">Confirm Password</label>
                        <input type="password"
                               id="confirmPass"
                               name="confirmPass"
                               className="input-text"
                               onChange={ e => setConfirmPass( e.target.value ) }
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="primary-button">
                            Update Profile
                        </button>
                        { loadingUpdateProfile && <Loader /> }
                    </div>
                </form>
            </div>
            <div className="col-span-9">
                <h2 className="text-xl text-gray-400 mb-3">Orders</h2>
                { loadingOrders ? (
                        <Loader />
                    )
                    : errorOrders ? (
                        <Message variant="error">
                            ErrorMessage( errorOrders )
                        </Message>
                    ):
                    (
                        <>
                            <div className="grid grid-cols-8 border-b border-gray-200 pb-2 text-sm font-semibold text-gray-400">
                                <div className="col-span-4">ID</div>
                                <div className="col-span-1">DATE</div>
                                <div className="col-span-1">TOTAL</div>
                                <div className="col-span-1 text-center">PAID</div>
                                <div className="col-span-1 text-center">DELIVERED</div>
                            </div>
                            <div className="order-list">
                            {
                                orders ? orders.map( ( order: Order ) => (
                                    <div className="grid grid-cols-8 text-sm order-list-item" key={ order._id }>
                                        <div className="col-span-4">
                                            <Link to={`/order/${ order._id }`}
                                                  className="text-blue-500 hover:text-blue-600 hover:underline"
                                            >
                                                { order._id }
                                            </Link>
                                        </div>
                                        <div className="col-span-1">
                                            { format( order.createdAt, "MMM d, yyyy" ) }
                                        </div>
                                        <div className="col-span-1">
                                            { ( order.totalPrice / 100 ).toLocaleString('en-US', { style: "currency", currency: "USD" } ) }
                                        </div>
                                        <div className="col-span-1 text-center">
                                            { order.paidAt ? format( order.paidAt , "MMM d, yyyy" ) : <span className="font-bold text-red-600">&times;</span> }
                                        </div>
                                        <div className="col-span-1 text-center">
                                            { order.deliveredAt ? format( order.deliveredAt , "MMM d, yyyy" ) : <span className="font-bold text-red-600">&times;</span> }
                                        </div>
                                    </div>
                                ) ) : (
                                    <div className="text-center text-lg font-bold text-gray-600">
                                        No orders found.
                                    </div>
                            )}
                            </div>

                        </>
                    )
                }
            </div>
        </div>
        </>
    )
}

export default ProfileScreen;