"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { SignInResponse } from "next-auth/react";
import { HomeLayout } from "@/src/components/layout/HomeLayout";
import { SignInForm } from "@/src/auth/SignInForm";
import { StatusModal } from "@/src/components/ui/StatusModal";
import { ForgotPass } from "@/src/auth/ForgotPass";
import { OtpForm } from "@/src/auth/OtpForm";
import { NewPassForm } from "@/src/auth/NewPassForm";
import { SignUpForm } from "@/src/auth/SignUpForm";

type View =
  | "signin"
  | "signup"
  | "forgot"
  | "otp"
  | "newPassword"
  | "passcreated";

export default function Page() {
  const [view, setView] = useState<View>("signin");
  const [showSignInSuccessModal, setShowSignInSuccessModal] = useState(false);
  const [showLinkSentModal, setShowLinkSentModal] = useState(false);
  const [showPasswordCreatedModal, setShowPasswordCreatedModal] =
    useState(false);
  const [showSignUpSuccessModal, setShowSignUpSuccessModal] = useState(false);
  const [signInSuccessMessage, setSignInSuccessMessage] = useState(
    "You have signed in with the demo credentials."
  );

  const { data: session, status } = useSession();

  // function to handle sign in success
  const handleSignInSuccess = (data?: SignInResponse | undefined) => {
    let provider = "";

    console.log("Sign-in data:", data);

    provider = localStorage.getItem("social-signin-pending") || "";

    if (provider === "google") {
      setSignInSuccessMessage("Logged in successfully with Google.");
    } else {
      setSignInSuccessMessage("You have signed in successfully.");
    }

    setShowSignInSuccessModal(true);

    localStorage.removeItem("social-signin-pending");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const pending = localStorage.getItem("social-signin-pending");
      if (pending && status === "authenticated") {
        console.log("Session after social sign-in:", session);

        setTimeout(() => {
          if (pending === "google") {
            setSignInSuccessMessage("Logged in successfully with Google.");
          } else {
            setSignInSuccessMessage("You have signed in successfully.");
          }
          setShowSignInSuccessModal(true);
          localStorage.removeItem("social-signin-pending");
        }, 0);
      }
    } catch {
      console.log("No pending social sign-in.");
    }
  }, [status, session]);

  return (
    <HomeLayout>
      {view === "signin" && (
        <SignInForm
          onForgotPassword={() => setView("forgot")}
          onSwitchToSignUp={() => setView("signup")}
          onSuccess={handleSignInSuccess}
        />
      )}

      {view === "signup" && (
        <SignUpForm
          onSwitchToSignIn={() => setView("signin")}
          onSuccess={() => setShowSignUpSuccessModal(true)}
        />
      )}

      {view === "forgot" && (
        <ForgotPass
          onSuccess={() => {
            setShowLinkSentModal(true);
          }}
        />
      )}

      {view === "otp" && (
        <OtpForm
          onSuccess={() => {
            setView("newPassword");
          }}
        />
      )}

      {view === "newPassword" && (
        <NewPassForm
          onSuccess={() => {
            setShowPasswordCreatedModal(true);
          }}
        />
      )}

      {/* Sign-in success modal */}
      {showSignInSuccessModal && (
        <StatusModal
          icon="success"
          title="Signed In Successfully!"
          message={signInSuccessMessage}
          buttonLabel="Continue"
          onClose={() => setShowSignInSuccessModal(false)}
        />
      )}

      {/* Forgot link modal */}
      {showLinkSentModal && (
        <StatusModal
          icon="mail"
          title="Link Sent Successfully!"
          message="Check your inbox. We've sent you an email with instructions to reset your password."
          buttonLabel="Okay"
          onClose={() => {
            setShowLinkSentModal(false);
            setView("otp");
          }}
        />
      )}

      {/* confirm pass modal */}
      {showPasswordCreatedModal && (
        <StatusModal
          icon="success"
          title="Password Created!"
          message="Your password has been successfully updated. You can now use your new password to log in."
          buttonLabel="Okay"
          onClose={() => {
            setShowPasswordCreatedModal(false);
            setView("signin");
          }}
        />
      )}

      {/* Sign up sucess modal */}
      {showSignUpSuccessModal && (
        <StatusModal
          icon="success"
          title="Account Created Successfully!"
          message="Your account has been created. You can now sign in using your credentials."
          buttonLabel="Go to Sign In"
          onClose={() => {
            setShowSignUpSuccessModal(false);
            setView("signin");
          }}
        />
      )}
    </HomeLayout>
  );
}
