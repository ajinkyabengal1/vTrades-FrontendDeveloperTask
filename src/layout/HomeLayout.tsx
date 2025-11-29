import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function HomeLayout({ children }: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#17181E] text-white">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl">
        {/* LEFT PANEL */}
        <div className="relative w-full lg:w-[55%] h-[400px] lg:h-auto lg:min-h-[600px]">
          <Image
            src="/Heropage.jpg"
            alt="People collaborating"
            fill
            className="object-cover rounded-2xl shadow-2xl"
            priority
          />

          {/* gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* text */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            {/* UPDATED H1 BELOW */}
            <h1 className="font-semibold text-[3rem] leading-[119%] tracking-[-0.03em] mb-4">
              Welcome to WORKHIVE!
            </h1>

            <ul className="font-normal text-[16px] leading-[28px] space-y-1">
              <li>
                • Employee Management: View profiles, performance, and
                attendance.
              </li>
              <li>• Performance Insights: Analyze team goals and progress.</li>
              <li>
                • Attendance & Leaves: Track attendance and manage leave
                requests.
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-[45%] px-6 py-10 md:px-10 md:py-12 flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </main>
  );
}
