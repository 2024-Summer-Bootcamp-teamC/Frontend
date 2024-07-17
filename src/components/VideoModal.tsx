import React from 'react';
import YouTube, { YouTubeProps, YouTubeEvent } from 'react-youtube';
import { useGreatPersonStore } from '../store';

const VideoModal: React.FC = () => {
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1, // 자동 재생
      rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
      modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
    },
  };
  const { video_url } = useGreatPersonStore();

  const onReady = (event: YouTubeEvent) => {
    // 비디오가 준비되었을 때 원하는 동작을 추가할 수 있습니다.
    event.target.pauseVideo();
  };

  return <YouTube videoId={video_url} opts={opts} onReady={onReady} />;
};

export default VideoModal;
