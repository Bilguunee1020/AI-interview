/// <reference path="../types/speech.d.ts" />

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface InterviewProps {
  onEndInterview: () => void;
}

type FaceDetection = any;
type Camera = any;

export default function Interview({ onEndInterview }: InterviewProps) {
  const [interviewActive, setInterviewActive] = useState(false);
  const [finalTranscripts, setFinalTranscripts] = useState<string[]>([]);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [hasFace, setHasFace] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [error, setError] = useState<string>('');
  const [speechError, setSpeechError] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [noSpeechHint, setNoSpeechHint] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const faceDetectionRef = useRef<FaceDetection | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptPanelRef = useRef<HTMLDivElement>(null);
  const isActiveRef = useRef(true);
  const noSpeechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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

  const stopSpeechRecognition = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.warn('Error stopping speech recognition:', error);
      }
      recognitionRef.current = null;
    }
  }, []);

  const startSpeechRecognition = useCallback(async () => {
    if (!SpeechRecognition) {
      setSpeechError('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setNoSpeechHint(false);
        if (noSpeechTimerRef.current) {
          clearTimeout(noSpeechTimerRef.current);
        }
        noSpeechTimerRef.current = setTimeout(() => {
          setNoSpeechHint(true);
        }, 3000);
      };

      recognition.onresult = (event) => {
        if (noSpeechTimerRef.current) {
          clearTimeout(noSpeechTimerRef.current);
        }
        setNoSpeechHint(false);
        noSpeechTimerRef.current = setTimeout(() => {
          setNoSpeechHint(true);
        }, 3000);

        let interim = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += transcript;
          } else {
            interim += transcript;
          }
        }

        if (finalText) {
          setFinalTranscripts(prev => [...prev, finalText.trim()]);
        }
        if (interim) {
          setInterimTranscript(interim);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (noSpeechTimerRef.current) {
          clearTimeout(noSpeechTimerRef.current);
        }
        // Auto-restart with debounce to prevent browser throttling
        if (interviewActive && isActiveRef.current && !restartTimeoutRef.current) {
          restartTimeoutRef.current = setTimeout(() => {
            if (interviewActive && isActiveRef.current) {
              restartTimeoutRef.current = null;
              startSpeechRecognition();
            }
          }, 200);
        }
      };

      recognition.onerror = (event) => {
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission is required for speech recognition.');
        } else {
          console.warn('Speech recognition error:', event.error);
          // Auto-restart on non-critical errors
          if (interviewActive && isActiveRef.current) {
            setTimeout(() => {
              if (interviewActive && isActiveRef.current) {
                startSpeechRecognition();
              }
            }, 1000);
          }
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      setSpeechError('');
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setSpeechError('Microphone permissions are required for speech recognition.');
        } else {
          setSpeechError('Failed to start speech recognition: ' + err.message);
        }
      }
    }
  }, [interviewActive, SpeechRecognition]);

  const handleFaceDetection = useCallback((detections: any[]) => {
    const faceDetected = detections && detections.length > 0;
    setHasFace(faceDetected);

    if (faceDetected) {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
      setShowCountdown(false);
      setTimeLeft(10);
    } else if (!countdownTimerRef.current) {
      setShowCountdown(true);
      setTimeLeft(10);

      countdownTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleEndInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, []);

  const handleStartInterview = async () => {
    setInterviewActive(true);
    setFinalTranscripts([]);
    setInterimTranscript('');
    setError('');
    setSpeechError('');
    await startSpeechRecognition();
  };

  const handleEndInterview = useCallback(() => {
    setInterviewActive(false);
    stopSpeechRecognition();
    stopStream();
    onEndInterview();
  }, [stopSpeechRecognition, stopStream, onEndInterview]);

  useEffect(() => {
    if (interviewActive) {
      isActiveRef.current = true;

      const initializeFaceDetection = async () => {
        if (!videoRef.current) return;

        try {
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

          await new Promise(resolve => setTimeout(resolve, 100));

          const FaceDetectionClass = (window as any).FaceDetection;
          const CameraClass = (window as any).Camera;

          if (!FaceDetectionClass || !CameraClass) {
            throw new Error('MediaPipe libraries not loaded properly');
          }

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

          const camera = new CameraClass(videoRef.current, {
            onFrame: async () => {
              if (isActiveRef.current && faceDetectionRef.current) {
                try {
                  await faceDetectionRef.current.send({ image: videoRef.current! });
                } catch (error) {
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
          }
        }
      };

      initializeFaceDetection();
    }

    return () => {
      isActiveRef.current = false;
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      if (noSpeechTimerRef.current) {
        clearTimeout(noSpeechTimerRef.current);
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      stopSpeechRecognition();
      stopStream();
    };
  }, [interviewActive, handleFaceDetection, stopSpeechRecognition, stopStream]);

  useEffect(() => {
    if (transcriptPanelRef.current) {
      transcriptPanelRef.current.scrollTop = transcriptPanelRef.current.scrollHeight;
    }
  }, [finalTranscripts, interimTranscript]);

  if (!interviewActive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <button
          onClick={handleStartInterview}
          className="rounded-full bg-blue-600 px-8 py-4 text-white text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Start Interview
        </button>
        {speechError && (
          <p className="text-red-500 text-center mt-4">{speechError}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
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
              onClick={handleEndInterview}
              className="rounded-full bg-red-600 px-6 py-3 text-white text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              End Interview
            </button>
          </>
        )}
      </div>

      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Live transcript (may have slight delay)</h2>
            {isListening && (
              <div className="flex items-center text-green-600 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Listening…
              </div>
            )}
          </div>
          {speechError && (
            <p className="text-red-500 text-sm mt-2">{speechError}</p>
          )}
          {noSpeechHint && (
            <p className="text-amber-600 text-sm mt-2">Speak clearly in short sentences</p>
          )}
        </div>

        <div
          ref={transcriptPanelRef}
          className="flex-1 p-4 overflow-y-auto space-y-3"
        >
          {finalTranscripts.map((transcript, index) => (
            <div key={index} className="text-gray-800 leading-relaxed">
              {transcript}
            </div>
          ))}

          {interimTranscript && (() => {
            const chunks = interimTranscript.split(/[.!?]+/).filter(chunk => chunk.trim());
            const lastChunk = chunks[chunks.length - 1] || '';
            const previousChunks = chunks.slice(0, -1);

            return (
              <div className="space-y-2">
                {previousChunks.map((chunk, index) => (
                  <div key={index} className="text-gray-600 italic leading-relaxed">
                    {chunk.trim()}.
                  </div>
                ))}
                {lastChunk && (
                  <div className="text-gray-500 italic leading-relaxed relative">
                    {lastChunk.trim()}
                    <span className="inline-block w-0.5 h-5 bg-gray-500 animate-pulse ml-1"></span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
