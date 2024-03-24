import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chat extends Component {
    render() {
        const { transactions } = this.props;
        //console.log(transactions)
        if (!transactions || transactions.length === 0) {
            return <div>No transactions data available.</div>
        }
        // Calculate frequency of services
        const serviceFrequency = transactions.reduce((acc, curr) => {
            if (curr.service in acc) {
                acc[curr.service]++;
            } else {
                acc[curr.service] = 1;
            }
            return acc;
        }, {});

        const totalTransactions = transactions.length;

        const dataPoints = Object.keys(serviceFrequency).map(service => ({
            y: parseFloat(((serviceFrequency[service] / totalTransactions) * 100).toFixed(1)), // Calculate percentage and round to 1 decimal place
            label: service
        }));

        const options = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "My Activities"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: dataPoints
            }]
        };

        return (
            <div>
                <CanvasJSChart options={options} />
            </div>
        );
    }
}

export default Chat;
