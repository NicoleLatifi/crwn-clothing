import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../../components/button/button.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <h2>Sign In Page</h2>
      <Button buttonType="google" onClick={logGoogleUser}>
        Sign in with Google
      </Button>
      <SignUpForm />
    </>
  );
};

export default SignIn;
