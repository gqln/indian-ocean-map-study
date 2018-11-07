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

const leftButton = {
  padding: "10px",
  paddingLeft: "25px",
  paddingRight: "25px",
  color: "#607D8B",
  backgroundColor: "white",
  fontSize: "18px",
  fontWeight: "Bold",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
}

const centerButton = {
  padding: "10px",
  paddingLeft: "25px",
  paddingRight: "25px",
  color: "#607D8B",
  backgroundColor: "white",
  fontSize: "18px",
  fontWeight: "Bold",
  borderTopRightRadius: "0.0001px",
}

const rightButton = {
  padding: "10px",
  paddingLeft: "25px",
  paddingRight: "25px",
  color: "#607D8B",
  backgroundColor: "white",
  fontSize: "18px",
  fontWeight: "Bold",
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
}

const titleStyles = {
  fontSize: "25px",
  color:"#ECEFF1",
}

const ports = {
  name: "Ports",
  center: [75,10],
  zoom: 1,
  showButtons: true,
  elements: [
    { mapName: "Calcutta", name: "Calcutta, India", coordinates: [88.363892, 22.572645], dx:-3, dy:5, hidden: true, timeStart: 1200, timeEnd: 1350 },
    { mapName: "Hong Kong", name: "Hong Kong, China", coordinates: [114.109497, 22.396427], dx:5, dy:10, hidden: true, timeStart: 1410, timeEnd: 1999 },
    { mapName: "Istanbul", name: "Istanbul (Constantinople), Turkey", coordinates: [28.978359, 41.008240], dx:5, dy:5, hidden: true, timeStart: 1500, timeEnd: 1700 },
    { mapName: "Sohar", name: "Sohar, Oman", coordinates: [56.752079, 24.325871], dx:-2, dy:-2, hidden: true, timeStart: 1300, timeEnd: 1800 },
    { mapName: "Muscat", name: "Muscat, Oman", coordinates: [58.405922, 23.585890], dx:5, dy:-1, hidden: true, timeStart: 1000, timeEnd: 1800 },
    { mapName: "Madras", name: "Madras (Chennai), India", coordinates: [80.270721, 13.082680], dx:5, dy:5, hidden: true, timeStart: 500, timeEnd: 1900 },
    { mapName: "Jakarta", name: "Jakarta (Batavia), Indonesia", coordinates: [106.865036, -6.175110], dx:-5, dy:5, hidden: true, timeStart: 1801, timeEnd: 1998 },
    { mapName: "Sofala", name: "Sofala, Mozambique", coordinates: [34.786780, -19.072660], dx:5, dy:-5, hidden: true, timeStart: 1345, timeEnd: 1603 },
    { mapName: "Surat", name: "Surat, India", coordinates: [72.839233, 21.203510], dx:-5, dy:5, hidden: true, timeStart: 1120, timeEnd: 1963 },
    { mapName: "Chittagong", name: "Chittagong, Bangladesh", coordinates: [91.783180, 22.356852], dx:5, dy:-5, hidden: true, timeStart: 1902, timeEnd: 1820 },
    { mapName: "Mogadishu", name: "Mogadishu, Somalia", coordinates: [45.318161, 2.046934], dx:5, dy:5, hidden: true, timeStart: 1520, timeEnd: 1920 },
    { mapName: "Alexandria", name: "Alexandria, Egypt", coordinates: [29.918739, 31.200092], dx:0, dy:12, hidden: true, timeStart: 1000, timeEnd: 1345 },
    { mapName: "Aden", name: "Aden, Yemen", coordinates: [45.035469, 12.809800], dx:1, dy:10, hidden: true, timeStart: 1329, timeEnd: 1818 },
    { mapName: "Colombo", name: "Colombo, Sri Lanka", coordinates: [79.861244, 6.927079], dx:-5, dy:5, hidden: true, timeStart: 1810, timeEnd: 1942 },
    { mapName: "Canton", name: "Guangzho (Canton), China", coordinates: [113.288880, 23.130280], dx:1, dy:-5, hidden: true, timeStart: 1933, timeEnd: 2000 },
    { mapName: "Calicut", name: "Calicut (Kozhikode), India", coordinates: [75.795502, 11.234130], dx:-5, dy:-5, hidden: true, timeStart: 2001, timeEnd: 2019 },
    { mapName: "Mokha", name: "Mokha, Yemen", coordinates: [43.249530, 13.320810], dx:-5, dy:-5, hidden: true, timeStart: 1789, timeEnd: 2012 },
    { mapName: "Zanzibar", name: "Zanzibar, Tanzania", coordinates: [39.195339, -6.158160], dx:5, dy:-5, hidden: true, timeStart: 1302, timeEnd: 1580 },
    { mapName: "Masulipatnam", name: "Masulipatnam (Machilipatnam), India", coordinates: [81.132492, 16.178600], dx:1, dy:-5, hidden: true, timeStart: 1402, timeEnd: 1599 },
    { mapName: "Singapore", name: "Singapore", coordinates: [103.819839, 1.352083], dx:5, dy:-5, hidden: true, timeStart: 1394, timeEnd: 1821 },
  ]
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
      showButtons: content.showButtons
    })
  }

  render() {
    return (
        <div>
          <div style={barStyles}>
          <h1 style={titleStyles}>HIST 169</h1>
            <div className="btn-group">
              <button style={leftButton} data={"Ports"} onClick={this.mapSelected}>Ports</button>
              <button style={centerButton} data={"BodiesOfWater"} onClick={this.mapSelected}>Bodies of Water</button>
              <button style={rightButton} data={"StraitsAndCanals"} onClick={this.mapSelected}>Straits and Canals</button>
            </div>
          </div>
          <Map name={this.state.name} center={this.state.center} zoom={this.state.zoom} elements={this.state.elements} showButtons={this.state.showButtons} handleReset={this.resetClicked} handleViewAll={this.viewAllClicked} handleToggleElement={this.toggleElementName} handleSelectElement={this.selectElement}/>
        </div>
    );
  }
}

export default App;
