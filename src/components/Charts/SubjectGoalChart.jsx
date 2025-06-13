import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SubjectGoalChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Your Score',
        data: [
          {
            x: 'Mathematics',
            y: 86,
            goals: [
              {
                name: 'Target Score',
                value: 90,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'Physics',
            y: 78,
            goals: [
              {
                name: 'Target Score',
                value: 45,
                strokeHeight: 5,
                strokeColor: '#775DD0',
                strokeWidth:20,
                
              }
            ]
          },
          {
            x: 'Chemistry',
            y: 60,
            goals: [
              {
                name: 'Target Score',
                value: 75,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          }
        ]
      }
    ],

    options: {
      chart: {
        height: 450,
        type: 'bar',
        toolbar: {
          show: false
        },
        fontFamily: 'Roboto, Arial, sans-serif',
        background: 'transparent'
      },

      plotOptions: {
        bar: {
          columnWidth: '60%',
          borderRadius: 5,
          endingShape: 'flat',
          horizontal: false
        }
      },
      colors: ['#A7C5EB'],
      stroke: {
        show: false
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        },
        style: {
          fontSize: '12px',
          colors: ['#333']
        },
        offsetY: -20
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['Your Score', 'Target Score'],
        markers: {
          fillColors: ['#A7C5EB', '#775DD0']
        },
        position: 'bottom',
        horizontalAlign: 'center'
      },
      title: {
        text: '',
        align: 'left'
      },
      xaxis: {
        labels: {
          style: {
            colors: '#333',
            fontSize: '12px',
            fontWeight: 500
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        max: 100,
        show: false,
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      grid: {
        show: false,
        padding: {
          top: 1
        },
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      tooltip: {
        shared: false,
        intersect: true,
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      }
    }
  });

  useEffect(() => {
    if (data) {
      // Transform custom data to match the expected format
      const transformedData = {
        series: [
          {
            name: 'Your Score',
            data: data.map(item => ({
              x: item.subject,
              y: item.actual,
              goals: [
                {
                  name: 'Target Score',
                  value: item.expected,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            }))
          }
        ]
      };
      
      setChartData(prev => ({
        ...prev,
        series: transformedData.series
      }));
    }
  }, [data]);

  return (
    <div id="chart" style={{ width: '100%', height: '100%' }}>
      <ReactApexChart 
        options={chartData.options} 
        series={chartData.series} 
        type="bar" 
        height={380} 
        width="100%"
      />
    </div>
  );
};

export default SubjectGoalChart;
