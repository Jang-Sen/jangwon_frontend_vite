import React from 'react';

const Signup: React.FC = () => {
    const signupHandler = () => {

    }

    return (
        <div>
            <form onSubmit={signupHandler}>
                <input
                    type="email"
                    name='email'
                    placeholder='email'
                />

                <input
                    type='password'
                    name='password'
                    placeholder={'password'}
                />

                <button type={'submit'}>
                    signup
                </button>
            </form>
        </div>
    );
};

export default Signup;