import { useGreatPersonStore } from '../store';
import ArrowBack from '../assets/arrow_back.png';

interface GreatQuizPageLeftProps {
  movePage: (pageNumber: number) => void;
}

const GreatQuizPageLeft: React.FC<GreatQuizPageLeftProps> = ({ movePage }) => {
  const { name, front_url, puzzle_cnt } = useGreatPersonStore();

  // 퍼즐 조각의 개수에 따라 올바른 이미지를 선택합니다.
  const getImageUrl = (baseImageUrl: string, puzzleCount: number) => {
    const base = baseImageUrl.slice(0, baseImageUrl.lastIndexOf('.'));
    const extension = baseImageUrl.slice(baseImageUrl.lastIndexOf('.'));
    return puzzleCount > 0 ? `${base}${puzzleCount}${extension}` : baseImageUrl;
  };

  const imageUrl = getImageUrl(front_url, puzzle_cnt);
  console.log('Name:', name);
  console.log('Base URL:', front_url);
  console.log('Puzzle Count:', puzzle_cnt);
  console.log('Image URL:', imageUrl);

  return (
    <>
      <div className="mb-[60px]">
        <div
          className="absolute top-[350px] left-[40px] cursor-pointer"
          onClick={() => {
            movePage(7);
          }}
        >
          <img src={ArrowBack} alt="인물 페이지로 다시 가기" className="h-12 w-17" />
        </div>
        <div className="relative flex flex-col items-center">
          <div className="text-[35px]">{`${name}에 대해 어디까지 아니?`}</div>
          {name === '이순신' ? (
            <div className="relative w-56 mt-10">
              <img src={imageUrl} alt="이순신 실루엣" className="w-full h-auto" />
            </div>
          ) : (
            <img src={imageUrl} alt="인물 사진" className="w-56 mt-10" />
          )}
        </div>
      </div>
    </>
  );
};

export default GreatQuizPageLeft;
