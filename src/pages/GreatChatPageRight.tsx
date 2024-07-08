import React, { useState } from 'react';
import Sejong from '../assets/images/MiniSejong.png';
import '../index.css';

const GreatChatPageRight: React.FC = () => {
  const [messages, setMessages] = useState([
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

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, sender: '', text: input }]);
      setInput('');
    }
  };

  return (
    <div className="flex-grow max-w-2xl">
      <div className="mb-4 text-center">---------------- 2024년 06월 03일 ----------------</div>
      <div className="mb-4">
        {messages.map((messages) => (
          <div
            key={messages.id}
            className={`flex ${messages.sender === '' ? 'justify-end' : 'justify-start'} items-start mb-2`}
          >
            <div className="flex items-start">
              {messages.sender === '세종대왕' && <img src={Sejong} alt="세종대왕" className="w-10 h-10 rounded-full" />}
              <div>
                {messages.sender && <span className="ml-2">{messages.sender}</span>}
                <div
                  className={`ml-2 mb-4 p-2 rounded-lg leading-tight max-w-xs break-words ${messages.sender === '' ? 'bg-white' : 'bg-white'}`}
                >
                  <div>{messages.text}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4 justify-end">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border border-gray-300 rounded-l-lg"
          placeholder="메시지를 입력하세요."
        />
        <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-r-lg">
          전송
        </button>
      </div>
    </div>
  );
};

export default GreatChatPageRight;
