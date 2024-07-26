import { useGreatPersonStore } from '../store';
import LssBlack from '../assets/images/LssBlack.png';
import Lss1 from '../assets/images/Lss1.png';
import Lss2 from '../assets/images/Lss2.png';
import Lss3 from '../assets/images/Lss3.png';
import Lss4 from '../assets/images/Lss4.png';

const GreatQuizPageLeft = () => {
  const { name, front_url, puzzle_cnt } = useGreatPersonStore();

  return (
    <div className="relative flex flex-col items-center">
      <div className="text-[35px]">{`${name}에 대해 어디까지 아니?`}</div>
      {name === "이순신" ? (
        <div className="relative w-56 mt-10">
          <img src={LssBlack} alt="이순신 실루엣" className="w-full h-auto" />
          {puzzle_cnt >= 1 && (
            <img src={Lss1} alt="이순신조각1" className="absolute top-0 left-0 w-1/2" />
          )}
          {puzzle_cnt >= 2 && (
            <img src={Lss2} alt="이순신조각2" className="absolute top-0 right-0 w-1/2" />
          )}
          {puzzle_cnt >= 3 && (
            <img src={Lss3} alt="이순신조각3" className="absolute bottom-0 left-0 w-1/2" />
          )}
          {puzzle_cnt >= 4 && (
            <img src={Lss4} alt="이순신조각4" className="absolute bottom-0 right-0 w-1/2" />
          )}
        </div>
      ) : (
        <img src={front_url} alt="인물 사진" className="w-56 mt-10" />
      )}
    </div>
  );
};

export default GreatQuizPageLeft;
