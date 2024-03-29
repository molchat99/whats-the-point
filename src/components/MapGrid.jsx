import React, {Component} from 'react';
import DataPoint from './DataPoint';
import Controls from './Controls';
import Inspector from './Inspector';
import HowToPlay from './HowToPlay';
import '../styles/inspector.css';
import '../styles/nav.css';



//import AddDataPoint from './AddDataPoint';
import  randomPoints from '../script/randomPoints.js'
import '../styles/mapGrid.css';
import DifficultyModal from './DifficultyModal';

class MapGrid extends Component {

  state = { 
    dataPoints:
    [
      {
        id: 1,
        name: "test",
        location: {gridColumn:"11/12",gridRow:"8/9"},
        enabled: false,
        showInfo: false,
        class: "data-point"
      },
      {
        id: 2,
        name: "test",
        location: {gridColumn:"20/21",gridRow:"8/9"},
        enabled: false,
        showInfo: false,
        class: "data-point"
      }
    ],
    inspectPoint: {
      id: 3,
      name: "test",
      size: 20,
      location: {gridColumn:"11/12",gridRow:"8/9"},
      enabled: false,
      showInfo: false
    },
    gridSize: 25,
    winMessage: 'Press space to start!',
    timeOut: 500,
    highscore: 0,
    lossesInRow: 0,
    devMode: false,
    pointPercentage: 50,
    diffultyIsOpen: false,
    welcomeIsOpen: true
  }

  handleDevMode = () => {
    let isDevMode = this.state.devMode
    this.setState({devMode: !isDevMode})
  }

  handlePressSpace = () => {
    this.handleGeneration(this.state.gridSize, this.state.pointPercentage)
  }

  handleDelete = (dataPointId) => {
    const dataPoints = this.state.dataPoints.filter( (d) => d.id !== dataPointId);
    this.setState({dataPoints:dataPoints})
  }

  handleInformation = (dataPoint) => {
    this.setState({inspectPoint:dataPoint})
    const dataPoints = [...this.state.dataPoints]
    const index = this.state.dataPoints.indexOf(dataPoint)
    dataPoints[index] = {...dataPoint}
    dataPoints[index].showInfo = !dataPoints[index].showInfo
    this.setState({dataPoints:dataPoints})
  }

  handleGeneration = (gridSize, pointPercentage) => {
    let inspector = document.getElementsByClassName('inspector')[0]
    inspector.style.setProperty('background-color', 'black')
    let grid = document.getElementsByClassName('map-grid')[0]
    grid.style.setProperty('--gridSize', gridSize)
    grid.style.setProperty('--dataPointSize', `${100/gridSize}px`)
    const dataPoints = randomPoints(gridSize, pointPercentage);
    this.setState({winMessage:''})
    this.setState({dataPoints: dataPoints})
  }

  handlePivot = () => {
    console.log('switching off pivot...')
    let dataPoints = [...this.state.dataPoints]
    dataPoints[0].class = "data-point"
    this.setState({dataPoints: dataPoints})
  }

  handleReset = () => {
    const dataPoints = [];
    this.setState({dataPoints: dataPoints})
  }

  handleGridSizeChange = (value) => {
    let gridSize = 0;
    console.log("Changed gridsize to", value)
    gridSize = value;
    this.setState({gridSize:gridSize})
  }

  handleTimeOutChange = (value) => {
    let timeOut = 0;
    console.log("Changed timeout to", value)
    timeOut = value;
    this.setState({timeOut:timeOut})
  }

  handlePointAmountChange = (value) => {
    let pointPercentage = 0;
    console.log("Changed pointPercentage to", value)
    pointPercentage = value;
    this.setState({pointPercentage:pointPercentage})
  }

  handleWinCondition = (dataPoint) => {
    console.log('testing win for', dataPoint);
    let inspector = document.getElementsByClassName('inspector')[0]
    if(dataPoint.id===1) {
      this.setState({winMessage:'Great! 😀'})
      inspector.style.setProperty('background-color', 'green')
      let highscore = this.state.highscore;
      highscore++;
      this.setState({highscore:highscore})
      this.setState({lossesInRow:0})
    } else {
      this.setState({winMessage:'Try again!	😶‍🌫️'})
      inspector.style.setProperty('background-color', 'red')
      this.setState({highscore:0})
      let lossesInRow = this.state.lossesInRow;
      lossesInRow++;
      if(lossesInRow >= 5) {
        this.setState({winMessage:'Are you even trying?'})
        this.setState({lossesInRow:0})
      } else {
        this.setState({lossesInRow:lossesInRow})
      }
      
      
    }
  }
  
  handlePlayGame = () => {
    let welcomeScreen = document.getElementsByClassName('mod')[0]
    welcomeScreen.style.setProperty('animation-name', 'playgame')
    setTimeout(() => {this.setState({welcomeIsOpen: false})}, 400)
  }

  render() { 
    return (
      <div className='container crt'>
        
        <Controls 
          onGeneration={this.handleGeneration}
          onReset={this.handleReset}
          gridSize={this.state.gridSize}
          onGridSizeChange={this.handleGridSizeChange}
          timeOut={this.state.timeOut}
          onTimeOutChange={this.handleTimeOutChange}
          pointPercentage={this.state.pointPercentage}
          onPointAmoungChange={this.handlePointAmountChange}
          onDisablePivot={this.disablePivot}
          onSpacePress={this.handlePressSpace}
          onDevMode={this.handleDevMode}
        />
        <div className="inspector">
          <Inspector 
            dataPoint={this.state.inspectPoint}
            win={this.state.winMessage}
            highscore={this.state.highscore}
          >
            
          </Inspector>
        </div>


        <div className='map-grid'>
          {this.state.dataPoints.map( dataPoint => 
            <DataPoint 
            key={dataPoint.id} 
            dataPoint={dataPoint}
            onInformation={this.handleInformation}
            onDelete={this.handleDelete}
            onSetDataPoint={this.handleSetDataPoint}
            onWinCondition={this.handleWinCondition}
            onPivot={this.handlePivot}
            timeOut={this.state.timeOut}
            devMode={this.state.devMode}
            
            >
            </DataPoint> 
          )}

        </div>
        {this.state.welcomeIsOpen && <HowToPlay
          onPlayGame={this.handlePlayGame}
        />}
        {this.state.diffultyIsOpen && <DifficultyModal />}
      </div>
    );
  }

  // {this.calcLineDiv(this.state.dataPoints[0], this.state.dataPoints[1])}

  // calcLineDiv = (dataPointA, dataPointB) => {
  //   const colA = dataPointA.location.gridColumn[0];
  //   const rowA = dataPointA.location.gridRow[0];

  //   const colB = dataPointB.location.gridColumn[0];
  //   const rowB = dataPointB.location.gridRow[0];

  //   console.log(colA, rowA, colB, rowB)


  //   let gridCol = "";
  //   let gridR = "";

  //   if(colA > colB){
  //     gridCol = colB + "/" + colA
  //   } else {
  //     gridCol = colA + "/" + colB
  //   }

  //   if(rowA > rowB){
  //     gridR = colB + "/" + colA
  //   } else {
  //     gridR = colA + "/" + colB
  //   }

  //   const line = {
  //     gridColumn: "",
  //     gridRow: ""
  //   }

  //   line.gridColumn = gridCol;
  //   line.gridRow = gridR;

  //   return <div className="line" style={line}></div>
  //}
}
 
export default MapGrid;
