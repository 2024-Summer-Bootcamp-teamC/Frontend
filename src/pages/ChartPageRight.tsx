import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { useTriggerChartStore } from '../store';

Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: 'Song Myung, sans-serif',
      fontWeight: '500', // Tailwind의 font-medium에 해당
    },
  },
  title: {
    style: {
      fontFamily: 'Song Myung, sans-serif',
      fontWeight: '500', // Tailwind의 font-medium에 해당
    },
  },
  subtitle: {
    style: {
      fontFamily: 'Song Myung, sans-serif',
      fontWeight: '500', // Tailwind의 font-medium에 해당
    },
  },
  xAxis: {
    labels: {
      style: {
        fontFamily: 'Song Myung, sans-serif',
        fontWeight: '500', // Tailwind의 font-medium에 해당
      },
    },
    title: {
      style: {
        fontFamily: 'Song Myung, sans-serif',
        fontWeight: '500', // Tailwind의 font-medium에 해당
      },
    },
  },
  yAxis: {
    labels: {
      style: {
        fontFamily: 'Song Myung, sans-serif',
        fontWeight: '500', // Tailwind의 font-medium에 해당
      },
    },
    title: {
      style: {
        fontFamily: 'Song Myung, sans-serif',
        fontWeight: '500', // Tailwind의 font-medium에 해당
      },
    },
  },
  tooltip: {
    style: {
      fontFamily: 'Song Myung, sans-serif',
      fontWeight: '500', // Tailwind의 font-medium에 해당
    },
  },
  legend: {
    itemStyle: {
      fontFamily: 'Song Myung, sans-serif',
      fontWeight: '500', // Tailwind의 font-medium에 해당
    },
  },
  plotOptions: {
    series: {
      dataLabels: {
        style: {
          textOutline: 'none',
        },
      },
    },
  },
});

interface CorrectRateData {
  name: string;
  correct_rate: string;
}

const ChartPageRight: React.FC = () => {
  const [correctRateData, setCorrectRateData] = useState<CorrectRateData[]>([]);
  const { count } = useTriggerChartStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get('/api/dashboard/correct-rate/');
        const filteredData = response2.data.filter(
          (item: CorrectRateData) => item.name !== null && item.correct_rate !== null,
        );
        setCorrectRateData(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [count]);

  const accuracyCategories = correctRateData.map((item) => item.name);
  const accuracyData = correctRateData.map((item) => parseFloat(item.correct_rate));

  const accuracyOptions = {
    credits: {
      text: '',
    },
    title: {
      text: '위인별 정답률',
    },
    chart: {
      type: 'column', // 막대 그래프를 위해 'column'으로 설정
      height: 600,
      backgroundColor: 'rgba(255,255,255,0)',
    },
    xAxis: {
      title: {
        text: '위인',
      },
      categories: accuracyCategories,
    },
    yAxis: {
      title: {
        text: '정답률 (%)',
      },
      gridLineColor: '#000000',
      min: 0, // y축의 최소값 설정
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br />',
      pointFormat: '{point.y}% correct',
    },
    series: [
      {
        name: '정답률',
        data: accuracyData,
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

  return (
    <>
      <div className="w-[90%] ml-[3%] mt-[15%]">
        <HighchartsReact highcharts={Highcharts} options={accuracyOptions} />
      </div>
    </>
  );
};

export default ChartPageRight;
