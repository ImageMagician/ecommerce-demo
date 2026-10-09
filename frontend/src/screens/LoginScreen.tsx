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
                <h1 className="mb-4 text-3xl font-bold">Sign In</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="label">
                        Email
                    </label>
                    <input type="email"
                           name="email"
                           id="email"
                           placeholder="Enter email address"
                           value={ email }
                           onChange={ ( e ) => setEmail(e.target.value) }
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
                           onChange={ ( e ) => setPassword(e.target.value) }
                           className="input-text"
                    />
                </div>
                <div className="mb-3">
                    <button type="submit" className="primary-button">SUBMIT</button>
                </div>
                <p>
                    <Link to="/register" className="hover:underline text-blue-500 hover:text-blue-600">New customer?</Link>
                </p>
            </form>
        </FormContainer>
    )
}

export default LoginScreen;