import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const TopicWiseAccuracyChart = ({ data }) => {
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
        paddingRight: 30, // Add padding to accommodate labels outside bars
        layout: root.verticalLayout
      })
    );

    // Create axes - note we're creating a horizontal bar chart, so X and Y are flipped
    const yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 0, // Minimize grid distance
      cellStartLocation: 0,
      cellEndLocation: 1
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
        categoryField: "topic",
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
        categoryYField: "topic",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}%"
        })
      })
    );

    // Set different colors based on subject type
    series.columns.template.adapters.add("fill", function(fill, target) {
      const dataItem = target.dataItem;
      if (dataItem) {
        switch(dataItem.dataContext.subject) {
          case "Mathematics":
            return am5.color("#FF9999"); // Light pink
          case "Physics":
            return am5.color("#FFCC99"); // Light orange
          case "Chemistry":
            return am5.color("#99CCFF"); // Light blue
          default:
            return am5.color("#A7C5EB"); // Default blue
        }
      }
      return fill;
    });

    series.columns.template.setAll({
      cornerRadiusTR: 0, // Remove corner radius to match image
      cornerRadiusBR: 0, // Remove corner radius to match image
      height: am5.percent(100), // Fill the entire height to remove gaps
      strokeOpacity: 0 // Remove border
    });

    // Add labels at the end of bars
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueX}%",
          fill: am5.color("#000000"),
          centerY: am5.p50,
          centerX: am5.p0,
          populateText: true,
          fontSize: 14,
          fontWeight: "bold",
          dx: 5 // Position label just outside the bar
        })
      });
    });

    // Legend is now handled in the parent component

    // Set data
    const defaultData = [
      { topic: "Topic 1 Name", accuracy: 45, subject: "Mathematics" },
      { topic: "Topic 2 Name", accuracy: 48, subject: "Physics" },
      { topic: "Topic 3 Name", accuracy: 50, subject: "Chemistry" },
      { topic: "Topic 4 Name", accuracy: 52, subject: "Mathematics" },
      { topic: "Topic 5 Name", accuracy: 55, subject: "Chemistry" },
      { topic: "Topic 6 Name", accuracy: 60, subject: "Mathematics" },
      { topic: "Topic 7 Name", accuracy: 66.67, subject: "Physics" }
    ];

    const chartData = data || defaultData;

    yAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    // Disable animations to match the static image
    series.appear(0);
    chart.appear(0, 0);

    // Clean up on unmount
    return () => {
      root.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default TopicWiseAccuracyChart;
