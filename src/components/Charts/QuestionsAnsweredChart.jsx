import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const QuestionsAnsweredChart = ({ data }) => {
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
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
                paddingTop: 10
            })
        );

        // Create axes
        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "period",
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 30,
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9
                }),
                tooltip: am5.Tooltip.new(root, {})
            })
        );
        
        // Style x-axis labels
        xAxis.get("renderer").labels.template.setAll({
            fontSize: 12,
            fill: am5.color("#666666")
        });

        xAxis.data.setAll(data);

        // Create primary y-axis (for questions answered)
        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {
                    minGridDistance: 30
                }),
                numberFormat: "#'",
                min: 0,
                max: 150,
                strictMinMax: true
            })
        );
        
        // Style y-axis labels
        yAxis.get("renderer").labels.template.setAll({
            fontSize: 12,
            fill: am5.color("#666666")
        });
        
        // Add title to left y-axis
        yAxis.children.unshift(
            am5.Label.new(root, {
                rotation: -90,
                text: "QUESTIONS ANSWERED",
                y: am5.p50,
                centerX: am5.p50,
                fontSize: 12,
                fontWeight: "500",
                fill: am5.color("#666666"),
                paddingLeft: -40
            })
        );
        
        // Create secondary y-axis (for tests taken)
        const yAxis2 = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {
                    opposite: true,
                    minGridDistance: 30
                }),
                syncWithAxis: yAxis,
                min: 0,
                max: 4,
                strictMinMax: true
            })
        );
        
        // Style secondary y-axis labels
        yAxis2.get("renderer").labels.template.setAll({
            fontSize: 12,
            fill: am5.color("#666666")
        });
        
        // Add title to right y-axis
        yAxis2.children.unshift(
            am5.Label.new(root, {
                rotation: 90,
                text: "TESTS TAKEN",
                y: am5.p50,
                centerX: am5.p50,
                fontSize: 12,
                fontWeight: "500",
                fill: am5.color("#666666"),
                paddingRight: -40
            })
        );
        
        // Add grid
        chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none",
            xAxis: xAxis,
            yAxis: yAxis
        }));
        
        // Add horizontal grid lines
        yAxis.get("renderer").grid.template.setAll({
            strokeDasharray: [2, 2],
            stroke: am5.color("#e0e0e0")
        });
        
        // Hide vertical grid lines
        xAxis.get("renderer").grid.template.set("forceHidden", true);

        // Create series for questions answered (bars)
        const questionsAnsweredSeries = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Questions Answered",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "questionsAnswered",
                categoryXField: "period",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY} questions"
                })
            })
        );

        questionsAnsweredSeries.columns.template.setAll({
            cornerRadiusTL: 3,
            cornerRadiusTR: 3,
            fillOpacity: 0.8,
            width: am5.percent(70),
            fill: am5.color("#a8c7e7") // Light blue color for bars
        });
        
        // Disable hover state for better match with reference
        questionsAnsweredSeries.columns.template.states.remove("hover");

        questionsAnsweredSeries.data.setAll(data);

        // Create series for tests taken (line)
        const testsTakenSeries = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Tests Taken",
                xAxis: xAxis,
                yAxis: yAxis2,
                valueYField: "testsTaken",
                categoryXField: "period",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{valueY} tests"
                }),
                connect: false
            })
        );

        testsTakenSeries.strokes.template.setAll({
            stroke: am5.color("#ffa07a"),
            strokeWidth: 2
        });

        // Add bullets to line series
        testsTakenSeries.bullets.push(function() {
            // Create container for bullet and label
            const container = am5.Container.new(root, {});
            
            // Create bullet background
            const bulletBackground = am5.RoundedRectangle.new(root, {
                width: 24,
                height: 24,
                cornerRadiusTL: 3,
                cornerRadiusTR: 3,
                cornerRadiusBL: 3,
                cornerRadiusBR: 3,
                fill: am5.color("#ffa07a"),
                fillOpacity: 0.8
            });
            
            // Add text label inside the bullet
            const bulletLabel = am5.Label.new(root, {
                text: "{valueY}",
                centerX: am5.p50,
                centerY: am5.p50,
                fill: am5.color("#ffffff"),
                fontSize: 12,
                fontWeight: "600"
            });
            
            container.children.push(bulletBackground);
            container.children.push(bulletLabel);
            
            return am5.Bullet.new(root, {
                locationY: 0,
                sprite: container
            });
        });

        testsTakenSeries.data.setAll(data);

        // Remove legend as it's not in the reference image
        
        // Add horizontal line at zero
        chart.plotContainer.children.push(
            am5.Line.new(root, {
                stroke: am5.color("#e0e0e0"),
                strokeWidth: 1,
                strokeDasharray: [0, 0],
                x1: 0,
                y1: 0,
                x2: "100%",
                y2: 0,
                locationY: 0
            })
        );

        // Clean up on unmount
        return () => {
            root.dispose();
        };
    }, [data]);

    return (
        <div ref={chartRef} style={{ width: '100%', height: '350px', marginTop: '10px' }} />
    );
};

export default QuestionsAnsweredChart;
