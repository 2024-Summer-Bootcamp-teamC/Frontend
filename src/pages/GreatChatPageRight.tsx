import React, { useState, useRef, useEffect } from 'react';
import Sejong from '../assets/images/MiniSejong.png';
import '../index.css';

// Message 타입 정의
interface Message {
  id: number;
  sender: string;
  text: string;
}

// Message 컴포넌트 분리
const MessageComponent: React.FC<{ message: Message }> = ({ message }) => (
  <div className={`flex ${message.sender === '' ? 'justify-end' : 'justify-start'} items-start mb-2`}>
    <div className="flex items-start">
      {message.sender === '세종대왕' && <img src={Sejong} alt="세종대왕" className="w-10 h-10 rounded-full" />}
      <div>
        {message.sender && <span className="ml-2">{message.sender}</span>}
        <div
          className={`ml-2 mb-4 p-2 rounded-lg leading-tight max-w-xs break-words ${message.sender === '' ? 'bg-white' : 'bg-white'}`}
        >
          <div>{message.text}</div>
        </div>
      </div>
    </div>
  </div>
);

const GreatChatPageRight: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: '세종대왕',
      text: '안녕? 내 이름은 세종대왕 내가 누군지는 알지? ㅋㅋ',
    },
    {
      id: 2,
      sender: '',
      text: '안ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    },
    { id: 3, sender: '세종대왕', text: '집ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ' },
    { id: 4, sender: '세종대왕', text: '집ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ' },
  ]);

  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    if (input.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, sender: '', text: input }]);
      setInput('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isComposing) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // 현재 날짜를 가져오는 함수
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
        <div className="mb-5 h-[550px] overflow-y-auto">
          <div className="mr-6">
            {messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
          </div>

          <div ref={messagesEndRef} />
        </div>
        <div className="flex justify-end mt-4 mr-6">
          <input
            type="text"
            value={input}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onChange={(e) => setInput(e.target.value)}
            className="border border-black rounded-md w-[500px] h-[30px]"
            placeholder="메시지를 입력하세요."
          />
          <button
            onClick={handleSendMessage}
            className="ml-1 text-white border-black bg-amber-950 rounded-md w-[40px] h-[30px]"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default GreatChatPageRight;
