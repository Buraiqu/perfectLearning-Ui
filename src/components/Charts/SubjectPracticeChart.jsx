import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const SubjectPracticeChart = ({ data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    // Initialize chart instance
    const root = am5.Root.new(chartRef.current);

    // Remove logo
    if (root._logo) {
      root._logo.dispose();
    }

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 50,
        layout: root.verticalLayout
      })
    );

    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, { 
      minGridDistance: 50,
      cellStartLocation: 0.1,
      cellEndLocation: 0.7,
      minorGridEnabled: false
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "period",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    // Configure x-axis labels to appear at the bottom
    xRenderer.labels.template.setAll({
      fontSize: 11,
      fill: am5.color("#888888"),
      rotation: 0,
      centerY: am5.p100,
      centerX: am5.p50,
      visible: true
    });

    // Use a custom adapter for precise label positioning
    xRenderer.labels.template.adapters.add("dx", function(dx, target) {
      // Apply an offset to align with the center of the bar group
      return -15;
    });

    // Remove x-axis grid lines
    xRenderer.grid.template.set("visible", false);

    xAxis.data.setAll(data);

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 50, // Set max value to match the image
        strictMinMax: true,
        renderer: yRenderer
      })
    );

    // Remove y-axis labels
    yRenderer.labels.template.set("visible", false);

    // Style y-axis grid lines as light dashed lines
    yRenderer.grid.template.setAll({
      stroke: am5.color("#DDDDDD"),
      strokeDasharray: [2, 2],
      strokeOpacity: 0.7,
      visible: true
    });

    // Define subject colors based on the image
    const colors = {
      mathematics: "#94b4d4", // Light blue
      physics: "#f4b183",     // Peach/orange
      chemistry: "#8dd3f7"    // Sky blue
    };

    // Create a series for each subject
    const createSeries = (name, field, color) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: "period",
          clustered: true,
          tooltip: am5.Tooltip.new(root, {
            labelText: "{name}: {valueY}"
          })
        })
      );

      series.columns.template.setAll({
        width: am5.percent(100),
        tooltipText: "{name}: {valueY}",
        strokeOpacity: 0,
        fill: am5.color(color),
        cornerRadiusTopLeft: 0,
        cornerRadiusTopRight: 0
      });

      // Add value labels on top of bars
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: am5.color("#000000"),
            centerX: am5.p50,
            centerY: 0,
            populateText: true,
            fontSize: 12,
            dy: -5
          })
        });
      });

      series.data.setAll(data);
      series.appear();

      return series;
    };

    // Create series for each subject
    createSeries("Mathematics", "mathematics", colors.mathematics);
    createSeries("Physics", "physics", colors.physics);
    createSeries("Chemistry", "chemistry", colors.chemistry);

    // No legend needed as it's added in the parent component

    // Make stuff animate on load
    chart.appear(1000, 100);

    // Clean up on unmount
    return () => {
      root.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default SubjectPracticeChart;
