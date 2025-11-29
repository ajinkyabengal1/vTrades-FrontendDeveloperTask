import { FormEvent, useState } from "react";
import { SocialButtons } from "../ui/SocialButtons";

interface Props {
  onForgotPassword: () => void;
  onSwitchToSignUp: () => void;
  onSuccess: () => void;
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
        <h2 className="text-2xl font-semibold mb-1">Sign In</h2>
        <p className="text-sm text-gray-400">
          Manage your workspace seamlessly. Sign in to continue.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Email Address</label>
          <input
            type="email"
            className="w-full rounded-md bg-[#181824] border border-gray-700 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="navinash@workhive.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-md bg-[#181824] border border-gray-700 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute inset-y-0 right-3 text-xs text-gray-400"
            >
              <span className="material-symbols-outlined text-xs">
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-600 bg-[#181824]"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-purple-400 hover:underline"
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
          className="w-full rounded-md bg-purple-600 py-3 text-sm font-semibold hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="h-px flex-1 bg-gray-700" />
          or
          <span className="h-px flex-1 bg-gray-700" />
        </div>

        {/* social auth buttons */}
        <SocialButtons />

        <p className="text-xs text-gray-400 text-center">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-purple-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
