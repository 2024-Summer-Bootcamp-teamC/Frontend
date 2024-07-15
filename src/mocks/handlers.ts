// src/mocks/handlers.ts

import { http, HttpResponse } from 'msw';

type paramsNone = {};

type GreatGetParams = {
  user_id: string;
  story_id: string;
  param: string;
};

type AddCommentResponseBody = {
  status: number;
  message: string;
};

type UserGetPrams = {
  user_id: number;
  correct_cnt: number;
};

interface User {
  id: number;
  name: string;
  year: number;
}

interface Great {
  id: number;
  name: string;
  silhouette_url: string;
  photo_url: string;
  saying: string;
  nation: string;
  field: string;
  access_cnt: number;
  video_url: string;
  gender: string;
  life: string;
}

interface Quiz {
  id: number;
  story_id: number;
  question: string;
  answer: string;
  explanation: string;
}

type Result = {
  id: number;
  story_id: number;
  user_id: number;
  puzzle_cnt: number;
  correct_cnt: number;
};
interface UserResponseBody {
  userID: number;
  username: string;
}
const users: User[] = [{ id: 1, name: '김진용', year: 1900 }];

const greats: Great[] = [
  {
    id: 1,
    name: '세종대왕',
    silhouette_url: '',
    photo_url: 'https://S3',
    saying: '한글 창제자',
    nation: '한국',
    field: '정치',
    access_cnt: 3,
    video_url: 'https://S3',
    gender: '남',
    life: '1897-08-11 ~ 1950-04-23',
  },
  {
    id: 2,
    name: '최호',
    silhouette_url: '',
    photo_url: 'https://S3',
    saying: '한글 창제자',
    nation: '독일',
    field: '경제',
    access_cnt: 3,
    video_url: 'https://S3',
    gender: '남',
    life: '1897-08-11 ~ 1950-04-23',
  },
  {
    id: 3,
    name: '김진용',
    silhouette_url: '',
    photo_url: 'https://S3',
    saying: '한글 창제자',
    nation: '미국',
    field: '정치',
    access_cnt: 3,
    video_url: 'https://S3',
    gender: '남',
    life: '1897-08-11 ~ 1950-04-23',
  },
];

const quizzes: Quiz[] = [
  {
    id: 1,
    story_id: 1,
    question: '세종대왕의 업적이 아닌 것은?',
    answer: '1. 조선 건국 \n 2. 훈민정음 창제 \n 3. 테커 개최 \n 4. 연세우유크림빵 개발',
    explanation: '세종대왕은 훈민정음을 창제함',
  },
];

const result: Result[] = [
  {
    id: 1,
    story_id: 1,
    user_id: 1,
    puzzle_cnt: 2,
    correct_cnt: 13,
  },
];

export const handlers = [
  // 사용자 정보 입력하기
  http.post<paramsNone, User, UserResponseBody, '/users'>('/users', async ({ request }) => {
    const newUser = await request.json();
    newUser.id = users.length + 1;
    users.push(newUser);
    console.log(users);
    return HttpResponse.json({
      userID: newUser.id,
      username: newUser.name,
    });
  }),
  // 위인 전체 리스트 불러오기, 선택한 분야의 위인 목록 불러오기
  http.get<GreatGetParams, Great, Great[], '/greats/:user_id'>('/greats/:user_id', ({ params }) => {
    const { user_id } = params;
    const user = users.find((user) => user.id === Number(user_id));
    console.log(greats);
    if (user) {
      return HttpResponse.json(greats);
    } else {
      return HttpResponse.json();
    }
  }),
  http.get<GreatGetParams, Great, Great[] | AddCommentResponseBody, '/greats/:user_id/:param'>(
    '/greats/:user_id/:param',
    ({ params }) => {
      const { param, user_id } = params;

      const user = users.find((user) => user.id === Number(user_id));
      const filterGreat = greats.filter((great) => great.field === param || great.nation === param);

      if (user) {
        if (filterGreat) {
          return HttpResponse.json(filterGreat);
        } else {
          return HttpResponse.json({ status: 404, message: '위인 없음' });
        }
      } else {
        return HttpResponse.json({ status: 404, message: '사용자 없음' });
      }
    },
  ),
  http.get<GreatGetParams, Great, Great | AddCommentResponseBody, '/greats/:user_id/:story_id'>(
    '/greats/:user_id/:story_id',
    ({ params }) => {
      const { user_id, story_id } = params;
      const story = greats.find((great) => great.id === Number(story_id));
      if (user_id) {
        if (story) {
          return HttpResponse.json(story);
        } else {
          return HttpResponse.json({ status: 404, message: '위인 없음' });
        }
      } else {
        return HttpResponse.json({ status: 404, message: '사용자 없음' });
      }
    },
  ),
  // 퀴즈 퍼즐 저장하기
  // id: number;
  // story_id: number;
  // user_id: number;
  // puzzle_cnt: number;
  // correct_cnt: number;
  http.put<GreatGetParams, UserGetPrams, AddCommentResponseBody, '/greats/:story_id/puzzles'>(
    '/greats/:story_id/puzzles',
    async ({ params, request }) => {
      const { story_id } = params;
      const { user_id, correct_cnt } = await request.json();

      const puzzleData = result.find((re) => re.story_id === Number(story_id) || re.user_id === user_id);

      const response: Result = {
        id: result.length + 1,
        story_id: Number(story_id),
        user_id: user_id,
        correct_cnt: correct_cnt,
        puzzle_cnt: (puzzleData?.puzzle_cnt ?? 0) + 1,
      };

      result.push(response);

      if (puzzleData) {
        return HttpResponse.json({ status: 201, message: 'good' });
      } else {
        return HttpResponse.json({ status: 404, message: 'bad' });
      }
    },
  ),
  // 퀴즈 불러오기
  http.get<GreatGetParams, Result, Quiz | AddCommentResponseBody, '/quizzes/:user_id/:story_id'>(
    '/quizzes/:user_id/:story_id',
    ({ params }) => {
      const { user_id, story_id } = params;
      const user = users.find((user) => user.id === Number(user_id));
      const quiz = quizzes.find((quiz) => quiz.story_id === Number(story_id));

      if (user) {
        if (quiz) {
          return HttpResponse.json(quiz);
        } else {
          return HttpResponse.json({ status: 404, message: '위인 없음' });
        }
      } else {
        return HttpResponse.json({ status: 404, message: '사용자 없음' });
      }
    },
  ),
];
