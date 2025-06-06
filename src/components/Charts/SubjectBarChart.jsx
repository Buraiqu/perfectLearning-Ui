import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const SubjectBarChart = ({ data }) => {
  const chartRef = useRef(null);
  
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
    
    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 10,
        paddingRight: 30,
        paddingTop: -50,
        paddingBottom: 0,
        layout: root.verticalLayout
      })
    );
    
    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 120,
      cellStartLocation: 0.25,
      cellEndLocation: 0.75
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
        max: 45,
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
      // Only create series if chart exists
      if (!chart || !chart.series) {
        return null;
      }
      
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
            labelText: "{name}: {valueY}"
          })
        })
      );
      
      // Configure column template
      series.columns.template.setAll({
        width: am5.percent(100),
        tooltipY: 0,
        strokeOpacity: 0,
        cornerRadiusTopLeft: 4,
        cornerRadiusTopRight: 4
      });
      
      // Add value labels inside the columns
      try {
        // Make sure children property exists before pushing
        if (!series.columns.template.children) {
          series.columns.template.children = new am5.List(root);
        }
        
        series.columns.template.children.push(am5.Label.new(root, {
          text: field === "unattempted" ? "{originalUnattempted}" : "{valueY}",
          centerX: am5.p50,
          centerY: 0,
          dy: 3,  // Position exactly 3px from the top
          fill: am5.color(0x000000),
          populateText: true
        }));
      } catch (e) {
        console.error("Error adding label to column:", e);
      }
      
      // Set data
      if (series.data) {
        series.data.setAll(processedData);
      }
      
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
          marginTop: 20,
          marginBottom: 0,
          paddingTop: 10,
          paddingBottom: 0,
          layout: root.horizontalLayout,
          y: am5.percent(100),
          centerY: am5.percent(100),
          dy: -20
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
  }, [data]);
  
  return <div ref={chartRef} style={{ width: "100%", height: "650px" }}></div>;
};

export default SubjectBarChart;
