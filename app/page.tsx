"use client";

import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Interview from "./components/Interview";
import FluidBackground from "./components/FluidBackground";

export default function Home() {
  const { openSignIn } = useClerk();
  const [interviewStarted, setInterviewStarted] = useState(false);

  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <div className="interview-body relative">
          <FluidBackground />
          <div className="absolute top-4 right-4 z-50">
            <UserButton />
          </div>
          <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16">
            {!interviewStarted ? (
              <button
                onClick={() => setInterviewStarted(true)}
                className="shiny-cta"
              >
                <span>Start Interview</span>
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
