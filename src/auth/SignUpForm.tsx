import { FormEvent, useState } from "react";
import { SocialButtons } from "../components/ui/SocialButtons";

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
        <h2 className="text-[32px] leading-[150%] font-semibold mb-1">
          Sign Up
        </h2>
        <p className="text-sm font-normal text-[#DADADA] leading-[170%]">
          Manage your workspace seamlessly. Sign up to continue.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="block w-full font-normal text-[12px] leading-[20px]">
            Email Address
          </label>
          <input
            type="email"
            placeholder="demo@gmail.com"
            className="w-full text-sm font-semibold rounded-md bg-[#1D1E26] border border-[#30303D] px-4 py-3  focus:outline-none focus:ring-2 focus:ring-[#8854C0]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label className="block w-full font-normal text-[12px] leading-[20px]">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full text-sm font-semibold rounded-md bg-[#1D1E26] border border-[#30303D] px-4 py-3 pr-10  focus:outline-none focus:ring-2 focus:ring-[#8854C0]"
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="flex items-center gap-4 text-sm leading-[200%]">
          <span className="h-px flex-1 bg-[#272727]" />
          or
          <span className="h-px flex-1 bg-[#272727]" />
        </div>

        {/* social auth buttons */}
        <SocialButtons />

        {/* signin button */}
        <div className=" flex gap-1 justify-center text-center">
          <span className="text-[#DADADA] text-xs leading-[200%]">
            Already have an account?{" "}
          </span>
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-xs font-semibold lg:font-bold!  text-[#8854C0] hover:underline"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
