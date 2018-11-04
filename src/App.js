import React, { Component } from 'react';
import './App.css';
import Ports from './Ports.js';
import BodiesOfWater from './BodiesOfWater.js';
import StraitsAndCanals from './StraitsAndCanals.js';

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

class App extends Component {
  constructor() {
    super()
    this.state = {
      topic : "Ports"
    }
    this.mapSelected = this.mapSelected.bind(this)
  }

  renderMap(topic) {
    switch(topic) {
      case "Ports":
        return <Ports> </Ports>
      case "BodiesOfWater":
        return <BodiesOfWater> </BodiesOfWater>
      case "StraitsAndCanals":
        return <StraitsAndCanals> </StraitsAndCanals>
      default:
        return null;
    }
  }


  mapSelected(evt) {
    const topic = evt.target.getAttribute("data")
    this.setState({
      topic: topic
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
          {this.renderMap(this.state.topic)}
        </div>
    );
  }
}

export default App;
