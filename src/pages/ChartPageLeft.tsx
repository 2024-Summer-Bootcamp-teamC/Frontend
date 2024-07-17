import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

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

const ChartPageLeft: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [pieData, setPieData] = useState<{ name: string; y: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('/api/dashboard/date-visits/');
        const categories = response1.data.map((item: any) => item.date);
        const data = response1.data.map((item: any) => parseInt(item.visit_total));
        setCategories(categories);
        setData(data);

        const response2 = await axios.get('/api/dashboard/chat-visits/');
        const pieData = response2.data.map((item: any) => ({
          name: item.name,
          y: parseInt(item.access_cnt),
        }));
        console.log(pieData);
        setPieData(pieData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const options = {
    title: {
      text: '날짜별 방문자 수',
    },
    chart: {
      height: 270,
      backgroundColor: 'rgba(255,255,255,0)',
    },
    accessibility: {
      point: {
        valueDescriptionFormat: '{xDescription}{separator}{value} visit(s)',
      },
    },

    xAxis: {
      title: {
        text: '날짜',
      },
      categories: categories,
    },

    yAxis: {
      title: {
        text: '방문자 수',
      },
      gridLineColor: '#000000',
    },

    tooltip: {
      headerFormat: '<b>{series.name}</b><br />',
      pointFormat: '{point.y} visit(s)',
    },

    series: [
      {
        name: '방문자 수',
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

  const pieOptions = {
    chart: {
      type: 'pie',
      height: '270',
      backgroundColor: 'rgba(255,255,255,0)',
    },
    title: {
      text: '대화창 접속수',
    },
    tooltip: {
      valueSuffix: '%',
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7,
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name: 'Percentage',
        colorByPoint: true,
        data: pieData,
        dataLabels: {
          style: {
            textOutline: 'none',
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="w-[90%] ml-[7%] mt-[3%]">
        <div className="text-[3rem]">차트</div>
        <div>
          <HighchartsReact highcharts={Highcharts} options={pieOptions} />
        </div>
        <div className="mt-[3%]">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </>
  );
};

export default ChartPageLeft;
