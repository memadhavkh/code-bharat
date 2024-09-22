"use client";
import * as Components from "./Components";
import { auth, firestore } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import AuthModal from "@/components/Modals/AuthModal";


const Auth = () => {
  const [signIn, toggle] = useState(true);
  // Login Part
  const [modalState, setModalState] = useState(false);
  const router = useRouter();
  const [inputs1, setInputs1] = useState({ loginEmail: "", loginPassword: "" });
  const [signInWithEmailAndPassword, loading] =
    useSignInWithEmailAndPassword(auth);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs1((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs1.loginEmail || !inputs1.loginPassword) {
      return;
    }
    try {
      const newUser = await signInWithEmailAndPassword(
        inputs1.loginEmail,
        inputs1.loginPassword
      );
      if (!newUser) return;
      router.push("/");
    } catch (error) {
      toast.error("Error Logging In. Please Try Again", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  
  // Sign UP part
  const [createUserWithEmailAndPassword, loading1] = useCreateUserWithEmailAndPassword(auth);
  const [inputs2, setInputs2] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs2((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs2.email || !inputs2.password || !inputs2.displayName){
      return alert("Please fill all fields");
    }
    try {
      toast.loading("Creating your account", {
        position: "top-center",
        toastId: "loadingToast",
        autoClose: 1000,
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs2.email,
        inputs2.password
      );
      
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs2.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (error) {
      toast.error("Error creating account. Please Try Again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark"
      });
    } finally {
      toast.dismiss("loadingToast");
    }
  };
  return (
    <>
      {modalState == true ? (
        <AuthModal isOpen={modalState} onClose={() => setModalState(false)}/>
      ) : null}
      <main className="mt-8 bg-[#091235]">
        <Components.Container>
          <Components.SignUpContainer signingin={signIn}>
            <Components.Form onSubmit={handleRegister}>
              <h1 className="font-medium pb-16 tracking-wider text-2xl">Register on Code Bharat</h1>
              <Components.Input
                onChange={handleInputChange2}
                type="text"
                name='displayName'
                placeholder="Your Display Name"
              />
              <Components.Input
                onChange={handleInputChange2}
                type="email"
                name="email"
                placeholder="name@company.com"
              />
              <Components.Input
                onChange={handleInputChange2}
                type="password"
                name="password"
                placeholder="********"
              />
              <button type="submit" className="customButton mt-7">
                {loading1 ? "Signing You Up.." : "Register"}
              </button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signingin={signIn}>
            <Components.Form onSubmit={handleLogin}>
              <h1 className="font-medium pb-16 tracking-wider text-2xl">Sign In to Code Bharat</h1>
              <Components.Input
                onChange={handleInputChange}
                type="email"
                name="loginEmail"
                placeholder="Email"
              />
              <Components.Input
                onChange={handleInputChange}
                name="loginPassword"
                type="password"
                placeholder="********"
              />
              <button className="mt-5 mb-3 font-light"
                onClick={() => {
                  setModalState(true);
                }}
              >
                <Components.Anchor>Forgot your password?</Components.Anchor>
              </button>
              <button type="submit" className="customButton ">
                {loading ? "Signing You In..." : "Log In"}
              </button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signingin={signIn}>
            <Components.Overlay signingin={signIn}>
              <Components.LeftOverlayPanel signingin={signIn}>
                <h1 className="font-light text-3xl mb-10">Welcome Back!</h1>
                <p className="font-extralight text-md mb-8 tracking-wide">
                  We waited for you to start our journey to code.
                </p>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signingin={signIn}>
                <h1 className="font-light text-3xl mb-10">Hello, Friend!</h1>
                <p className="font-extralight text-md mb-8 tracking-wide">
                  Register with us to create an impact on the world with your code.
                </p>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </main>
    </>
  );
};

export default Auth;
