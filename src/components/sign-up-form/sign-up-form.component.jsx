import { useState } from "react";

import { SignUpContainer } from "./sign-up-form.styles.jsx";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {
        displayName,
      });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use.");
      }
      console.log("User creation encountered an error", error);
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="DisplayName"
          inputProps={{
            name: "displayName",
            onChange: handleChange,
            required: true,
            type: "text",
            value: displayName,
          }}
        />
        <FormInput
          label="Email"
          inputProps={{
            name: "email",
            onChange: handleChange,
            required: true,
            type: "email",
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputProps={{
            name: "password",
            onChange: handleChange,
            required: true,
            type: "password",
            value: password,
          }}
        />
        <FormInput
          label="Confirm Password"
          inputProps={{
            name: "confirmPassword",
            onChange: handleChange,
            required: true,
            type: "password",
            value: confirmPassword,
          }}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
