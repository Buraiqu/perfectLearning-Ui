import React, { useEffect, useState } from 'react';

const AccuracyGaugeChart = ({ accuracy = 64 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  // SVG dimensions and parameters
  const size = 205;
  const radius = 110;
  const centerX = size / 2;
  const centerY = size / 2 + 20; // Fine-tuned for centering
  const strokeWidth = 25; // Thicker arc for bolder look
  
  // Calculate the needle angle based on accuracy
  const startAngle = -220;
  const endAngle = 40;
  const angleRange = endAngle - startAngle;
  const valueAngle = startAngle + (angleRange * animatedValue / 100);
  
  // Calculate coordinates for the needle
  const needleLength = radius -36;
  const needleX = centerX + needleLength * Math.cos((valueAngle * Math.PI) / 180);
  const needleY = centerY + needleLength * Math.sin((valueAngle * Math.PI) / 180);
  
  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (animatedValue < accuracy) {
        setAnimatedValue(prev => Math.min(prev + 2, accuracy));
      }
    }, 20);
    
    return () => clearTimeout(timer);
  }, [animatedValue, accuracy]);
  
  // Generate tick marks
  const generateTicks = () => {
    const ticks = [];
    
    // Major ticks (with labels)
    for (let i = 0; i <= 100; i += 20) {
      const tickAngle = startAngle + (angleRange * i / 100);
      const innerRadius = radius - strokeWidth / 1;
      const outerRadius = radius -34; // Shorter tick marks
      const x1 = centerX + innerRadius * Math.cos((tickAngle * Math.PI) / 180);
      const y1 = centerY + innerRadius * Math.sin((tickAngle * Math.PI) / 180);
      const x2 = centerX + outerRadius * Math.cos((tickAngle * Math.PI) / 180);
      const y2 = centerY + outerRadius * Math.sin((tickAngle * Math.PI) / 180);
      
      // Calculate label position - adjust to be inside the gauge
      const labelRadius = (radius-33)- (strokeWidth * 0.7);
      const labelX = centerX + labelRadius * Math.cos((tickAngle * Math.PI) / 180);
      const labelY = centerY + labelRadius * Math.sin((tickAngle * Math.PI) / 180);
      
      ticks.push(
        <g key={i}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#999999"
            strokeWidth="2"
          />
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#666666"
            fontSize="10"
            fontWeight="600"
          >
            {i}%
          </text>
        </g>
      );
    }
    // Minor ticks (without labels)
    for (let i = 0; i < 100; i += 5) {
      if (i % 20 !== 0) { // Skip positions where we already have major ticks
        const tickAngle = startAngle + (angleRange * i / 100);
        const innerRadius = radius - strokeWidth / 1;
        const outerRadius = radius -31; // Even shorter for minor ticks
        const x1 = centerX + innerRadius * Math.cos((tickAngle * Math.PI) / 180);
        const y1 = centerY + innerRadius * Math.sin((tickAngle * Math.PI) / 180);
        const x2 = centerX + outerRadius * Math.cos((tickAngle * Math.PI) / 180);
        const y2 = centerY + outerRadius * Math.sin((tickAngle * Math.PI) / 180);
        
        ticks.push(
          <g key={`minor-${i}`}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#CCCCCC"
              strokeWidth="1"
            />
          </g>
        );
      }
    }
    
    return ticks;
  };
  
  // Create a complete semi-circle arc with two colors
  const createGauge = () => {
    // Calculate the point where colors change (60%)
    const dividerAngle = startAngle + (angleRange * 60 / 100);
    const dividerRadians = (dividerAngle * Math.PI) / 180;
    const dividerX = centerX + radius * Math.cos(dividerRadians);
    const dividerY = centerY + radius * Math.sin(dividerRadians);
    
    // Start and end points of the entire arc
    const startRadians = (startAngle * Math.PI) / 180;
    const endRadians = (endAngle * Math.PI) / 180;
    const startX = centerX + radius * Math.cos(startRadians);
    const startY = centerY + radius * Math.sin(startRadians);
    const endX = centerX + radius * Math.cos(endRadians);
    const endY = centerY + radius * Math.sin(endRadians);
    
    return (
      <>
        {/* Orange arc (0-60%) */}
        <path
          d={`
            M ${startX} ${startY}
            A ${radius} ${radius} 0 0 1 ${dividerX} ${dividerY}
          `}
          fill="none"
          stroke="#F8A07E"
          strokeWidth={strokeWidth}
        />
        
        {/* Green arc (60-100%) */}
        <path
          d={`
            M ${dividerX} ${dividerY}
            A ${radius} ${radius} 0 0 1 ${endX} ${endY}
          `}
          fill="none"
          stroke="#B5D99C"
          strokeWidth={strokeWidth}
        />
      </>
    );
  };
  
  return (
    <div style={{ width: '100%', height: '200px', position: 'relative' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        {/* Gauge arcs */}
        {createGauge()}
        
        {/* Tick marks and labels */}
        {generateTicks()}
        
        {/* Needle */}
        <line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke="#B5D99C"
          strokeWidth="5"
          strokeLinecap="round"
        />
        
        {/* Center circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r="20"
          fill="#B5D99C"
          fillOpacity="1"
        />
        
        {/* Percentage text */}
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#4CAF50"
          fontWeight="600"
          fontSize="15"
        >
          {accuracy}%
        </text>
      </svg>
    </div>
  );
};


export default AccuracyGaugeChart;
