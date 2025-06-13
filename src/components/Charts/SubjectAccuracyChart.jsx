import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const SubjectAccuracyChart = ({ data }) => {
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
        paddingRight: 0,
        layout: root.verticalLayout
      })
    );

    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30
    });

    xRenderer.labels.template.setAll({
      fontSize: 12,
      fill: am5.color("#000000"),
      centerY: am5.p100,
      centerX: am5.p50
    });

    xRenderer.grid.template.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "subject",
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
        renderer: yRenderer,
        numberFormat: "#'%'"
      })
    );

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        y: am5.p100,
        marginTop: 15
      })
    );

    // Add user accuracy series
    const userSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Your Avg Accuracy",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "userAccuracy",
        categoryXField: "subject",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}%"
        })
      })
    );

    userSeries.columns.template.setAll({
      cornerRadiusTL: 4,
      cornerRadiusTR: 4,
      fill: am5.color("#A7C5EB"),
      width: am5.percent(70)
    });

    // Add peers accuracy markers
    const peerSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Peers Avg Accuracy",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "peerAccuracy",
        categoryXField: "subject",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}%"
        })
      })
    );

    peerSeries.columns.template.setAll({
      width: 10,
      height: 10,
      fill: am5.color("#F8A978"),
      strokeOpacity: 0
    });

    // Make peer accuracy appear as dots
    peerSeries.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color("#F8A978")
        })
      });
    });

    // Hide actual columns for peer series
    peerSeries.columns.template.set("forceHidden", true);

    // Add labels above bars
    userSeries.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          text: "{valueY}%",
          fill: am5.color("#000000"),
          centerX: am5.p50,
          centerY: am5.p0,
          populateText: true,
          fontSize: 13,
          fontWeight: "600",
          dy: -10
        })
      });
    });

    // Set data
    const chartData = data || [
      { subject: "Mathematics", userAccuracy: 86, peerAccuracy: 82 },
      { subject: "Physics", userAccuracy: 78, peerAccuracy: 75 },
      { subject: "Chemistry", userAccuracy: 60, peerAccuracy: 65 }
    ];

    xAxis.data.setAll(chartData);
    userSeries.data.setAll(chartData);
    peerSeries.data.setAll(chartData);

    // Configure legend
    legend.data.setAll(chart.series.values);
    legend.labels.template.setAll({
      fontSize: 12,
      fill: am5.color("#000000")
    });
    legend.markers.template.setAll({
      width: 12,
      height: 12
    });

    // Make stuff animate on load
    userSeries.appear(1000);
    peerSeries.appear(1000);
    chart.appear(1000, 100);

    // Clean up on unmount
    return () => {
      root.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default SubjectAccuracyChart;
