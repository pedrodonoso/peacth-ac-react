import React from "react";
import PropTypes from "prop-types";
import Chart from 'react-apexcharts'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
  InputGroupAddon, InputGroupText,
  
} from "shards-react";

import constants from "../../data/constants";
import CustomToggle from '../forms/CustomToggle';
import calculoService from "../../services/calculo.service";

class PacienteGenetico extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      gen: this.props.gen,
      series: this.props.series,
      chart: this.props.chart,
      options:  this.props.options
      // options:  constants.options
    }
    this.handlerOpenDialog = this.handlerOpenDialog.bind(this);
    this.toggle = this.toggle.bind(this);
    this.generate(constants.gen2)
  }


  generate(_gen) {
    this.setState({
      ...this.state,
      gen: _gen
    });

    calculoService.getDistribution(_gen)
      .then((response) => {
        var lab = response.data.labels
        var ser = response.data.frequency
        //console.log({title: "getDistribution", response: response.data, gen: _gen})
        //console.log({title: "frequency", response: ser})
        //console.log({title: "labels", response: lab})
        this.setState({
          ...this.state,
          series: ser,
          options: {
            ...this.state.options,
            labels: lab
          }
        });
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          error: true,
          errortitle: 'Cuidado!!',
          errortext: 'No pudimos obtener los datos, intenta más tarde',
          options: {
            ...this.state.options,
            noData: {
              ...this.state.options.noData,
              text: 'Intentalo más tarde'
            },
          }
        });
      })
      //console.log({title: "return", response: this.state})
  }


  toggle(data) {
    if(data === {}) {
      this.setState({
        ...this.state,
        error: !this.state.error
      });
    } else {
      this.setState({
        ...this.state,
        error: !this.state.error,
        errortitle: data.title,
        errortext: data.text,
      });
    }
    //console.log({text:"toggle", open:this.state.open});
  }

  handlerOpenDialog(data) {
    this.setState({
      ...this.state,
      error: data
    });
    //console.log({text:"handler", open:this.state.open});
  }


  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              {/*<RangeDatePicker />*/}
              <ButtonGroup >
                <InputGroupAddon type="prepend">
                  <InputGroupText>Gen</InputGroupText>
                </InputGroupAddon>
                <Button
                  theme={this.state.gen === constants.gen2 ? 'primary' : 'white'}
                  onClick={() =>
                    this.generate(constants.gen2)
                  }
                >
                  <Col style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Col>
                      <Row><strong style={{ 'font-size': '13px', 'font-weight': '80' }}>CYP2C9 *2</strong></Row>
                      <Row><strong style={{ 'font-size': '10px', 'font-weight': '50' }}>rs1799853</strong></Row>
                    </Col>
                  </Col>

                </Button>
                <Button
                  theme={this.state.gen === constants.gen3 ? 'primary' : 'white'}
                  onClick={() =>
                    this.generate(constants.gen3)
                  }
                >
                  <Col style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Col>
                      <Row><strong style={{ 'font-size': '13px', 'font-weight': '80' }}>CYP2C9 *3</strong></Row>
                      <Row><strong style={{ 'font-size': '10px', 'font-weight': '50' }}>rs1057910 </strong></Row>
                    </Col>
                  </Col>
                </Button>
                <Button
                  theme={this.state.gen === constants.gen4 ? 'primary' : 'white'}
                  onClick={() =>
                    this.generate(constants.gen4)
                  }
                >
                  <Col style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Col>
                      <Row><strong style={{ 'font-size': '13px', 'font-weight': '80' }}>VKORC1</strong></Row>
                      <Row><strong style={{ 'font-size': '10px', 'font-weight': '50' }}>rs9923231</strong></Row>
                    </Col>
                  </Col>
                </Button>
              </ButtonGroup>
             {/* <ButtonGroup >
                <Button
                  theme={this.state.gen === constants.gen2 ? 'primary' : 'white'}
                  onClick={() =>
                    this.generate(constants.gen2)
                  }
                > {constants.gen2} </Button>
                <Button
                  theme={this.state.gen === constants.gen3 ? 'primary' : 'white'}
                  onClick={() =>
                    this.generate(constants.gen3)
                  }
                > {constants.gen3} </Button>
                <Button
                  theme={this.state.gen === constants.gen4 ? 'primary' : 'white'}
                  onClick={() =>
                    this.generate(constants.gen4)
                  }
                > {constants.gen4} </Button>
              </ButtonGroup>*/}
            </Col>
            <Col>
            {/*
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
              >
                View Full Report &rarr;
              </Button>
            */}
            </Col>
          </Row>
          <div >
            <Chart
                options={this.state.options}
                series={this.state.series}
                type={this.state.chart.type}
                width={this.state.chart.width}
                height={this.state.chart.height}
            />
          </div>
          <CustomToggle openOut={this.state.error} toggle={this.toggle.bind(this,{})} handler={this.handlerOpenDialog.bind(this)}
          text={this.state.errortext}
          title={this.state.errortitle}
          />
          {/*
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
          */}
        </CardBody>
      </Card>
    );
  }
}

PacienteGenetico.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};


PacienteGenetico.defaultProps = {
  gen: constants.gen2,
  series: [],
  chart: {
    type: 'donut',
    height: '300',
    width: '100%',
  },
  options : {
    dataLabels: {
      enabled: true
    },
    series: [],
    noData: {
      text: 'Cargando...'
    },
    labels: [],
    title: {
        text:  'Frecuencia de distribución según genotipos',
        align: 'center'
    },
    stroke: {
        colors: ['#fff']
    },
    fill: {
        opacity: 0.8
    },
    legend: {
        position: 'top',
        containerMargin: {
            left: 10,
            right: 10,
          }
    },
    responsive: [{
        breakpoint: 1000,
        options: {
          legend: {
            position: 'top'
          }
        }
    }]
  },
};
export default PacienteGenetico;