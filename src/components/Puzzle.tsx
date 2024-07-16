import PuzzleWhite from '../assets/images/Puzzle.png';
import PuzzleEmpty from '../assets/images/PuzzleEmpty.png';

const Puzzle = () => {
  return (
    <div className="flex flex-row space-x-[5px]">
      {' '}
      {/* span으로 그룹화 ! */}
      <span>
        <img src={PuzzleWhite} />
      </span>
      <span>
        <img src={PuzzleWhite} />
      </span>
      <span>
        <img src={PuzzleEmpty} />
      </span>
      <span>
        <img src={PuzzleEmpty} />
      </span>
    </div>
  );
};

export default Puzzle;
