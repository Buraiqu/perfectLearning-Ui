import React, { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const SubjectSummaryChart = ({ data }) => {
  useLayoutEffect(() => {
    // Create root element
    const root = am5.Root.new("subjectSummaryChartDiv");

    // Remove amCharts logo
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
        layout: root.horizontalLayout
      })
    );

    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30
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

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.grid.template.set("strokeDasharray", [3]);
    
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer
      })
    );

    // Add series
    function createSeries(name, field, color) {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: "category",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{name}: {valueY}"
          })
        })
      );

      series.columns.template.setAll({
        width: am5.percent(90),
        tooltipY: 0,
        strokeOpacity: 0,
        fill: am5.color(color)
      });

      series.data.setAll(data);
      
      // Add label for value on top of each column
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: am5.color(0x000000),
            centerX: am5.p50,
            centerY: am5.p0,
            populateText: true,
            fontSize: 12
          })
        });
      });

      xAxis.data.setAll(data);
      series.appear(1000);
    }

    createSeries("All Questions", "allQuestions", "#B0CCE7");
    createSeries("Attempted", "attempted", "#FFCFB6");
    createSeries("Correct Answers", "correct", "#C4DD9B");
    createSeries("Incorrect Answers", "incorrect", "#FFB1B1");
    createSeries("Unattempted", "unattempted", "#E2E2E2");

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        layout: root.horizontalLayout,
        marginTop: 15
      })
    );
    legend.data.setAll(chart.series.values);

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return <div id="subjectSummaryChartDiv" style={{ width: "100%", height: "300px" }}></div>;
};

export default SubjectSummaryChart;
