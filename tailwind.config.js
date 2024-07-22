/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // 파일 경로를 프로젝트 구조에 맞게 수정
  theme: {
    extend: {
      backgroundImage: {
        'custom-background': "url('/images/background.png')",
      },
      fontFamily: {
        songmyung: ['Song Myung', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        fadeOut: 'fadeOut 1s ease-in-out',
        slideInFromLeft: 'slideInFromLeft 1s ease-in-out',
      },
      boxShadow: {
        'custom-left': '4px 0 6px rgba(0, 0, 0, 0.5)', // 왼쪽 그림자
        'custom-right': '-4px 0 6px rgba(0, 0, 0, 0.5)', // 오른쪽 그림자
      },
    },
  },
  plugins: [],
};
