import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const ColumnChartWithImages = ({ data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useLayoutEffect(() => {
    // Create root element
    const root = am5.Root.new("chartdiv");

    // Remove amCharts logo
    root._logo.dispose();

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: data.length > 4 ? true : false,
        panY: false,
        wheelX: data.length > 4 ? "panX" : "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 0
      })
    );

    // Add cursor
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes with responsive settings
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: isMobile ? 20 : 30,
      minorGridEnabled: true
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "name",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    xRenderer.grid.template.set("visible", false);

    const yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      labels: {
        template: {
          set: {
            visible: false
          }
        }
      }
    });
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 100,
        extraMax: 0.1,
        renderer: yRenderer,
        visible: false
      })
    );

    yRenderer.grid.template.setAll({
      visible: false
    });

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "name",
        tooltip: am5.Tooltip.new(root, { forceHidden: true })
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
      minHeight:10
    });

    // Set custom colors for bars based on data
    series.columns.template.adapters.add("fill", (fill, target) => {
      const dataItem = target.dataItem;
      if (dataItem && dataItem.dataContext.color) {
        return am5.color(dataItem.dataContext.color);
      }
      return fill;
    });

    series.columns.template.adapters.add("stroke", (stroke, target) => {
      const dataItem = target.dataItem;
      if (dataItem && dataItem.dataContext.color) {
        return am5.color(dataItem.dataContext.color);
      }
      return stroke;
    });

    // Add value labels on top of bars with responsive font size
    series.bullets.push(function(root, series, dataItem) {
      const labelBullet = am5.Bullet.new(root, {
        locationY: 1.11,
        sprite: am5.Label.new(root, {
          text: "{valueY}%",
          centerX: am5.p50,
          centerY: am5.p100,
          populateText: true,
          dy: isMobile ? -8 : -10,
          fontSize: isMobile ? 12 : 14,
          fill: dataItem.dataContext.color ? am5.color(dataItem.dataContext.color) : am5.color(0x000000)
        })
      });
      return labelBullet;
    });

    // Add bullet for images with responsive sizing
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Picture.new(root, {
          templateField: "bulletSettings",
          width: isMobile ? 35 : 50,
          height: isMobile ? 35 : 50,
          centerX: am5.p50,
          centerY: am5.p100,
          dy: isMobile ? 20 : 30,
          shadowColor: am5.color(0x000000),
          shadowBlur: isMobile ? 2 : 3,
          shadowOffsetX: isMobile ? 1 : 2,
          shadowOffsetY: isMobile ? 1 : 2,
          shadowOpacity: 0.4
        })
      });
    });

    // Set data
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    // Cleanup
    return () => {
      root.dispose();
    };
  }, [data, isMobile]);

  const uniqueId = `chart-container-${Math.random().toString(36).substr(2, 9)}`;
  
  const containerStyle = {
    width: '100%',
    height: isMobile ? '200px' : '250px',
    overflowX: data.length > 4 ? 'scroll' : 'hidden',
    overflowY: 'hidden',
    position: 'relative',
    border: '1px solid transparent' // Force container boundaries
  };

  const chartStyle = {
    width: data.length > 4 ? `${data.length * (isMobile ? 80 : 100)}px` : '100%',
    height: isMobile ? '180px' : '230px',
    minWidth: data.length > 4 ? `${data.length * (isMobile ? 80 : 100)}px` : '100%',
    flexShrink: 0
  };

  // CSS for scrollbar styling
  const scrollbarCSS = `
    .${uniqueId}::-webkit-scrollbar {
      height: 8px;
    }
    .${uniqueId}::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    .${uniqueId}::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }
    .${uniqueId}::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
    .${uniqueId} {
      scrollbar-width: thin;
      scrollbar-color: #c1c1c1 #f1f1f1;
    }
  `;

  return (
    <>
      <style>{scrollbarCSS}</style>
      <div className={uniqueId} style={containerStyle}>
        <div id="chartdiv" style={chartStyle} />
      </div>
    </>
  );
};

export default ColumnChartWithImages;
