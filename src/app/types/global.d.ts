export type SpeechRecognitionEvent = {
  results: {
    [0]: {
      transcript: string;
    };
  }[];
};

export type SpeechRecognitionErrorEvent = {
  error: string;
};

export type SpeechRecognition = {
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
};
