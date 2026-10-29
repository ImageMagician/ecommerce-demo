import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../components/Loader.tsx";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer.tsx";

import { useGetUserByIdQuery, useUpdateUserByIdMutation } from "../../slices/usersApiSlice.ts";

import type { UserUpdate } from "../../types";
import type { RootState } from "../../store";

const UserEditScreen = () => {
    const { userInfo: adminUser } = useSelector( ( state: RootState ) => state.auth );

    const { id: userId } = useParams();
    const { data: user, isLoading: userLoading, error } = useGetUserByIdQuery( userId ?? skipToken );
    const [ updateUser ] = useUpdateUserByIdMutation();

    const navigate = useNavigate();

    const [ name, setName ]       = useState( "" );
    const [ email, setEmail ]     = useState( "" );
    const [ isAdmin, setIsAdmin ] = useState<boolean>( false );
    const [ password, setPassword ] = useState( "" );
    const [ confirmPassword, setConfirmPassword ] = useState( "" );
    const [ showPassword, setShowPassword ] = useState<boolean>( false );

    useEffect(() => {
        if ( user ) {
            setName   ( user.name );
            setEmail  ( user.email );
            setIsAdmin( user.isAdmin );
        }
    }, [ user ]);

    const userUpdateHandler = async ( e: { preventDefault: () => void; } ) => {
        e.preventDefault();

        if ( !userId ) {
            return toast.error( "User information missing." );
        }

        if ( password !== '' && password !== confirmPassword ) {
            console.log( password, confirmPassword );
            return toast.error( `Passwords do not match` );
        }

        const userUpdateInfo: UserUpdate = {
            _id: userId,
            name,
            email,
            isAdmin: isAdmin,
            password: password || user.password,
        }

        const res = await updateUser( userUpdateInfo );

        if ( "error" in res) {
            toast.error( "Error updating user." );
        }
        else {
            toast.success( "User successfully updated." );
            navigate("/admin/users");
        }
    }

    function showHidePassword() {
        setShowPassword( !showPassword );
    }

    return <FormContainer>
        <h1 className="text-3xl font-semibold text-gray-500 mb-4">Edit User</h1>
        { userLoading && <Loader /> }
        { error && <Message>ErrorMessage( error )</Message> }

        <form onSubmit={ userUpdateHandler }>
            <div className="mb-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text"
                       id="name"
                       name="name"
                       value={ name }
                       className="input-text"
                       onChange={ ( e ) => setName( e.target.value ) }
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email"
                       id="email"
                       name="email"
                       value={ email }
                       className="input-text"
                       onChange={ ( e ) => setEmail( e.target.value ) }
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="form-label">New Password <span className="text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                    <input type={ showPassword ? 'text' : 'password' }
                           id="password"
                           name="password"
                           className="input-text"
                           onChange={ ( e ) => setPassword( e.target.value ) }
                    />
                    <button type="button"
                            className="absolute right-6 top-2"
                            onClick={ showHidePassword }
                    >
                        <FontAwesomeIcon icon={ showPassword ? faEyeSlash : faEye } />
                    </button>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="text-gray-400">(optional)</span></label>
                <div className="relative">
                    <input type={ showPassword ? 'text' : 'password' }
                           id="confirmPassword"
                           name="confirmPassword"
                           className="input-text"
                           onChange={ ( e ) => setConfirmPassword( e.target.value ) }
                    />
                    <button type="button"
                            className="absolute right-6 top-2"
                            onClick={ showHidePassword }
                    >
                        <FontAwesomeIcon icon={ showPassword ? faEyeSlash : faEye } />
                    </button>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="isAdmin" className="form-label">
                    <input type="checkbox"
                           id="isAdmin"
                           name="isAdmin"
                           checked={ isAdmin }
                           onChange={ ( e ) => setIsAdmin( e.target.checked ) }
                           disabled={ !adminUser?.isAdmin || user?._id === adminUser?._id }
                    /> Admin
                </label>
            </div>
            <div>
                <button type="submit"
                        className="primary-button"
                >
                    Update User
                </button>
            </div>
        </form>
    </FormContainer>
}

export default UserEditScreen;