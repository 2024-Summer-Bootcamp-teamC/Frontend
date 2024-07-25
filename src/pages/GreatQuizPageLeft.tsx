import { useGreatPersonStore } from '../store';

const GreatQuizPageLeft = () => {
  const { name, front_url } = useGreatPersonStore();

  return (
    <div className="flex flex-col items-center">
      <div className="text-[35px]">{`${name}에 대해 어디까지 아니?`}</div>
      <img src={front_url} alt="인물 사진" className="w-56 mt-10" />
    </div>
  );
};

export default GreatQuizPageLeft;
