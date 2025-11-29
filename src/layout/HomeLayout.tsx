import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function HomeLayout({ children }: Props) {
  return (
    <main className="min-h-screen bg-[#17181E] flex justify-center px-4 sm:px-6 lg:px-0 py-6 lg:py-0">
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row">
        {/* LEFT PANEL */}
        <div className="relative w-full lg:w-[55%] p-4 sm:p-6 lg:p-10">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/Heropage.jpg"
              alt="People collaborating"
              fill
              className="object-cover"
              priority
            />

            {/* gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* text */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <h1 className="font-semibold text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[119%] tracking-[-0.03em] mb-4">
                Welcome to WORKHIVE!
              </h1>

              <ul className="font-normal text-sm sm:text-[16px] leading-[24px] sm:leading-[28px] space-y-1">
                <li>
                  • Employee Management: View profiles, performance, and
                  attendance.
                </li>
                <li>
                  • Performance Insights: Analyze team goals and progress.
                </li>
                <li>
                  • Attendance & Leaves: Track attendance and manage leave
                  requests.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-[45%] flex items-center justify-center px-4 sm:px-8 lg:px-10 py-6 lg:py-0">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </main>
  );
}
