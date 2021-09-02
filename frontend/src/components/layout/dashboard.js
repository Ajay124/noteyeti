import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import Footer from "./footer";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData : {},
      //setChartData : {},
    };
    this.chart = this.chart.bind(this);
    //this.setChartData = this.setChartData.bind(this);
  }

  chart = () => {
    this.setState({ chartData : {
      labels : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      datasets : [
        {
          label : 'Label of thickness',
          data : [15, 68, 52,68, 35],
          backgroudColor: [
            'rgba(75, 192, 192, 0.6)'
          ],
          borderWidth : 4
        }
      ]
    } });
  }

  componentDidMount() {
    this.chart()
    console.log('this.state',this.state);
  }

  // componentWillMount() {
  //   this.chart()
  // }
  
    render() {
      return (
        <React.Fragment>
          <div className="container-fluid mt--7">
            <div className="row">
                
        
      </div>
      <div className="row mt-5">
        <div className="col-xl-8 mb-5 mb-xl-0">
          
        </div>
        <div className="col-xl-4">
          
        </div>
      </div>
      <Footer></Footer>
    </div>
        </React.Fragment>
      );
    }
  }
  
  export default Index;