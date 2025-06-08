import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AccuracyGaugeChart = ({ accuracy = 64 }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    if (chartRef.current && chartRef.current._root) {
      chartRef.current._root.dispose();
    }

    const root = am5.Root.new(chartRef.current);
    chartRef.current._root = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 180,
        endAngle: 360,
        paddingBottom: 0,
        paddingTop: 0
      })
    );

    const axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -10,
      strokeOpacity: 0.1
    });

    axisRenderer.ticks.template.setAll({
      visible: true,
      strokeOpacity: 0.5,
      length: 5,
      location: 0.5
    });

    axisRenderer.grid.template.setAll({
      visible: true,
      strokeOpacity: 0.1
    });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 100,
        strictMinMax: true,
        renderer: axisRenderer
      })
    );

    const bandsData = [
      { color: "#F8A07E", lowScore: 0, highScore: 40 },
      { color: "#F8D07E", lowScore: 40, highScore: 60 },
      { color: "#B5D99C", lowScore: 60, highScore: 100 }
    ];

    am5.array.each(bandsData, function(data) {
      const axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));

      axisRange.setAll({
        value: data.lowScore,
        endValue: data.highScore
      });

      axisRange.get("axisFill").setAll({
        visible: true,
        fill: am5.color(data.color),
        fillOpacity: 0.9,
        thickness: 15
      });

      axisRange.get("label").setAll({
        forceHidden: true
      });
    });

    const percentages = [0, 20, 40, 60, 80, 100];
    percentages.forEach(percent => {
      const range = xAxis.createAxisRange(xAxis.makeDataItem({}));
      range.setAll({
        value: percent
      });
      
      range.get("label").setAll({
        text: percent + "%",
        fontSize: 10,
        fill: am5.color("#999999"),
        visible: true
      });
    });

    for (let i = 5; i < 100; i += 5) {
      if (!percentages.includes(i)) {
        const range = xAxis.createAxisRange(xAxis.makeDataItem({}));
        range.setAll({
          value: i
        });
        
        range.get("tick").setAll({
          visible: true,
          length: 3,
          strokeOpacity: 0.2
        });
      }
    }

    const axisDataItem = xAxis.makeDataItem({});

    const clockHand = am5radar.ClockHand.new(root, {
      pinRadius: 5,
      radius: am5.percent(90),
      bottomWidth: 3,
      fill: am5.color("#B5D99C"),
      stroke: am5.color("#B5D99C")
    });

    clockHand.pin.setAll({
      fill: am5.color("#B5D99C"),
      stroke: am5.color("#B5D99C")
    });

    clockHand.hand.setAll({
      fill: am5.color("#B5D99C"),
      stroke: am5.color("#B5D99C")
    });

    const bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: clockHand
    }));

    xAxis.createAxisRange(axisDataItem);

    chart.radarContainer.children.push(
      am5.Circle.new(root, {
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        radius: 25,
        fill: am5.color("#B5D99C"),
        fillOpacity: 0.3
      })
    );

    chart.radarContainer.children.push(
      am5.Label.new(root, {
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        textAlign: "center",
        text: accuracy + "%",
        fontSize: 18,
        fontWeight: "400",
        fill: am5.color("#4CAF50")
      })
    );

    axisDataItem.set("value", 0);

    axisDataItem.animate({
      key: "value",
      to: accuracy,
      duration: 1000,
      easing: am5.ease.out(am5.ease.cubic)
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [accuracy]);

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
};

export default AccuracyGaugeChart;
