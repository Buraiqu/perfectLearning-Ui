import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';

// Import amCharts 5 core and required components
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const LearningTimePieChart = ({ data }) => {
    const chartRef = useRef(null);
    const containerRef = useRef(null);
    const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
    const [chartCenter, setChartCenter] = useState({ x: 0, y: 0 });
    const [slicePositions, setSlicePositions] = useState([]);

    // Calculate positions for the HTML labels
    useEffect(() => {
        if (chartDimensions.width > 0 && chartDimensions.height > 0) {
            const radius = Math.min(chartDimensions.width, chartDimensions.height) / 2;
            const center = { x: chartDimensions.width / 2, y: chartDimensions.height / 2 };
            setChartCenter(center);
            
            // Calculate total value
            const totalValue = data.reduce((sum, item) => sum + item.value, 0);
            
            // Calculate positions for each slice
            let startAngle = 0;
            const positions = data.map(item => {
                const sliceValue = item.value / totalValue;
                const sliceAngle = sliceValue * 360;
                const midAngle = startAngle + (sliceAngle / 2);
                const angleInRadians = (midAngle - 90) * (Math.PI / 180);
                
                // Calculate position based on label coordinates
                const x = center.x + (radius * item.labelX * Math.cos(angleInRadians));
                const y = center.y + (radius * item.labelY * Math.sin(angleInRadians));
                
                startAngle += sliceAngle;
                
                return {
                    category: item.category,
                    label: item.label,
                    x,
                    y
                };
            });
            
            setSlicePositions(positions);
        }
    }, [data, chartDimensions]);

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
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
                innerRadius: 0,
                radius: am5.percent(95),
            })
        );

        // Create series
        const series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: 'value',
                categoryField: 'category',
                alignLabels: false,
                legendLabelText: '{category}',
                legendValueText: '{value}',
                tooltip: null  // Disable tooltips completely
            })
        );

        // Disable labels
        series.labels.template.set('visible', false);

        // Disable ticks
        series.ticks.template.set('visible', false);

        // Set custom colors
        series.slices.template.adapters.add('fill', (fill, target) => {
            const dataItem = target.dataItem;
            if (dataItem && dataItem.dataContext) {
                return am5.color(dataItem.dataContext.color);
            }
            return fill;
        });

        // Set custom stroke
        series.slices.template.set('strokeWidth', 2);
        series.slices.template.set('stroke', am5.color('#ffffff'));
        
        // Disable hover state completely
        series.slices.template.states.remove("hover");
        
        // Remove tooltip text
        series.slices.template.set("tooltipText", "");
        series.slices.template.set("showTooltipOn", "never");

        // Add data
        series.data.setAll(data);

        // Get chart dimensions after it's rendered
        setTimeout(() => {
            if (chartRef.current) {
                const rect = chartRef.current.getBoundingClientRect();
                setChartDimensions({ width: rect.width, height: rect.height });
            }
        }, 100);

        // Clean up on unmount
        return () => {
            root.dispose();
        };
    }, [data]);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '350px' }}>
            <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
            {slicePositions.map((pos, index) => {
                // Find the matching data item to get its color
                const dataItem = data.find(item => item.category === pos.category);
                
                // Use predefined dark colors based on category
                let labelColor = '#333333';
                if (dataItem) {
                    if (dataItem.category === 'Video Lectures') {
                        labelColor = '#2c5c8f'; // Dark blue for Video Lectures
                    } else if (dataItem.category === 'Reading Material') {
                        labelColor = '#b25f3a'; // Dark orange/peach for Reading Material
                    }
                }
                
                return (
                    <div 
                        key={index}
                        style={{
                            position: 'absolute',
                            left: `${pos.x}px`,
                            top: `${pos.y}px`,
                            transform: 'translate(-50%, -50%)',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: labelColor,
                            pointerEvents: 'none',
                            zIndex: 100
                        }}
                    >
                        {pos.label}
                    </div>
                );
            })}
        </div>
    );
};

export default LearningTimePieChart;