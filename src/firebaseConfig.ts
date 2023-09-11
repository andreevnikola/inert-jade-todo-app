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
    return await auth.signInWithPopup(auth.getAuth(), provider);
  } catch {
    return undefined;
  }
}

export async function loginViaFacebook() {
  try {
    const provider = new auth.FacebookAuthProvider();
    return await auth.signInWithPopup(auth.getAuth(), provider);
  } catch {
    return undefined;
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
  // return auth.signInWithPopup(auth.getAuth(), provider);
}

const analytics = getAnalytics(app);

export default app;
