import React, { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const colors = {
  Mathematics: "#38A169",
  Physics: "#85ABD0",
  Chemistry: "#E53E3E"
};

const SemiCirclePieChart = ({ data }) => {
  useLayoutEffect(() => {
    // Create root element
    const root = am5.Root.new("pieChartdiv");

    // Remove amCharts logo
    root._logo.dispose();

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(50)
      })
    );

    // Create series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        startAngle: 180,
        endAngle: 360,
        valueField: "value",
        categoryField: "category",
        alignLabels: true,
        radius: am5.percent(95)
      })
    );

    // Set custom labels
    series.labels.template.setAll({
      text: "{category}\n{hours}[fontSize: 20px]{hrs}[/] {minutes}[fontSize: 20px]{mins}[/]",
      radius: 30,
      centerX: am5.percent(100),
      textType: "circular",
      fill: am5.color(0x03488B),
      populateText: true
    });

    // Set colors for slices
    series.slices.template.setAll({
      templateField: "sliceSettings",
      strokeWidth: 1
    });

    series.states.create("hidden", {
      startAngle: 180,
      endAngle: 180
    });

    series.slices.template.setAll({
      cornerRadius: 5
    });

    series.ticks.template.setAll({
      forceHidden: true
    });

    // Process and set data
    const processedData = data.map(item => ({
      ...item,
      sliceSettings: {
        fill: am5.color(colors[item.category]),
        stroke: am5.color(colors[item.category])
      }
    }));

    // Set data
    series.data.setAll(processedData);

    // Animate chart
    series.appear(1000, 100);

    // Cleanup
    return () => {
      root.dispose();
    };
  }, [data]);

  return <div id="pieChartdiv" style={{ width: '100%', height: '100%' }} />;
};

export default SemiCirclePieChart;