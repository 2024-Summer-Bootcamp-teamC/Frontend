import React from 'react';
import YouTube, { YouTubeProps, YouTubeEvent } from 'react-youtube';
import { useGreatPersonStore } from '../store';

const VideoModal: React.FC = () => {
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1, // 자동 재생
      rel: 0, // 관련 동영상 표시하지 않음
      modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
    },
  };

  const { information_url } = useGreatPersonStore();

  // 정보 URL이 존재하는지 확인하기 위해 콘솔에 로그 출력
  console.log('Information URL:', information_url);

  // information_url이 올바른 YouTube video ID인지 확인
  if (!information_url || typeof information_url !== 'string') {
    console.error('Invalid or missing information_url');
    return null;
  }

  const onReady = (event: YouTubeEvent) => {
    // 비디오가 준비되었을 때 원하는 동작을 추가할 수 있습니다.
    event.target.pauseVideo();
  };

  return (
    <YouTube
      videoId={information_url}
      opts={opts}
      onReady={onReady}
      onEnd={(e: YouTubeEvent) => {
        e.target.stopVideo(0);
      }}
    />
  );
};

export default VideoModal;
