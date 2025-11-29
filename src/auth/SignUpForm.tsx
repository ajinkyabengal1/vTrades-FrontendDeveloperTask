"use client";

import { FormEvent, useState } from "react";
import { SocialButtons } from "../ui/SocialButtons";

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

        {/* social auth buttons */}
        <SocialButtons />

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
