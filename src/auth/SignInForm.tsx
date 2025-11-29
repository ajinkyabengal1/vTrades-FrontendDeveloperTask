import { FormEvent, useState } from "react";
import type { SignInResponse } from "next-auth/react";
import { SocialButtons } from "../components/ui/SocialButtons";

interface Props {
  onForgotPassword: () => void;
  onSwitchToSignUp: () => void;
  onSuccess: (data?: SignInResponse | undefined) => void;
}

// Dummy credentials for login
const Email = "demo@gmail.com";
const Password = "Pass@1234";

export function SignInForm({
  onForgotPassword,
  onSwitchToSignUp,
  onSuccess,
}: Props) {
  const [email, setEmail] = useState(Email);
  const [password, setPassword] = useState(Password);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // function for submit sign in from
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("Submitting sign-in form with:", { email, password, remember });
    if (!email || !password) {
      setError("Please fill in email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (email === Email && password === Password) {
        onSuccess();
        console.log("Sign-in successful");
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-[32px] leading-[150%] font-semibold mb-1">
          Sign In
        </h2>
        <p className="text-sm font-normal text-[#DADADA] leading-[170%]">
          Manage your workspace seamlessly. Sign in to continue.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="block w-full font-normal text-[12px] leading-[20px]">
            Email Address
          </label>
          <input
            type="email"
            className="w-full text-sm font-semibold rounded-md bg-[#1D1E26] border border-[#30303D] px-4 py-3  focus:outline-none focus:ring-2 focus:ring-[#8854C0]"
            placeholder="navinash@workhive.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="space-y-1">
          <label className="block w-full font-normal text-[12px] leading-[20px]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full text-sm font-semibold rounded-md bg-[#1D1E26] border border-[#30303D] px-4 py-3 pr-10  focus:outline-none focus:ring-2 focus:ring-[#8854C0]"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute inset-y-0 right-3 text-xs"
            >
              <span className="material-symbols-outlined text-[16.5px]!">
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between ">
          <label className="flex text-xs items-center gap-2 cursor-pointer leading-5">
            <input
              type="checkbox"
              className="h-[18px] w-[18px] rounded border-[#DDDDDD]"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs font-semibold leading-5 text-[#8854C0] hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-900/30 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center w-full h-[50px] gap-2.5 rounded-[10px] bg-[#8854C0] px-6 py-[13px] text-base font-semibold leading-[150%] hover:bg-[#7a4ab0] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="flex items-center gap-4 text-sm leading-[200%]">
          <span className="h-px flex-1 bg-[#272727]" />
          or
          <span className="h-px flex-1 bg-[#272727]" />
        </div>

        {/* social auth buttons */}
        <SocialButtons onSuccess={onSuccess} />

        {/* signup button */}
        <div className=" flex gap-1 justify-center text-center">
          <span className="text-[#DADADA] text-xs leading-[200%] ">
            Don&apos;t have an account?{" "}
          </span>

          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-xs font-semibold lg:font-bold!  text-[#8854C0] hover:underline"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
