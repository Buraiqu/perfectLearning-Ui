import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const WeeklyAccuracyChart = ({ data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    // Create root element
    const root = am5.Root.new(chartRef.current);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 0
      })
    );

    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30
    });

    xRenderer.labels.template.setAll({
      fontSize: 10,
      fill: am5.color("#888888"),
      rotation: 0,
      centerY: am5.p100,
      centerX: am5.p50
    });

    xRenderer.grid.template.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "period",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    
    yRenderer.labels.template.setAll({
      fontSize: 10,
      fill: am5.color("#888888")
    });

    yRenderer.grid.template.setAll({
      stroke: am5.color("#DDDDDD"),
      strokeDasharray: [2, 2],
      strokeOpacity: 0.7
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        strictMinMax: true,
        renderer: yRenderer
      })
    );

    // Add series
    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Accuracy",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "period",
        stroke: am5.color("#0066CC"),
        fill: am5.color("#0066CC"),
        tension: 0.7, // Controls the curve smoothness - lower value for more subtle curves
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}%"
        })
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 3
    });

    // No bullets to match the image
    // series.bullets.push(function() {
    //   return am5.Bullet.new(root, {
    //     sprite: am5.Circle.new(root, {
    //       radius: 5,
    //       fill: am5.color("#0066CC"),
    //       stroke: am5.color("#FFFFFF"),
    //       strokeWidth: 2
    //     })
    //   });
    // });

    // Set data
    const chartData = [
      { period: "15 Aug -\n22 Aug", value: 35 },
      { period: "23 Aug -\n30 Aug", value: 25 },
      { period: "29 Aug -\n6 Sep", value: 75 },
      { period: "31 Aug -\n6 Sep", value: 55 },
      { period: "7 Sep -\n14 Sep", value: 55 },
      { period: "15 Sep -\n22 Sep", value: 35 }
    ];

    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    // Clean up on unmount
    return () => {
      root.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default WeeklyAccuracyChart;
