import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useGreatListStore, useParamStore, useUserIdStore, useCardStore } from '../store';
import axios from 'axios';

const geoUrl = '../../public/features.json';

interface MarkerType {
  markerOffset: number;
  name: string;
  coordinates: [number, number];
}

const markers: MarkerType[] = [
  {
    markerOffset: -35,
    name: '한국',
    coordinates: [126.978, 37.5665],
  },
  { markerOffset: -35, name: '미국', coordinates: [-100.0369, 38.9072] },
  { markerOffset: 15, name: '프랑스', coordinates: [5, 45] },
  { markerOffset: -35, name: '네덜란드', coordinates: [5.3, 52.15] },
  { markerOffset: 15, name: '독일', coordinates: [13.405, 52.52] },
];

interface MapPageProps {
  part: string;
  move: (pageNum: number) => void;
}

const MapPage: React.FC<MapPageProps> = ({ part, move }) => {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const { setParam, setField } = useParamStore();
  const { setShowGreatList } = useGreatListStore();
  const [rectWidth, setRectWidth] = useState<number>(0);
  const { userId } = useUserIdStore();
  const { setCards } = useCardStore();
  const textRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setRectWidth(bbox.width + 20); // 여백을 추가하여 너비 조정
    }
  }, [hoveredMarker]);

  const handleMarkerClick = useCallback(
    (e: React.MouseEvent<SVGElement, MouseEvent>, markerName: string) => {
      e.preventDefault(); // 브라우저 기본 동작 방지
      e.stopPropagation(); // 이벤트 전파 방지

      const fetchData = async () => {
        const response = await axios.get(`/api/greats/${userId}/`, {
          params: { nation: markerName },
        });

        setCards(response.data);
      };
      fetchData();

      console.log(markerName);
      setTimeout(() => {
        move(5);
      }, 100);
    },
    [move, setParam, setField, setShowGreatList, userId, setCards],
  );

  const handleMarkerMouseEnter = (markerName: string) => setHoveredMarker(markerName);
  const handleMarkerMouseLeave = () => setHoveredMarker(null);

  const containerStyle = {
    display: 'flex',
    justifyContent: part === 'right' ? 'flex-end' : part === 'left' ? 'flex-start' : 'center',
    overflow: 'hidden',
    width: '200%',
    transform: part === 'right' ? 'translateX(-50%)' : part === 'left' ? 'translateX(0)' : 'none',
    marginTop: '20px',
    translate: '-[8.5%]',
  };

  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex items-center justify-center" style={containerStyle} onClick={preventDefault}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 110 }}
        style={{ width: '100%', height: '100vh', userSelect: 'none' }} // 텍스트 선택 방지 스타일 추가
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="outline-none hover:outline-none active:outline-none"
                style={{
                  default: { fill: '#594637', outline: 'none' },
                  hover: { fill: '#594637', outline: 'none' }, // hover 상태에서도 기본 색상 유지
                  pressed: { fill: '#594637', outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker
            key={name}
            coordinates={coordinates}
            onMouseEnter={() => handleMarkerMouseEnter(name)}
            onMouseLeave={handleMarkerMouseLeave}
            onClick={(e) => handleMarkerClick(e, name)}
          >
            <g
              fill="rgba(255,0,0,0.3)"
              stroke="rgba(255,0,0,1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
              className="cursor-pointer"
            >
              <circle cx="12" cy="10" r="5" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            {hoveredMarker === name && (
              <g>
                <rect
                  x={15 - rectWidth / 2} // 사각형의 x 좌표를 텍스트의 중앙에 맞추기 위해 조정
                  y={markerOffset - 10} // 사각형의 y 위치 조정
                  width={rectWidth} // 동적으로 조정된 너비
                  height="20" // 사각형의 높이
                  fill="rgba(255,255,255)" // 배경 색상
                  rx={5} // 둥근 모서리 반경
                  ry={5}
                />
                <text
                  ref={textRef} // 텍스트 요소의 참조 설정
                  textAnchor="middle" // 텍스트를 중앙에 배치
                  x={15} // 텍스트의 x 좌표를 사각형의 중앙에 맞추기
                  y={markerOffset + 5} // 텍스트의 y 좌표, 사각형의 중앙에 맞추기
                  style={{ fontFamily: 'font-songmyung', fill: '#000000', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                  {name}
                </text>
              </g>
            )}
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default MapPage;
