import React from 'react';
import ChartVideoBackground from '../components/ChartVideoBackground';
import Clip from '../assets/images/Clip.png';
import Back from '../assets/images/Back.png';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const options = {
  title: {
    text: 'Growth of Internet Users Worldwide (logarithmic scale)',
  },
  chart: {
    height: 250,
  },
  accessibility: {
    point: {
      valueDescriptionFormat: '{xDescription}{separator}{value} million(s)',
    },
  },

  xAxis: {
    title: {
      text: 'Year',
    },
    categories: [1995, 2000, 2005, 2010, 2015, 2020, 2023],
  },

  yAxis: {
    type: 'logarithmic',
    title: {
      text: 'Number of Internet Users (in millions)',
    },
  },

  tooltip: {
    headerFormat: '<b>{series.name}</b><br />',
    pointFormat: '{point.y} million(s)',
  },

  series: [
    {
      name: 'Internet Users',
      keys: ['y', 'color'],
      data: [
        [16, '#0000ff'],
        [361, '#8d0073'],
        [1018, '#ba0046'],
        [2025, '#d60028'],
        [3192, '#eb0014'],
        [4673, '#fb0004'],
        [5200, '#ff0000'],
      ],
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 1,
          y2: 0,
        },
        stops: [
          [0, '#88634A'],
          [1, '#88634A'],
        ],
      },
    },
  ],
};

interface ChartPageProps {
  part: string;
}

const ChartPage: React.FC<ChartPageProps> = ({ part }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: part === 'right' ? 'flex-end' : part === 'left' ? 'flex-start' : 'center',
    width: '200%', // 넓은 영역을 가지도록 설정
    transform: part === 'right' ? 'translateX(-57%)' : part === 'left' ? 'translateX(-7%)' : 'none', // 오른쪽 또는 왼쪽으로 이동
    marginTop: '20px',
    translate: '-[8.5%]',
    height: '700px',
  };
  return (
    <>
      <div className="w-[90%] " style={containerStyle}>
        <div className="text-[3rem] ml-[10%] ">차트</div>

        <div className="grid grid-cols-3 gap-5 p-[3rem] h-[500px] mt-10 ">
          <div className="col-span-3">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <div className="">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <div className="">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <div className="">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartPage;
