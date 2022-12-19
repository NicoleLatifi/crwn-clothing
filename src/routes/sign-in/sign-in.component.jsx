import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    // console.log(response); // includes accessToken, uid
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <h2>Sign In Page</h2>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </>
  );
};

export default SignIn;
