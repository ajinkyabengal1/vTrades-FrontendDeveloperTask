"use client";

import { useState } from "react";
import { HomeLayout } from "@/components/HomeLayout";
import { SignInForm } from "@/components/SignInForm";


type View = "signin" | "signup" | "forgot" | "otp" | "newpass" | "passcreated";

export default function Page() {
  const [view, setView] = useState<View>("signin");

  return (
    <HomeLayout>
      {view === "signin" && (
        <SignInForm
          onForgotPassword={() => setView("forgot")}
          onSwitchToSignUp={() => setView("signup")}
        />
      )}

      
    </HomeLayout>
  );
}
