// import React from "react";
// import ReactApexChart from ""
//       class ApexChart extends React.Component {
//         constructor(props) {
//           super(props);

//           this.state = {

//             series: [44, 55, 13, 43, 22],
//             options: {
//               chart: {
//                 width: 380,
//                 type: 'pie',
//               },
//               labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
//               responsive: [{
//                 breakpoint: 480,
//                 options: {
//                   chart: {
//                     width: 200
//                   },
//                   legend: {
//                     position: 'bottom'
//                   }
//                 }
//               }]
//             },

//           };
//         }

//         render() {
//           return (

//       <div id="chart">
//   <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />
// </div>

//           );
//         }
//       }

//       const domContainer = document.querySelector('#app');
//       ReactDOM.render(React.createElement(ApexChart), domContainer);

// import React, { Component } from "react";
// import Chart from "react-apexcharts";

// class ProjectChart extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {
//         chart: {
//           id: "basic-bar",
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//         },
//       },
//       series: [
//         {
//           name: "series-1",
//           data: [30, 40, 45, 50, 49, 60, 70, 91],
//         },
//       ],
//     };
//   }

//   render() {
//     return (
//       <div className="app">
//         <div className="row">
//           <div className="mixed-chart">
//             <Chart
//               options={this.state.options}
//               series={this.state.series}
//               type="bar"
//               width="500"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default ProjectChart;

import React from "react";
import ReactApexChart from "react-apexcharts";

class ProjectChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width={380}
        />
      </div>
    );
  }
}

export default ProjectChart;
