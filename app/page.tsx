"use client";

import { useState } from "react";
import { HomeLayout } from "@/components/HomeLayout";
import { SignInForm } from "@/components/SignInForm";
import { StatusModal } from "@/components/StatusModal";
import { ForgotPass } from "@/components/ForgotPass";
import { OtpForm } from "@/components/OtpForm";
import { NewPassForm } from "@/components/NewPassForm";
import { SignUpForm } from "@/components/SignUpForm";






type View = "signin" | "signup" | "forgot" | "otp" | "newpass" | "passcreated";

export default function Page() {
  const [view, setView] = useState<View>("signin");
   const [showSignInSuccessModal, setShowSignInSuccessModal] = useState(false);
     const [showLinkSentModal, setShowLinkSentModal] = useState(false);
  const [showPasswordCreatedModal, setShowPasswordCreatedModal] =
    useState(false);

  return (
    <HomeLayout>
      {view === "signin" && (
        <SignInForm
          onForgotPassword={() => setView("forgot")}
          onSwitchToSignUp={() => setView("signup")}
           onSuccess={() => setShowSignInSuccessModal(true)}
        />
      )}

      {view === "signup" && (
        <SignUpForm onSwitchToSignIn={() => setView("signin")} />
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
          message="You have signed in with the demo credentials."
          buttonLabel="Continue"
          onClose={() => setShowSignInSuccessModal(false)}
        />
      )}

      {/* Forgot link modal */}
      {showLinkSentModal && (
        <StatusModal
          icon="mail"
          title="Link Sent Successfully!"
          message="Check your inbox. We’ve sent you an email with instructions to reset your password."
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

      
    </HomeLayout>
  );
}
