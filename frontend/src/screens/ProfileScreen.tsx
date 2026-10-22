// GENERAL
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// COMPONENTS
import Loader       from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage.tsx";

// SLICES
import { useProfileMutation } from "../slices/usersApiSlice.ts";
import { setCredentials } from "../slices/authSlice.ts";
import type {RootState} from "../store.ts";

const ProfileScreen = () => {
    const [ name, setName ]                 = useState("");
    const [ email, setEmail ]               = useState("");
    const [ password, setPassword ]         = useState("");
    const [ confirmPass, setConfirmPass ]   = useState("");

    const dispatch = useDispatch();

    const { userInfo } = useSelector( ( state: RootState ) => state.auth );

    const [ updateProfile, { isLoading: loadingUpdateProfile } ] = useProfileMutation();

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
            <div className="col-span-9"></div>
        </div>
        </>
    )
}

export default ProfileScreen;