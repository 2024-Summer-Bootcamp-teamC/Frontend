import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = '../../public/features.json';

const markers = [
  {
    markerOffset: -30,
    name: '대한민국',
    coordinates: [126.978, 37.5665],
  },
  { markerOffset: -30, name: '미국', coordinates: [-100.0369, 38.9072] },
  { markerOffset: 15, name: '프랑스', coordinates: [5, 45] },
  { markerOffset: 15, name: '독일', coordinates: [13.405, 52.52] },
];

interface MapPageProps {
  part: string;
}

const MapPage: React.FC<MapPageProps> = ({ part }) => {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  const handleMarkerMouseEnter = (markerName: string) => {
    setHoveredMarker(markerName);
  };

  const handleMarkerMouseLeave = () => {
    setHoveredMarker(null);
  };

  // part가 'right'일 때 오른쪽으로, 'left'일 때 왼쪽으로 이동시킬 스타일 설정
  const containerStyle = {
    display: 'flex',
    justifyContent: part === 'right' ? 'flex-end' : part === 'left' ? 'flex-start' : 'center',
    overflow: 'hidden',
    width: '200%', // 넓은 영역을 가지도록 설정
    transform: part === 'right' ? 'translateX(-50%)' : part === 'left' ? 'translateX(0)' : 'none', // 오른쪽 또는 왼쪽으로 이동
    marginTop: '20px',
    translate: '-[8.5%]',
  };

  return (
    <div className="flex items-center justify-center" style={containerStyle}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 110,
        }}
        style={{ width: '100%', height: '100vh' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#594637" />)}
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker
            key={name}
            coordinates={coordinates}
            onMouseEnter={() => handleMarkerMouseEnter(name)}
            onMouseLeave={handleMarkerMouseLeave}
          >
            <g
              fill="rgba(255,255,255,0)"
              stroke="#cacaca"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            {hoveredMarker === name && (
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: 'font-songmyung', fill: '#ffffff', fontSize: '0.8rem' }}
              >
                {name}
              </text>
            )}
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default MapPage;
