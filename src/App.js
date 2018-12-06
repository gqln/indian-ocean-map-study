import React, { Component } from 'react';
import Map from './Map.js'
import './App.css';

const barStyles = {
  height: "60px",

  zIndex: 2,

  position: "fixed",
  top:0,

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "4px solid #506D7B",
  maxWidth: "100%",
  right: 25,
  left: 25,
  flexDirection: "row"
  // color:"#607D8B",
  // backgroundColor: "#ECEFF1"
}

const titleStyles = {
  fontSize: "25px",
  color:"#ECEFF1",
}

const ports = {
  name: "The Last Century",
  center: [75,10],
  zoom: 1,
  showButtons: true,
  elements: [
    { mapName: "Masjid e Suleiman", name: "Masjid e Suleiman", coordinates: [49.286903, 31.972681], dx:-3, dy:5, hidden: true, timeStart: 1908, timeEnd: 1999 },
    { mapName: "Kirkuk", name: "Kirkuk, Iraq", coordinates: [44.378754, 35.456193], dx:5, dy:10, hidden: true, timeStart: 1927, timeEnd: 1999 },
    { mapName: "Jebel Dukham", name: "Jebel Dukham, Bahrain", coordinates: [50.546344, 26.044488], dx:5, dy:5, hidden: true, timeStart: 1932, timeEnd: 1999 },
    { mapName: "Dammam", name: "Dammam, Saudi Arabia", coordinates: [50.118168, 26.426153], dx:-2, dy:-2, hidden: true, timeStart: 1938, timeEnd: 1999 },
    { mapName: "Tokyo", name: "Tokyo, Japan", coordinates: [139.822209, 35.678973], dx:5, dy:-1, hidden: true, timeStart: 1902, timeEnd: 1999 },
    { mapName: "Jidda", name: "Jidda, Saudi Arabia", coordinates: [39.204035, 21.485854], dx:5, dy:5, hidden: true, timeStart: 1933, timeEnd: 1999 },
    { mapName: "Al-Hasa", name: "Al-Hasa, Saudi Arabia", coordinates: [49.584494, 25.364367], dx:-5, dy:5, hidden: true, timeStart: 1935, timeEnd: 1999 },
    ],
  events: {
    4.25: { active: [0], center: null, zoom: 2, time: 1908 },
    11.50: { active: [1], center: null, zoom: 2, time: 1927 },
    22.75: { active: [2], center: null, zoom: 2, time: 1932 },
    27.75: { active: [3], center: null, zoom: 2, time: 1938 },
    43.75: { active: [4], center: null, zoom: 2, time: 1902 },
    48.75: { active: [], center: [40.204035, 21.485854], zoom: 2, time: 1939 },
    81.75: { active: [5], center: null, zoom: 2, time: 1933 },
    103.75: { active: [6], center: null, zoom: 2, time: 1935 },
    115.75: { active: [], center: [77.752446, 18.537628], zoom: 1, time: 1939 },
  }
}

const straitsAndCanals = {
  name: "Straits, Gates, Capes, and Canals",
  center: [75,10],
  zoom: 1,
  showButtons: false,
  elements: [
    { name: "Strait of Hormuz", coordinates: [55.2933877, 26.7753326], dx:5, dy:10, hidden: true },
    { name: "Strait of Malacca", coordinates: [98.4366044,4.3771756], dx:5, dy:5, hidden: true },
    { name: "Suez Canal", coordinates: [32.1244647,30.3411909], dx:-2, dy:-2, hidden: true },
    { name: "Bab al-Mandeb", coordinates: [43.470741, 12.549935], dx:5, dy:-1, hidden: true },
    { name: "Lombok Strait", coordinates: [115.733333,-8.766667], dx:5, dy:5, hidden: true },
  ]
}

const bodiesOfWater = {
  name: "Bodies of Water",
  center: [55,10],
  zoom: 1,
  showButtons: false,
  elements: [
    { name: "Atlantic Ocean", coordinates: [-25, 0], dx:-3, dy:5, hidden: true },
    { name: "Mediterranean Sea", coordinates: [19.575836, 34.642244], dx:5, dy:10, hidden: true },
    { name: "Red Sea", coordinates: [38.476024, 20.218116], dx:5, dy:5, hidden: true },
    { name: "Persian Gulf", coordinates: [51.478464, 26.994955], dx:-2, dy:-2, hidden: true },
    { name: "Pacific Ocean", coordinates: [139.884671, 23.423158], dx:5, dy:-1, hidden: true },
    { name: "South China Sea", coordinates: [114.020380, 15.507292], dx:5, dy:5, hidden: true },
    { name: "Bay of Bengal", coordinates: [87.661210, 13.298417], dx:-5, dy:5, hidden: true },
    { name: "Indian Ocean", coordinates: [77.752446, -14.537628], dx:5, dy:-5, hidden: true },
    { name: "Lake Victoria", coordinates: [32.996394, -1.079183], dx:-5, dy:5, hidden: true },
    { name: "Arabian Sea", coordinates: [59.539337, 16.594514], dx:5, dy:-5, hidden: true },
  ]
}

const contentMap = {
  "Ports" : ports,
  "BodiesOfWater" : bodiesOfWater,
  "StraitsAndCanals" : straitsAndCanals
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      name: ports.name,
      center: ports.center,
      zoom: ports.zoom,
      elements: ports.elements,
      events: ports.events,
      showButtons: ports.showButtons
    }
    this.mapSelected = this.mapSelected.bind(this)
    this.resetClicked = this.resetClicked.bind(this)
    this.viewAllClicked = this.viewAllClicked.bind(this)
    this.toggleElementName = this.toggleElementName.bind(this)
    this.selectElement = this.selectElement.bind(this)
  }

  resetClicked() {
    const newElements = this.state.elements
    newElements.map( element => element.hidden = true )
    this.setState({ elements: newElements })
  }

  viewAllClicked() {
    const newElements = this.state.elements
    newElements.map( element => element.hidden = false )
    this.setState({ elements: newElements })
  }

  toggleElementName(elementId) {
    const newElements = this.state.elements
    newElements[elementId].hidden = !newElements[elementId].hidden
    this.setState({ elements: newElements })
  }

  selectElement(elementId) {
    const newElements = this.state.elements
    newElements[elementId].hidden = false
    this.setState({ elements: newElements })
  }

  mapSelected(evt) {
    const contentName = evt.target.getAttribute("data")
    const content = contentMap[contentName]
    console.log(content.elements)
    this.setState({
      name: content.name,
      center: content.center,
      zoom: content.zoom,
      elements: content.elements,
      events: content.events,
      showButtons: content.showButtons
    })
  }

  render() {
    return (
        <div>
          <div style={barStyles}>
          <h1 style={titleStyles}>HIST 169</h1>
            {/*<div className="btn-group">
              <button style={leftButton} data={"Ports"} onClick={this.mapSelected}>Ports</button>
              <button style={centerButton} data={"BodiesOfWater"} onClick={this.mapSelected}>Bodies of Water</button>
              <button style={rightButton} data={"StraitsAndCanals"} onClick={this.mapSelected}>Straits and Canals</button>
            </div>*/}
          </div>
          <Map name={this.state.name} center={this.state.center} zoom={this.state.zoom} elements={this.state.elements} events={this.state.events} showButtons={this.state.showButtons} handleReset={this.resetClicked} handleViewAll={this.viewAllClicked} handleToggleElement={this.toggleElementName} handleSelectElement={this.selectElement}/>
        </div>
    );
  }
}

export default App;
