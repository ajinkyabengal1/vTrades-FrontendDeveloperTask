"use client";

import { FormEvent, useState } from "react";

interface Props {
  onSuccess: () => void;
}

export function ForgotPass({ onSuccess }: Props) {
  const [email, setEmail] = useState("navinash@workhive.com");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // function for submitt forgot pass
  const handleSubmit = (e: FormEvent) => {
    console.log(e, "event");

    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email.");
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
        <h2 className="text-2xl font-semibold mb-1">Forgot Your Password?</h2>
        <p className="text-sm text-gray-400">
          Don&apos;t worry! Enter your email address, and we&apos;ll send you a
          link to reset it.
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Email Address</label>
          <input
            type="email"
            className="w-full rounded-md bg-[#181824] border border-gray-700 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="navinash@workhive.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
