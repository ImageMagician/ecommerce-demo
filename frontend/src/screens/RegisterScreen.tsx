// STANDARD
import { useState, useEffect }            from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector }       from 'react-redux';
import { toast }                          from "react-toastify";

// COMPONENTS
import FormContainer from '../components/FormContainer';

// SLICES
import { useRegisterMutation } from "../slices/usersApiSlice.ts";
import { setCredentials }   from "../slices/authSlice.ts";

// TYPES
import type { RootState } from "../store.ts";

const RegisterScreen = () => {
    const [ name, setName ]                       = useState( '' );
    const [ email, setEmail ]                     = useState( '' );
    const [ password, setPassword ]               = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );

    const dispatch = useDispatch();
    const navigate        = useNavigate();

    const [ register, { isLoading } ] = useRegisterMutation();

    const { userInfo } = useSelector( ( state: RootState ) => state.auth );
    const { search }   = useLocation();

    const sp              = new URLSearchParams( search );
    const redirect = sp.get('redirect') || '/';

    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if ( password !== confirmPassword ) {
            toast.error( "Passwords do not match" );
        }
        else {
            try {
                const res = await register( { name, email, password, isAdmin : false } ).unwrap();
                dispatch( setCredentials( { ...res, } ) );
                navigate( redirect );
            }
            catch ( err: any ) {
                toast.error( err?.data?.message || err.error || 'Login failed.' );
            }
        }
    }

    useEffect( () => {
        if ( userInfo ) {
            navigate( redirect )
        }
    }, [ userInfo, redirect, navigate ] );

    return (
        <FormContainer>
            <form onSubmit={ submitHandler }>
                <h1 className="mb-4 text-3xl font-bold">Register</h1>
                <div className="mb-4">
                    <label htmlFor="name" className="label">
                        Full Name
                    </label>
                    <input type="text"
                           name="name"
                           id="name"
                           placeholder="Enter full name"
                           value={ name }
                           onChange={ ( e ) => setName(e.target.value) }
                           className="input-text"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="label">
                        Email
                    </label>
                    <input type="email"
                           name="email"
                           id="email"
                           placeholder="Enter email address"
                           value={ email }
                           onChange={ ( e ) => setEmail( e.target.value ) }
                           className="input-text"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="label">
                        Password
                    </label>
                    <input type="password"
                           name="password"
                           id="password"
                           value={ password }
                           placeholder="Enter password"
                           onChange={ ( e ) => setPassword( e.target.value ) }
                           className="input-text"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="label">
                        Password
                    </label>
                    <input type="password"
                           name="confirmPassword"
                           id="confirmPassword"
                           value={ confirmPassword }
                           placeholder="Confirm password"
                           onChange={ ( e ) => setConfirmPassword( e.target.value ) }
                           className="input-text"
                    />
                </div>
                <div className="mb-3">
                    <button type="submit"
                            disabled={ isLoading }
                            className="primary-button w-30"
                    >
                        { isLoading ? `...` : 'Register' }
                    </button>
                </div>
                <p>
                    Already a customer? <Link to={ redirect ? `/login?redirect=${ redirect }` : '/login' } className="hover:underline text-blue-500 hover:text-blue-600">Click here</Link>.
                </p>
            </form>
        </FormContainer>
    )
}

export default RegisterScreen;