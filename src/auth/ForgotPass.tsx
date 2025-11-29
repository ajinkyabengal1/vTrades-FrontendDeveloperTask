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
        <h2 className="text-[32px] leading-[150%] font-semibold mb-1">
          Forgot Your Password?
        </h2>
        <p className="text-sm font-normal text-[#DADADA] leading-[170%]">
          Don&apos;t worry! Enter your email address, and we&apos;ll send you a
          link to reset it.
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
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
          className="flex items-center justify-center w-full h-[50px] gap-2.5 rounded-[10px] bg-[#8854C0] px-6 py-[13px] text-base font-semibold leading-[150%] hover:bg-[#7a4ab0] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
