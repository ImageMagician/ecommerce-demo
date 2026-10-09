import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('submit');
    }

    return (
        <FormContainer>
            <form onSubmit={ submitHandler }>
                <h1 className="mb-3 text-lg font-bold">Sign In</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="font-sm uppercase text-gray-500 mb-2">
                        Email
                    </label>
                    <input type="email"
                           name="email"
                           id="email"
                           placeholder="Email"
                           value={ email }
                           onChange={ ( e ) => setEmail(e.target.value) }
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="font-sm uppercase text-gray-500 mb-2">
                        Password
                    </label>
                    <input type="password"
                           name="password"
                           id="password"
                           value={ password }
                           onChange={ ( e ) => setPassword(e.target.value) }
                    />
                </div>
                <div className="mb-3">
                    <button type="submit" className="py-1 px-4 bg-black text-white font-bold text-sm uppercase">SUBMIT</button>
                </div>
                <p>
                    <Link to="/register">New customer?</Link>
                </p>
            </form>
        </FormContainer>
    )
}

export default LoginScreen;