import React, { useState, useRef, useEffect } from 'react';
import Sejong from '../assets/images/MiniSejong.png';
import { useGreatPersonStore } from '../store';
import '../index.css'; // CSS 파일에서 애니메이션 정의를 추가합니다.

// Message 타입 정의
interface Message {
  id: number;
  sender: string;
  text: string;
  ttsUrl?: string | null; // TTS URL 추가
  isTtsReady?: boolean; // TTS 준비 상태 추가
}

// TypeScript 타입 정의 추가
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// 명시적으로 타입 정의
interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResult[];
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

// Message 컴포넌트 분리
const MessageComponent: React.FC<{
  message: Message;
  currentAudio: HTMLAudioElement | null;
  setCurrentAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  playVideo: () => void;
  pauseVideo: () => void;
}> = ({ message, currentAudio, setCurrentAudio, playVideo, pauseVideo }) => (
  <div className={`flex ${message.sender === '' ? 'justify-end' : 'justify-start'} items-start mb-2`}>
    <div className="flex items-start">
      {message.sender === '세종대왕' && <img src={Sejong} alt="세종대왕" className="w-10 h-10 rounded-full" />}
      <div>
        {message.sender && <span className="ml-2">{message.sender}</span>}
        <div
          className={`ml-3 mb-4 p-2 leading-tight max-w-xs break-words ${message.sender === '' ? 'bg-white' : 'bg-white'} ${
            message.isTtsReady ? 'cursor-pointer hover:bg-gray-200' : ''
          }`}
          style={{ borderRadius: '0px 10px 10px 10px' }}
          onClick={() => {
            if (message.ttsUrl) {
              if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
              }
              const audio = new Audio(message.ttsUrl);
              audio.playbackRate = 1.15; // 재생 속도를 1.5배속으로 설정
              setCurrentAudio(audio);
              playVideo();
              audio.play();
              audio.onended = () => {
                pauseVideo();
              };
            }
          }}
        >
          <div>{message.text}</div>
        </div>
      </div>
    </div>
  </div>
);

const GreatChatPageRight: React.FC<{ playVideo: () => void; pauseVideo: () => void }> = ({ playVideo, pauseVideo }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const recognitionRef = useRef<any>(null);
  const { greatId, name } = useGreatPersonStore();

  // WebSocket 연결 설정
  useEffect(() => {
    if (greatId) {
      socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${greatId}/`);

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleNewMessage(name, data.message);
      };

      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
      };
    }
  }, [greatId, name]);

  const fetchTTSUrl = async (message: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/tts/change_sound/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence: message }),
      });

      if (!response.ok) {
        throw new Error(`TTS API 요청 실패: ${response.statusText}`);
      }

      const data = await response.json();
      const { task_id } = data;

      // TTS 작업 완료 여부를 주기적으로 확인
      let audioUrl: string | null = null;
      while (!audioUrl) {
        const resultResponse = await fetch(`/api/tts/get_tts_task/${task_id}/`);
        if (resultResponse.status === 200) {
          const resultData = await resultResponse.blob();
          audioUrl = URL.createObjectURL(resultData);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 간격으로 재시도
        }
      }

      return audioUrl;
    } catch (error) {
      console.error('TTS API 호출 중 오류 발생:', error);
      return null;
    }
  };

  const handleNewMessage = async (sender: string, text: string) => {
    if (loading) {
      setLoading(false); // 첫 번째 메시지가 오면 로딩 상태를 false로 설정
    }
    const newMessage: Message = { id: Date.now(), sender, text, isTtsReady: false };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // TTS URL을 가져와서 메시지에 추가
    if (sender !== '') {
      const ttsUrl = await fetchTTSUrl(text);
      newMessage.ttsUrl = ttsUrl;
      newMessage.isTtsReady = true;
      setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === newMessage.id ? newMessage : msg)));
    }
  };

  const handleSendMessage = (message: string) => {
    if (message.trim() !== '') {
      if (socketRef.current) {
        socketRef.current.send(JSON.stringify({ message }));
      }
      handleNewMessage('', message);
      setInput('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isComposing) {
      event.preventDefault();
      handleSendMessage(input);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleStartRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('웹 브라우저가 음성 인식을 지원하지 않습니다.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'ko-KR';
    recognition.continuous = true;

    recognition.onstart = () => {
      console.log('음성 인식 시작');
      setIsRecording(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      console.log('최종 인식 내용:', finalTranscript);
      handleSendMessage(finalTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('음성 인식 오류 발생:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      console.log('음성 인식 종료');
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="flex-grow max-w-2xl m-4">
      <div className="mt-4 mb-4 text-[20px] text-center">{getCurrentDate()}</div>
      <div className="mr-2 ml-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[550px]">
            <div className="loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="text-[25px] font-bold">위인 데리고 오는 중...</div>
          </div>
        ) : (
          <div className="h-[550px] overflow-y-auto">
            <div className="mr-6">
              {messages.map((message) => (
                <MessageComponent
                  key={message.id}
                  message={message}
                  currentAudio={currentAudio}
                  setCurrentAudio={setCurrentAudio}
                  playVideo={playVideo}
                  pauseVideo={pauseVideo}
                />
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>
        )}
        <div className="flex justify-end mr-6 mb-3">
          <input
            type="text"
            value={input}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onChange={(e) => setInput(e.target.value)}
            className="border border-black rounded-md w-[400px] h-[40px] mb-[15px]"
            placeholder="   메시지를 입력하세요."
          />
          <button
            onClick={() => handleSendMessage(input)}
            className="ml-1 text-white border-black bg-amber-800 hover:bg-amber-950 rounded-md w-[55px] h-[40px]"
          >
            전송
          </button>
          {isRecording ? (
            <button
              onClick={handleStopRecording}
              className="ml-1 text-white border-black bg-red-500 hover:bg-red-700 rounded-md w-[55px] h-[40px]"
            >
              중지
            </button>
          ) : (
            <button
              onClick={handleStartRecording}
              className="ml-1 text-white border-black bg-amber-800 hover:bg-amber-950 rounded-md w-[55px] h-[40px]"
            >
              마이크
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GreatChatPageRight;
