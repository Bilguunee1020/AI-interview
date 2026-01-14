"use client";

import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { useRef, useState, useEffect } from "react";

const Webcam = ({ onEndInterview }: { onEndInterview: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === 'NotAllowedError') {
            setError('Camera permissions are required to use this feature.');
          } else {
            setError('Failed to access camera: ' + err.message);
          }
        } else {
          setError('An unknown error occurred.');
        }
      }
    };
    getMedia();

    return () => {
      stopStream();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <video ref={videoRef} autoPlay muted className="w-full max-w-md border rounded mb-4" />
          <button
            onClick={() => { stopStream(); onEndInterview(); }}
            className="rounded-full bg-red-600 px-6 py-3 text-white text-lg font-semibold hover:bg-red-700 transition-colors"
          >
            End Interview
          </button>
        </>
      )}
    </div>
  );
};

export default function Home() {
  const { openSignIn } = useClerk();
  const [interviewStarted, setInterviewStarted] = useState(false);

  return (
    <>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <button
            onClick={() => openSignIn()}
            className="rounded-full bg-black px-6 py-3 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Login
          </button>
        </div>
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
              <Webcam onEndInterview={() => setInterviewStarted(false)} />
            )}
          </main>
        </div>
      </SignedIn>
    </>
  );
}
