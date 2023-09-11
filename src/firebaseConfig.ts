import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as auth from "firebase/auth";
import env from "./env";

import {
  SignInWithApple,
  SignInWithAppleResponse,
  SignInWithAppleOptions,
} from "@capacitor-community/apple-sign-in";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: "inertjadetodoapp.firebaseapp.com",
  projectId: "inertjadetodoapp",
  storageBucket: "inertjadetodoapp.appspot.com",
  messagingSenderId: "501541973837",
  appId: "1:501541973837:web:914bd8f50f7bcddd689104",
  measurementId: "G-JW6J8D5JM4",
};

const app = initializeApp(firebaseConfig);

export async function loginViaGoogle() {
  try {
    const provider = new auth.GoogleAuthProvider();
    return await auth.signInWithRedirect(auth.getAuth(), provider);
  } catch (error) {
    return undefined;
  }
}

export async function loginViaFacebook() {
  try {
    const provider = new auth.FacebookAuthProvider();
    return await auth.signInWithRedirect(auth.getAuth(), provider);
  } catch {
    return undefined;
  }
}

export async function loginViaPhone(phoneNumber: string) {
  try {
    const recaptchaVerifier = new auth.RecaptchaVerifier(
      auth.getAuth(),
      "recaptcha-container"
    );
    return {
      data: await auth.signInWithPhoneNumber(
        auth.getAuth(),
        phoneNumber,
        recaptchaVerifier
      ),
      error: undefined,
    };
  } catch (error) {
    console.error("ERROR: " + error);
    return {
      data: undefined,
      error: error,
    };
  }
}

const options: SignInWithAppleOptions = {
  clientId: "com.inertjade.todoapp",
  redirectURI: "http://localhost:8100",
  scopes: "email name",
  state: "12345",
  nonce: "nonce",
};

export async function loginViaApple() {
  try {
    const result: SignInWithAppleResponse = await SignInWithApple.authorize(
      options
    );
    const provider = new auth.OAuthProvider("apple.com");
    const credential = provider.credential({
      idToken: result.response.identityToken,
    });
    return await auth.signInWithCredential(auth.getAuth(), credential);
  } catch {
    return undefined;
  }

  // const provider = new auth.OAuthProvider("apple.com");
  // provider.addScope("email");
  // provider.addScope("name");
  // return auth.signInWithRedirect(auth.getAuth(), provider);
}

export async function validatePhoneNumber(
  phoneConfirmation: auth.ConfirmationResult | undefined,
  verificationCode: string
) {
  try {
    const ret = await phoneConfirmation?.confirm(verificationCode);
    return {
      data: ret,
      error: undefined,
    };
  } catch (error) {
    console.log("ERROR: " + error);
    return {
      data: undefined,
      error: error,
    };
  }
}

const analytics = getAnalytics(app);

export default app;
