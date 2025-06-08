import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const DifficultyAccuracyChart = ({ data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    // Create root element
    const root = am5.Root.new(chartRef.current);
    root._logo.dispose();

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
        paddingRight: 0,
        layout: root.verticalLayout
      })
    );

    // Create axes - note we're creating a horizontal bar chart, so X and Y are flipped
    const yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    });

    yRenderer.labels.template.setAll({
      fontSize: 12,
      fill: am5.color("#000000"),
      centerY: am5.p50,
      paddingRight: 10
    });

    yRenderer.grid.template.set("visible", false);

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "difficulty",
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    const xRenderer = am5xy.AxisRendererX.new(root, {});
    
    xRenderer.labels.template.setAll({
      forceHidden: true
    });

    xRenderer.grid.template.setAll({
      stroke: am5.color("#DDDDDD"),
      strokeDasharray: [2, 2],
      strokeOpacity: 0.7
    });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        strictMinMax: true,
        renderer: xRenderer,
        numberFormat: "#'%'"
      })
    );

    // Add series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Accuracy",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "accuracy",
        categoryYField: "difficulty",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}%"
        })
      })
    );

    series.columns.template.setAll({
      cornerRadiusTR: 4,
      cornerRadiusBR: 4,
      fill: am5.color("#A7C5EB"),
      height: am5.percent(50)
    });

    // Add labels at the end of bars
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX}%",
          fill: am5.color("#000000"),
          centerY: am5.p50,
          centerX: am5.p100,
          populateText: true,
          fontSize: 13,
          fontWeight: "600",
          dx: 10
        })
      });
    });

    // Set data
    const chartData = data || [
      { difficulty: "Easy", accuracy: 70 },
      { difficulty: "Medium", accuracy: 48 },
      { difficulty: "Hard", accuracy: 55 }
    ];

    yAxis.data.setAll(chartData);
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

export default DifficultyAccuracyChart;
