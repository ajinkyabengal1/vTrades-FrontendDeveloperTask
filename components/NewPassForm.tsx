"use client";

import { FormEvent, useState } from "react";

interface Props {
  onSuccess: () => void;
}

export function NewPassForm({ onSuccess }: Props) {
  const [password, setPassword] = useState("Pass@1234");
  const [confirm, setConfirm] = useState("Pass@1234");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log(password, "pass");

    if (!password || !confirm) {
      setError("Please fill both password fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password should be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Oops! Passwords don't match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 700);
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-2xl font-semibold mb-1">Create New Password</h2>
        <p className="text-sm text-gray-400">
          Choose a strong and secure password to keep your account safe.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full rounded-md bg-[#181824] border px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 ${
                error?.includes("match")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-purple-500"
              }`}
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
          <label className="text-sm text-gray-300">
            Re-enter your new password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className={`w-full rounded-md bg-[#181824] border px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 ${
                error?.includes("match")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-purple-500"
              }`}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute inset-y-0 right-3 text-xs text-gray-400"
            >
              <span className="material-symbols-outlined text-xs">
                {showPassword ? "visibility" : "visibility_off"}
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
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
