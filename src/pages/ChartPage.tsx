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
    height: 300,
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

const ChartPage: React.FC = () => {
  return (
    <>
      <img src={Clip} className="fixed top-2 left-[4%]" alt="클립 이미지" />
      <div className="w-[90%]">
        <div className="text-[3rem] ml-[8%]">차트</div>
        <ChartVideoBackground>
          <div className="grid grid-cols-3 gap-2 p-[3rem]">
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
        </ChartVideoBackground>
      </div>
      <img src={Back} className="fixed bottom-0 left-0" alt="뒤로가기 이미지" />
    </>
  );
};

export default ChartPage;
