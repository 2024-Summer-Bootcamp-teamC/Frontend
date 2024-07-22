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

interface AgeData {
  age: string;
  visit_total: string;
}

interface CorrectRateData {
  name: string;
  correct_rate: string;
}

const ChartPageRight: React.FC = () => {
  const [ageData, setAgeData] = useState<AgeData[]>([]);
  const [correctRateData, setCorrectRateData] = useState<CorrectRateData[]>([]);
  const { count } = useTriggerChartStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard/age-visits/');
        setAgeData(response.data.filter((item: AgeData) => parseInt(item.age) > 0)); // 나이가 0보다 큰 데이터만 사용
        console.log(ageData);
        const response2 = await axios.get('/api/dashboard/correct-rate/');
        setCorrectRateData(response2.data);
        console.log(correctRateData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [count]);

  const categories = ageData.map((item) => item.age);
  const data = ageData.map((item) => parseInt(item.visit_total, 10));
  const accuracyCategories = correctRateData.map((item) => item.name);
  const accuracyData = correctRateData.map((item) => parseFloat(item.correct_rate));

  const options = {
    credits: {
      text: '',
    },
    title: {
      text: '가입자 나이',
    },
    chart: {
      height: 270,
      backgroundColor: 'rgba(255,255,255,0)',
    },
    accessibility: {
      point: {
        valueDescriptionFormat: '{xDescription}{separator}{value} 명',
      },
    },

    xAxis: {
      title: {
        text: '나이',
      },
      categories: categories,
    },

    yAxis: {
      title: {
        text: '인원 (명)',
      },
      gridLineColor: '#000000',
    },

    tooltip: {
      headerFormat: '<b>{series.name}</b><br />',
      pointFormat: '{point.y} 명',
    },

    series: [
      {
        name: '인원',
        data: data,
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

  const accuracyOptions = {
    credits: {
      text: '',
    },
    title: {
      text: '위인별 정답률',
    },
    chart: {
      height: 270,
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
        <div className="">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <div className="mt-[3%]">
          <HighchartsReact highcharts={Highcharts} options={accuracyOptions} />
        </div>
      </div>
    </>
  );
};

export default ChartPageRight;
