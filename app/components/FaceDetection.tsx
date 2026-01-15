'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface FaceDetectionComponentProps {
  onEndInterview: () => void;
}

type FaceDetection = any;
type Camera = any;

export default function FaceDetectionComponent({ onEndInterview }: FaceDetectionComponentProps) {
  const [hasFace, setHasFace] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [error, setError] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const faceDetectionRef = useRef<FaceDetection | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(true);

  const stopStream = useCallback(() => {
    if (cameraRef.current) {
      try {
        cameraRef.current.stop();
      } catch (error) {
        console.warn('Error stopping camera:', error);
      }
    }
    if (faceDetectionRef.current) {
      try {
        faceDetectionRef.current.close();
      } catch (error) {
        console.warn('Error closing face detection:', error);
      }
    }
  }, []);

  const handleFaceDetection = useCallback((detections: any[]) => {
    const faceDetected = detections && detections.length > 0;
    setHasFace(faceDetected);

    if (faceDetected) {
      // Face detected - clear countdown timer and hide countdown
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
      setShowCountdown(false);
      setTimeLeft(10);
    } else if (!countdownTimerRef.current) {
      // No face detected and no countdown running - start countdown
      setShowCountdown(true);
      setTimeLeft(10);

      countdownTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time's up - end interview
            if (cameraRef.current) {
              try {
                cameraRef.current.stop();
              } catch (error) {
                console.warn('Error stopping camera during interview end:', error);
              }
            }
            if (faceDetectionRef.current) {
              try {
                faceDetectionRef.current.close();
              } catch (error) {
                console.warn('Error closing face detection during interview end:', error);
              }
            }
            onEndInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [onEndInterview]);

  useEffect(() => {
    isActiveRef.current = true;

    const initializeFaceDetection = async () => {
      if (!videoRef.current) return;

      try {
        // Load MediaPipe scripts dynamically
        await Promise.all([
          new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          }),
          new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          })
        ]);

        // Wait for MediaPipe to be available
        await new Promise(resolve => setTimeout(resolve, 100));

        // Access MediaPipe from global scope
        const FaceDetectionClass = (window as any).FaceDetection;
        const CameraClass = (window as any).Camera;

        if (!FaceDetectionClass || !CameraClass) {
          throw new Error('MediaPipe libraries not loaded properly');
        }

        // Initialize Face Detection
        const faceDetection = new FaceDetectionClass({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
          },
        });

        faceDetection.setOptions({
          model: 'short',
          minDetectionConfidence: 0.6,
        });

        faceDetection.onResults((results: any) => {
          if (isActiveRef.current) {
            handleFaceDetection(results.detections || []);
          }
        });

        faceDetectionRef.current = faceDetection;

        // Initialize Camera
        const camera = new CameraClass(videoRef.current, {
          onFrame: async () => {
            if (isActiveRef.current && faceDetectionRef.current) {
              try {
                await faceDetectionRef.current.send({ image: videoRef.current! });
              } catch (error) {
                // Ignore errors that occur during cleanup
                console.warn('Face detection send error:', error);
              }
            }
          },
          width: 640,
          height: 480,
        });

        cameraRef.current = camera;
        await camera.start();
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

    initializeFaceDetection();

    // Cleanup function
    return () => {
      isActiveRef.current = false;
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      stopStream();
    };
  }, [handleFaceDetection, stopStream]);

  const handleManualEndInterview = () => {
    stopStream();
    onEndInterview();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <video
            ref={videoRef}
            className="border rounded-lg shadow-lg mb-4"
            width="640"
            height="480"
            autoPlay
            muted
            playsInline
          />

          {showCountdown && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md text-center">
              <div className="font-bold text-2xl">⚠️ {timeLeft}</div>
              <div>Interview will end if no face is detected</div>
            </div>
          )}

          <div className="text-xl font-semibold mb-4">
            {hasFace ? (
              <span className="text-green-600">✓ Face detected</span>
            ) : (
              <span className="text-red-600">✗ No face detected</span>
            )}
          </div>

          <button
            onClick={handleManualEndInterview}
            className="rounded-full bg-red-600 px-6 py-3 text-white text-lg font-semibold hover:bg-red-700 transition-colors"
          >
            End Interview
          </button>
        </>
      )}
    </div>
  );
}
