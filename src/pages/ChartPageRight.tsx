import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

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

const options = {
  title: {
    text: 'Growth of Internet Users Worldwide (logarithmic scale)',
  },
  chart: {
    height: 270,
    backgroundColor: 'rgba(255,255,255,0)',
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
    gridLineColor: '#000000',
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

const ChartPageRight: React.FC = () => {
  // 정답률 그려주는 옵션
  const accuracyOptions = {
    title: {
      text: 'Monthly Average Temperature',
    },
    chart: {
      height: 270,
      backgroundColor: 'rgba(255,255,255,0)',
    },
    subtitle: {
      text:
        'Source: ' +
        '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
        'target="_blank">Wikipedia.com</a>',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)',
      },
      gridLineColor: '#000000',
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: [
      {
        name: 'Reggane',
        data: [16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2, 22.0, 17.8],
      },
      {
        name: 'Tallinn',
        data: [-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5, 2.0, -0.9],
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
