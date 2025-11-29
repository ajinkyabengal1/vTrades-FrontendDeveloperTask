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

  // function for submit new pass form
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
        <h2 className="text-[32px] leading-[150%] font-semibold mb-1">
          Create New Password
        </h2>
        <p className="text-sm font-normal text-[#DADADA] leading-[170%]">
          Choose a strong and secure password to keep your account safe.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="block w-full font-normal text-[12px] leading-[20px]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full text-sm font-semibold rounded-md bg-[#1D1E26] border px-4 py-3 pr-10 focus:outline-none focus:ring-2 ${
                error?.includes("match")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#30303D] focus:ring-[#8854C0]"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="space-y-1">
          <label className="text-sm text-gray-300">
            Re-enter your new password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className={`w-full text-sm font-semibold rounded-md bg-[#1D1E26] border px-4 py-3 pr-10 focus:outline-none focus:ring-2 ${
                error?.includes("match")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#30303D] focus:ring-[#8854C0]"
              }`}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute inset-y-0 right-3 text-xs"
            >
              <span className="material-symbols-outlined text-[16.5px]!">
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
          className="flex items-center justify-center w-full h-[50px] gap-2.5 rounded-[10px] bg-[#8854C0] px-6 py-[13px] text-base font-semibold leading-[150%] hover:bg-[#7a4ab0] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
