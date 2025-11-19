import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const SubjectBarChart = ({ data }) => {
  const chartRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useLayoutEffect(() => {
    // Don't create chart if no data
    if (!data || data.length === 0) {
      return () => {};
    }
    
    // Create unique ID for the chart
    const chartId = "subjectBarChartDiv" + Math.random().toString(36).substr(2, 9);
    
    // Set ID to the div
    if (chartRef.current) {
      chartRef.current.id = chartId;
    } else {
      // If ref is not available, don't proceed
      return () => {};
    }
    
    // Create root
    let root = am5.Root.new(chartId);
    
    // Remove amCharts logo
    if (root._logo) {
      root._logo.dispose();
    }
    
    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);
    
    // Create chart with responsive padding
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: isMobile ? 5 : 10,
        paddingRight: isMobile ? 10 : 30,
        paddingTop: isMobile ? -30 : -50,
        paddingBottom: 0,
        layout: root.verticalLayout
      })
    );
    
    // Create axes with responsive settings
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: isMobile ? 60 : 120,
      cellStartLocation: isMobile ? 0.15 : 0.25,
      cellEndLocation: isMobile ? 0.85 : 0.75
    });
    
    xRenderer.grid.template.set("visible", false);
    
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    
    const yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false
    });
    yRenderer.grid.template.set("visible", false);
    yRenderer.labels.template.set("visible", false);
    
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: isMobile ? 35 : 45,
        strictMinMax: true,
        renderer: yRenderer,
        visible: false
      })
    );
    
    // Process data for clustered columns with minimum values for visibility
    const processedData = [];
    if (data && data.length > 0) {
      data.forEach(item => {
        processedData.push({
          category: item.category,
          allQuestions: item.allQuestions,
          attempted: item.attempted,
          correct: item.correct,
          incorrect: item.incorrect,
          // Ensure unattempted has a minimum visible value for the chart
          // but we'll display the actual value in the label
          unattempted: Math.max(item.unattempted, 3),
          // Store original values for labels
          originalUnattempted: item.unattempted
        });
      });
    }
    
    // Configure column series settings
    chart.get("colors").set("step", 1);
    
    // Set data to axis
    xAxis.data.setAll(processedData);
    
    // Create series
    function createSeries(name, field, color) {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: "category",
          clustered: true,
          stacked: false,
          fill: am5.color(color),
          tooltip: am5.Tooltip.new(root, {
            labelText: "{name}: {valueY}",
          }),
        })
      );

      series.columns.template.setAll({
        width: am5.percent(100),
        tooltipY: 0,
        strokeOpacity: 0,
        cornerRadiusTopLeft: 4,
        cornerRadiusTopRight: 4,
      });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: field === "unattempted" ? "{originalUnattempted}" : "{valueY}",
            centerX: am5.p50,
            centerY: 0,
            dy: 3,
            fill: am5.color(0x000000),
            populateText: true,
            fontSize: isMobile ? 10 : 12,
          }),
        });
      });

      series.data.setAll(processedData);
      return series;
    }
    
    // Create series for each data type
    try {
      const allQuestionsSeries = createSeries("All Questions", "allQuestions", "#B0CCE7");
      const attemptedSeries = createSeries("Attempted", "attempted", "#FFCFB6");
      const correctSeries = createSeries("Correct Answers", "correct", "#C4DD9B");
      const incorrectSeries = createSeries("Incorrect Answers", "incorrect", "#FFB1B1");
      const unattemptedSeries = createSeries("Unattempted", "unattempted", "#E2E2E2");
    } catch (e) {
      console.error("Error creating series:", e);
    }
    
    // Move legend to the bottom of the chart
    try {
      const legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
          marginTop: isMobile ? 10 : 20,
          marginBottom: 0,
          paddingTop: isMobile ? 5 : 10,
          paddingBottom: 0,
          layout: isMobile ? root.verticalLayout : root.horizontalLayout,
          y: am5.percent(100),
          centerY: am5.percent(100),
          dy: isMobile ? -10 : -20
        })
      );
      
      // Set legend data
      if (legend && legend.data) {
        legend.data.setAll(chart.series.values);
      }
    } catch (e) {
      console.error("Error creating legend:", e);
    }
    
    // Make stuff animate on load
    try {
      chart.appear(1000, 100);
    } catch (e) {
      console.error("Error animating chart:", e);
    }
    
    // Return cleanup function
    return () => {
      if (root) {
        try {
          root.dispose();
        } catch (e) {
          console.error("Error disposing chart:", e);
        }
      }
    };
  }, [data, isMobile]);
  
  return <div ref={chartRef} style={{ width: "100%", height: isMobile ? "450px" : "650px" }}></div>;
};

export default SubjectBarChart;
