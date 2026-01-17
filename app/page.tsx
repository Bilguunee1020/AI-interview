"use client";

import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Interview from "./components/Interview";

export default function Home() {
  const { openSignIn } = useClerk();
  const [interviewStarted, setInterviewStarted] = useState(false);

  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <div className="absolute top-4 right-4">
            <UserButton />
          </div>
          <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
            {!interviewStarted ? (
              <button
                onClick={() => setInterviewStarted(true)}
                className="rounded-full bg-blue-600 px-8 py-4 text-white text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Interview
              </button>
            ) : (
              <Interview onEndInterview={() => setInterviewStarted(false)} />
            )}
          </main>
        </div>
      </SignedIn>
    </>
  );
}
