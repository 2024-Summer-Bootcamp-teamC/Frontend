import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface MainPageProps {
  next: () => void;
}
const MainPage: React.FC<MainPageProps> = (props) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 + 1 }, (_, i) => 1999 + i);

  const [username, setName] = useState('');
  const [year, setYear] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setYear(e.target.value);
  };

  // api
  const handleClick = (): void => {
    if (!username || !year) {
      alert('Please enter your name and select your birth year.');
      return;
    }

    const newUser = {
      username,
      year: parseInt(year),
    };

    axios
      .post('/api/users/', newUser)
      .then((response) => {
        console.log('Response:', response.data);
        props.next();
        // 성공적으로 요청이 처리된 경우의 추가 작업
      })
      .catch((error) => {
        console.error('Error:', error);
        // 요청이 실패한 경우의 추가 작업
      });
  };

  return (
    <div className="flex items-center">
      {/* 왼쪽 컨텐츠 */}
      <div className="w-5/6 pr-24 text-center">
        <h1 className="mt-6 mb-16 text-4xl font-bold whitespace-nowrap">서비스 이름</h1>
        <div className="mb-7">
          <input
            id="name"
            type="text"
            value={username}
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요."
            className="w-[65%] px-3 py-1 mx-auto text-lg transform border border-gray-300 rounded"
          />
          <h1 className="block mt-10 mb-4 text-lg"></h1>
          <select
            id="age"
            value={year}
            onChange={handleYearChange}
            className="w-1/4 px-3 py-1 mx-auto text-lg text-gray-500 transform border border-gray-300 rounded"
          >
            <option value="">나이</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="relative flex items-center justify-center h-20 mt-6">
            <button
              className="absolute z-10 p-3 text-lg text-black rounded bg-brown-500 hover:bg-brown-600"
              onClick={handleClick}
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
