// src/mocks/handlers.ts

import { rest, RestHandler } from 'msw';

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

interface Result {
  id: number;
  story_id: number;
  user_id: number;
  puzzle_cnt: number;
  correct_cnt: number;
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

const quiz: Quiz[] = [
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

export const handlers: RestHandler[] = [
  // 사용자 정보 입력하기
  rest.post<User>('/users', (req, res, ctx) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    return res(ctx.status(201), ctx.json(newUser));
  }),
  // 위인 전체 리스트 불러오기
  rest.get<Great[]>('/greats/:user_id', (req, res, ctx) => {
    const { user_id } = req.params;
    const user = users.find((user) => user.id === Number(user_id));
    if (user) {
      return res(ctx.status(201), ctx.json(greats));
    } else {
      return res(ctx.status(404));
    }
  }),
  // 선택한 분야의 위인 목록 불러오기
  rest.get<Great[]>('/greats', (req, res, ctx) => {
    const nation = req.url.searchParams.get('nation');
    const field = req.url.searchParams.get('field');

    let filteredGreats: Great[] = [];

    if (nation) {
      filteredGreats = greats.filter((great) => great.nation === nation);
    } else if (field) {
      filteredGreats = greats.filter((great) => great.field === field);
    }

    return res(ctx.status(200), ctx.json({ greats: filteredGreats }));
  }),
  // 선택한 위인 정보 불러오기
  rest.get<Great>('/greats/:user_id/:story_id', (req, res, ctx) => {
    const { user_id, story_id } = req.params;
    const story = greats.find((great) => great.id === Number(story_id));

    if (story) {
      return res(ctx.status(200), ctx.json(story));
    } else {
      return res(ctx.status(404));
    }
  }),
  // 퀴즈 퍼즐 저장하기
  // rest.post<Quiz>('/quizzes/:story_id/puzzles', (req, res, ctx) => {
  //   const { story_id } = req.params;
  //   const { puzzleData } = req.body;

  //   const response: Quiz = {
  //     id: quiz.length + 1,
  //     story_id: Number(story_id),
  //     ...puzzleData,
  //   };

  //   quiz.push(response);

  //   return res(ctx.status(201), ctx.json(response));
  // }),
  // 퀴즈 정보 가져오기
  rest.get<Quiz>('/quizzes/:story_id/', (req, res, ctx) => {
    const { story_id } = req.params;
    const story = quiz.find((quiz) => quiz.story_id === Number(story_id));

    if (story) {
      return res(ctx.status(200), ctx.json(story));
    } else {
      return res(ctx.status(404), ctx.json({ error: 'Story not found' }));
    }
  }),
];
