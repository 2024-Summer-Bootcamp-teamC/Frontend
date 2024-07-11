import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  title: {
    text: 'Growth of Internet Users Worldwide (logarithmic scale)',
  },
  chart: {
    height: 270,
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

const ChartPageLeft: React.FC = () => {
  const pieOptions = {
    chart: {
      type: 'pie',
      height: '270',
    },
    title: {
      text: 'Egg Yolk Composition',
    },
    tooltip: {
      valueSuffix: '%',
    },
    subtitle: {
      text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>',
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
        data: [
          {
            name: 'Water',
            y: 55.02,
          },
          {
            name: 'Fat',
            sliced: true,
            selected: true,
            y: 26.71,
          },
          {
            name: 'Carbohydrates',
            y: 1.09,
          },
          {
            name: 'Protein',
            y: 15.5,
          },
          {
            name: 'Ash',
            y: 1.68,
          },
        ],
      },
    ],
  };
  return (
    <>
      <div className="w-[90%] ml-[7%] mt-[3%]">
        <div className="text-[3rem]  ">차트</div>

        <div className="">
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
