import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useUserIdStore } from '../store';
import backgroundImage from '../assets/Bookmark.png';
import { useTriggerChartStore } from '../store';
import { useCardStore } from '../store';

interface MainPageProps {
  next: () => void;
}

const MainPage: React.FC<MainPageProps> = (props) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 + 1 }, (_, i) => 1999 + i);
  const { setUserId } = useUserIdStore();
  const [username, setName] = useState('');
  const [year, setYear] = useState('');
  const { setCount } = useTriggerChartStore();
  const [fadeOut, setFadeOut] = useState(false);
  const { setCards } = useCardStore();

  const fetchGreatPersons = async (userId: number) => {
    try {
      const response = await axios.get(`/api/greats/${userId}/`);
      // 카드 분리
      setCards(response.data);
    } catch (error) {
      console.error('위대한 인물 정보를 가져오는 중 오류 발생:', error);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setYear(e.target.value);
  };

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
        fetchGreatPersons(response.data.userID);
        setFadeOut(true);
        // 성공적으로 요청이 처리된 경우의 추가 작업
      })
      .catch((error) => {
        console.error('Error:', error);
        // 요청이 실패한 경우의 추가 작업
      });
    setCount();
  };

  // 애니메이션 종료 후 페이지 이동
  const handleTransitionEnd = () => {
    if (fadeOut) {
      props.next();
    }
  };

  return (
    <div className={`flex items-center ${fadeOut ? 'fade-out' : ''}`} onTransitionEnd={handleTransitionEnd}>
      <div className="w-5/6 pr-24 text-center">
        <div className="flex mx-auto w-[50%]">
          <div className="mt-6 mb-16 text-4xl font-bold whitespace-nowrap">We in</div>
          <img src="images/jeon.png" className="w-[7rem] h-[5rem]" alt="Logo" />
        </div>
        <div className="mb-7">
          <input
            id="name"
            type="text"
            value={username}
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요."
            className="w-[100%] px-3 py-1 mx-auto text-lg transform border border-gray-300 rounded mb-10 text-center placeholder-gray-500"
          />
          <select
            id="age"
            value={year}
            onChange={handleYearChange}
            className={`w-[90%] px-3 py-1 mx-auto text-lg transform border border-gray-300 rounded text-center appearance-none ${
              year === '' ? 'text-gray-500' : 'text-black'
            }`}
          >
            <option value="" className="text-gray-500">출생년도를 선택해주세요.</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            className="text-black bg-cover w-[80%] h-[3rem] mt-10"
            onClick={handleClick}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
