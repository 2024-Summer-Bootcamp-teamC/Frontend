import PuzzleWhite from '../assets/images/Puzzle.png';
import PuzzleEmpty from '../assets/images/PuzzleEmpty.png';
import axios, { AxiosResponse } from 'axios';

interface UpdateResult {
  correct_cnt: number;
  title: string;
}

interface UpdateQuizzesRequest {
  userId: number;
  storyId: string;
}

const updateQuizzes = async (request: UpdateQuizzesRequest): Promise<UpdateResult> => {
  const { userId, storyId } = request;
  const url = `http://localhost:8000/quizzes/${storyId}/puzzles/`;

  try {
    const response: AxiosResponse<UpdateResult> = await axios.put(url, null, {
      params: { user_id: userId },
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update quizzes: ${error}`);
  }
};

export default updateQuizzes;


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
