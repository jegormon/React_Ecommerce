import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { AuthError, AuthErrorCodes } from 'firebase/auth';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles';
import { signUpStart } from '../../store/user/user.action';

// Defining object structure
const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmpassword: '',
};

const SignUpForm = () => {
	// Initiating state for form handling, and using defaultFormFields
	// in order to track user input.
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmpassword } = formFields;
	const dispatch = useDispatch();

	const resetForm = () => {
		setFormFields(defaultFormFields);
	};

	// Submit function that creates a new user.
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Check if the passwords match
		if (password !== confirmpassword) {
			alert('passwords do not match');
			return;
		}

		try {
			dispatch(signUpStart(email, password, displayName));
			resetForm();
			alert('User successfully registered!');
		} catch (error) {
			if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS)
				alert('Email already registered');
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		// Creating a copy from existing object and populates it with data
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
					label="Display Name"
					type="text"
					required
					onChange={handleChange}
					name="displayName"
					value={displayName}
				/>

				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>

				<FormInput
					label="Confirm Password"
					type="password"
					required
					onChange={handleChange}
					name="confirmpassword"
					value={confirmpassword}
				/>
				<Button children="Sign Up" type="submit" />
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
