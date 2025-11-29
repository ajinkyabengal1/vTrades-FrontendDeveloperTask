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
  const [timeLeft, setTimeLeft] = useState(30); // 30 sec timer

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    alert("Your OTP is 123456");
  }, []);

  // countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (otp === OTP) {
        onSuccess();
      } else setError("Incorrect OTP. Please try again.");
      setLoading(false);
    }, 700);
  };

  const handleResend = () => {
    alert("OTP resent.");
    setTimeLeft(30); // restart timer
  };

  const handleChangeEmail = () => {
    alert("Change Email Address clicked.");
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-[32px] leading-[150%] font-semibold mb-1">
          Enter OTP
        </h2>
        <p className="text-sm font-normal text-[#DADADA] leading-[170%]">
          Enter the OTP that we have sent to your email address
          <br /> {" demo@gmail.com."}
        </p>

        {/* Change Email link */}
        <button
          type="button"
          onClick={handleChangeEmail}
          className="mt-4 text-sm leading-6 text-[#8854C0] hover:underline"
        >
          Change Email Address
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP boxes */}
        <div className="flex gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              maxLength={1}
              inputMode="numeric"
              ref={(el) => {
                if (inputRefs.current) inputRefs.current[index] = el;
              }}
              className="w-[46px] h-[48px] text-center text-lg font-semibold 
                         rounded-[10px] bg-[#1D1E26] border border-[#30303D]
                         focus:outline-none focus:ring-2 focus:ring-[#8854C0]"
              value={otp[index] ?? ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

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

        {/* Timer icon */}
        <div className="flex items-center gap-2 text-[#A0A0A0]">
          <span className="material-symbols-outlined text-[18px]!">timer</span>
          <span className="font-medium text-sm leading-5 ">
            {timeLeft > 0 ? `${timeLeft} Sec` : "Time expired"}
          </span>
        </div>

        {/* Resend OTP */}
        <button
          type="button"
          onClick={handleResend}
          disabled={timeLeft > 0}
          className="text-sm leading-5 text-[#8A2BE2] hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
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
          className="flex items-center justify-center w-full h-[50px] gap-2.5 rounded-[10px] bg-[#8854C0] px-6 py-[13px] text-base font-semibold leading-[150%] hover:bg-[#7a4ab0] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Verifying..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
