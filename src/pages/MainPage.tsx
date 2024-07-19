import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useUserIdStore } from '../store';
import backgroundImage from '../assets/Bookmark.png';

interface MainPageProps {
  next: () => void;
}
const MainPage: React.FC<MainPageProps> = (props) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 + 1 }, (_, i) => 1999 + i);
  const { setUserId } = useUserIdStore();
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
        setUserId(response.data.userID);
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
        <div className="flex">
          <div className="mt-6 mb-16 text-4xl font-bold whitespace-nowrap">We in</div>
          <img src="images/jeon.png" className="w-[7rem] h-[5rem]"></img>
        </div>

        <div className="mb-7">
          <input
            id="name"
            type="text"
            value={username}
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요."
            className="w-[100%] px-3 py-1 mx-auto text-m transform border border-gray-300 rounded"
          />
          <h1 className="block mt-10 mb-4 text-lg"></h1>
          <select
            id="age"
            value={year}
            onChange={handleYearChange}
            className="w-[90%] px-3 py-1 mx-auto text-lg text-gray-500 transform border border-gray-300 rounded text-center"
          >
            <option className="m-10">나이</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="relative flex items-center justify-center h-20 mt-6">
            <button
              className="absolute z-10 p-3 text-lg text-black bg-cover rounded w-[100%] h-[5rem]"
              onClick={handleClick}
              style={{ backgroundImage: `url(${backgroundImage})` }}
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
