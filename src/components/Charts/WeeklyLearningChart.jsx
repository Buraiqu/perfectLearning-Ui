import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const WeeklyLearningChart = ({ data, seriesConfig, yAxisConfig }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    // Use provided series config or default
    const seriesSettings = seriesConfig;

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
        paddingLeft: 0,
        paddingRight: 0
      })
    );

    // Create axes
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "period",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    // Hide x-axis labels as we have custom labels below the chart
    xAxis.get("renderer").labels.template.set("visible", false);

    // Remove x-axis grid lines
    xAxis.get("renderer").grid.template.set("visible", false);

    xAxis.data.setAll(data);

    // Use provided y-axis config or default
    const yAxisSettings = yAxisConfig || {
      min: 0,
      max: 5,
      suffix: " Hr",
      strictMinMax: true
    };

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: yAxisSettings.min,
        max: yAxisSettings.max,
        strictMinMax: yAxisSettings.strictMinMax !== false,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Customize y-axis labels
    yAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
      fill: am5.color("#888888"),
      paddingRight: 10
    });

    // Add suffix to y-axis labels if provided
    if (yAxisSettings.suffix) {
      yAxis.get("renderer").labels.template.adapters.add("text", (text) => {
        return text + yAxisSettings.suffix;
      });
    }
    
    // Add custom formatter if provided
    if (yAxisSettings.formatter) {
      yAxis.get("renderer").labels.template.adapters.add("text", (text) => {
        return yAxisSettings.formatter(text);
      });
    }

    // Style y-axis grid lines as light dashed lines
    yAxis.get("renderer").grid.template.setAll({
      stroke: am5.color("#DDDDDD"),
      strokeDasharray: [2, 2],
      strokeOpacity: 0.7,
      visible: true
    });

    // Create series dynamically based on configuration
    const allSeries = [];
    
    seriesSettings.forEach(series => {
      const newSeries = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: series.name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: series.field,
          categoryXField: "period",
          stroke: am5.color(series.color),
          fill: am5.color(series.color),
          tooltip: am5.Tooltip.new(root, {
            labelText: "{name}: {valueY} Hr"
          }),
          connect: true
        })
      );

      newSeries.strokes.template.setAll({
        strokeWidth: 3,
        cornerRadius: series.cornerRadius || 5
      });
      
      // Set data
      newSeries.data.setAll(data);
      
      // Store for animation
      allSeries.push(newSeries);
    });

    // Make stuff animate on load
    allSeries.forEach(series => series.appear(1000));
    chart.appear(1000, 100);

    // Clean up on unmount
    return () => {
      root.dispose();
    };
  }, [data, seriesConfig]);

  return <div ref={chartRef} style={{ width: '100%', height: '350px' }} />;
};

export default WeeklyLearningChart;
