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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, sender: '', text: input }]);
      setInput('');
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-grow max-w-2xl m-4">
      <div className="mt-4 mb-4 text-[20px] text-center">---------------- 2024년 06월 03일 ----------------</div>
      <div className="mb-4 h-[570px] overflow-y-auto">
        <div className="mr-4">
          {messages.map((message) => (
            <MessageComponent key={message.id} message={message} />
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>
      <div className="flex justify-end mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border border-gray-300 rounded-l-lg"
          placeholder="메시지를 입력하세요."
        />
        <button onClick={handleSendMessage} className="p-2 text-white bg-blue-500 rounded-r-lg">
          전송
        </button>
      </div>
    </div>
  );
};

export default GreatChatPageRight;
