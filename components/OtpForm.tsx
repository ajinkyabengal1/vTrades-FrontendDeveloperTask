"use client";

import { FormEvent, useEffect, useRef, useState } from "react";


interface Props {
  onSuccess: () => void;
}

const OTP = "123456";

export function OtpForm({ onSuccess }: Props) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Create refs for each box
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    alert("Your OTP is 123456");
  }, []);


  // on otp submit function
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (otp === OTP){
        onSuccess();      
      }
      else setError("Incorrect OTP. Please try again.");
      setLoading(false);
    }, 700);
  };

   // on Resend otp submit function
  const handleResend = () => alert("OTP resent.");

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-2xl font-semibold mb-1">Enter OTP</h2>
        <p className="text-sm text-gray-400">
          Enter the OTP that we have sent to your email address demo@gmail.com.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-10 h-12 rounded-md bg-[#181824] border border-gray-700 text-center text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={otp[index] ?? ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                // Update OTP string
                const chars = otp.split("");
                chars[index] = value;
                setOtp(chars.join(""));

                if (value && index < 5) {
                  inputRefs.current[index + 1]?.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  const chars = otp.split("");
                  chars[index] = "";
                  setOtp(chars.join(""));

                  if (index > 0 && !otp[index]) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleResend}
          className="text-xs text-purple-400 hover:underline"
        >
          Resend OTP
        </button>

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
          {loading ? "Verifying..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
