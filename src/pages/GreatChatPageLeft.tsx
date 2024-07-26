import { forwardRef, useImperativeHandle, useRef } from 'react';
import EmptyPuzzle from '../assets/images/EmptyPuzzle.png';
import FilledPuzzle from '../assets/images/Puzzle.png';
import ArrowBack from '../assets/arrow_back.png';
import Talking from '../assets/videos/talking.mp4';
import { useGreatPersonStore } from '../store';

interface GreatChatProps {
  movePage: (pageNumber: number) => void;
}

const GreatChatPageLeft = forwardRef<{ playVideo: () => void; pauseVideo: () => void }, GreatChatProps>(
  ({ movePage }, ref) => {
    const { name, puzzle_cnt, front_url } = useGreatPersonStore();
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      playVideo() {
        if (videoRef.current) {
          videoRef.current.play();
        }
      },
      pauseVideo() {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
    }));

    return (
      <>
        <div
          className="absolute top-[350px] left-[40px] cursor-pointer"
          onClick={() => {
            movePage(7);
          }}
        >
          <img src={ArrowBack} alt="인물 페이지로 다시 가기" className="h-12 w-17" />
        </div>
        <div className="flex flex-col items-center justify-center mb-[30px] ">
          <div className="flex">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src={index < puzzle_cnt ? FilledPuzzle : EmptyPuzzle}
                className="w-10 h-10 mx-1 mb-10"
                alt="퍼즐 조각"
              />
            ))}
          </div>
          {name==="이순신" ? (
              <video ref={videoRef} className="mb-1 w-[300px] h-[399.5px]  border-amber-800" loop muted>
              <source src={Talking} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            ): (
              <img src={front_url} className="mb-1 w-[300px] h-[399.5px]" alt="위인 사진" />
            )
          }
         <div className="text-[26px] mt-2">{name}</div>
        </div>
      </>
    );
  },
);

export default GreatChatPageLeft;
