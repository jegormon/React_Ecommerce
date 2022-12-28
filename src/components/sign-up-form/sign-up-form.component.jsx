import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import { SignUpContainer } from './sign-up-form.styles';

// Defining object structure
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmpassword: '',
};

const SignUpForm = () => {
  // Initiating state for form handeling, and using defaultFormFields
  // in order to track user input.
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmpassword } = formFields;

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  // Submit function that creates a new user.
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the passwords match
    if (password !== confirmpassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetForm();
      alert('User successfully regitered!');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use')
        alert('Email already regitered');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Creating a copy from exesting object and populates it with data
    // by using input name property it automatically recognizes that
    // in relates to a certain key-value pair.
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          inputOptions={{
            type: 'text',
            required: true,
            onChange: handleChange,
            name: 'displayName',
            value: displayName,
          }}
        />

        <FormInput
          label='Email'
          inputOptions={{
            type: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email,
          }}
        />

        <FormInput
          label='Password'
          inputOptions={{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password,
          }}
        />

        <FormInput
          label='Confirm Password'
          inputOptions={{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'confirmpassword',
            value: confirmpassword,
          }}
        />
        <Button children='Sign Up' type='submit' />
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
