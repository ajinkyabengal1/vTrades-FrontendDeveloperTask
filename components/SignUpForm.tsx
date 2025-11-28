"use client";

import { FormEvent, useState } from "react";

interface Props {
  onSwitchToSignIn: () => void;
  onSuccess: () => void;
}

export function SignUpForm({ onSwitchToSignIn, onSuccess }: Props) {
  const [email, setEmail] = useState("navinash@workhive.com");
  const [password, setPassword] = useState("Workhiveadmin");
  const [confirm, setConfirm] = useState("Workhiveadmin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // function for submit sign up form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirm) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSwitchToSignIn();
      onSuccess();
    }, 700);
  };

  const handleGoogle = () => alert("Google Sign-Up clicked (mock).");
  const handleMicrosoft = () => alert("Microsoft Sign-Up clicked (mock).");

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-2xl font-semibold mb-1">Sign Up</h2>
        <p className="text-sm text-gray-400">
          Manage your workspace seamlessly. Sign up to continue.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Email Address</label>
          <input
            type="email"
            className="w-full rounded-md bg-[#181824] border border-gray-700 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-md bg-[#181824] border border-gray-700 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="space-y-1">
          <label className="text-sm text-gray-300">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full rounded-md bg-[#181824] border border-gray-700 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute inset-y-0 right-3 text-xs text-gray-400"
            >
              <span className="material-symbols-outlined text-xs">
                {showConfirm ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="h-px flex-1 bg-gray-700" />
          or
          <span className="h-px flex-1 bg-gray-700" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-700 bg-[#181824] py-3 text-sm hover:bg-[#202033]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M24 12.276c0-.887-.082-1.734-.235-2.551H12.245v4.82h6.61c-.285 1.543-1.147 2.846-2.428 3.704v3.08h3.932c2.302-2.118 3.626-5.24 3.626-8.95z"
            />
            <path
              fill="#34A853"
              d="M12.245 24c3.218 0 5.923-1.066 7.9-2.89l-3.932-3.08c-1.072.722-2.443 1.15-4.068 1.15-3.136 0-5.789-2.115-6.736-4.965H1.424v3.132C3.392 21.237 7.525 24 12.245 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.509 14.215c-.244-.735-.385-1.523-.385-2.315 0-.792.141-1.58.385-2.315V6.453H1.424C.516 8.267 0 10.324 0 12.5c0 2.176.516 4.233 1.424 6.047l4.085-3.132z"
            />
            <path
              fill="#4285F4"
              d="M12.245 4.814c1.748 0 3.322.602 4.566 1.787l3.435-3.418C17.962 1.11 15.362 0 12.245 0 7.525 0 3.392 2.763 1.424 6.453l4.085 3.132c.947-2.85 3.6-4.965 6.736-4.965z"
            />
          </svg>
          <span>Sign In with Google</span>
        </button>

        <button
          type="button"
          onClick={handleMicrosoft}
          className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-700 bg-[#181824] py-3 text-sm hover:bg-[#202033]"
        >
          <svg className="w-5 h-5" viewBox="0 0 23 23">
            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          <span>Sign In with Microsoft</span>
        </button>

        <p className="text-xs text-gray-400 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-purple-400 hover:underline"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}
