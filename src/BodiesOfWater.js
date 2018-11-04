import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
  Annotation,
  Annotations
} from "react-simple-maps"

const wrapperStyles = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "white"
}

const barStyles = {
  height: "60px",

  zIndex: 1,

  position: "fixed",
  top:0,

  display: "flex",
  justifyContent: "center",
  alignSelf:"center",
  alignItems: "center",
  borderBottom: "4px solid #506D7B",
  width: "100%",
  color:"#ECEFF1",
  backgroundColor: "#607D8B"
}

const container = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const titleStyles = {
  fontSize: "25px"
}

const buttonStyles = {
  height: "auto",

  position: "fixed",
  bottom:0,
  right: 0,

  padding: "15px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignSelf:"center",
  flexDirection: "row",
  alignItems: "center",
  alignContent: "space-around",
  backgroundColor: "#ECEFF1",
  borderTopLeftRadius: "28px",
  border: "1px #607D8B solid"
}

const annotationTextStyles = {
  fontSize: "10px",
  fontWeight: "Bold",
  textShadow: "-5px 0 white, 0 5px white, 5px 0 white, 0 -5px white"
}

const resetButton = {
  margin: "5px",
  padding: "10px",
  paddingLeft: "25px",
  paddingRight: "25px",
  color: "red",
  backgroundColor: "white",
  fontSize: "18px",
  fontWeight: "Bold",
  borderRadius: "8px"
}

class BodiesOfWater extends Component {
  constructor() {
    super()
    this.state = {
      center: [55,10],
      zoom: 1,
      waters: [
        { name: "Atlantic Ocean", coordinates: [-25, 0], dx:-3, dy:5, hidden: true },
        { name: "Mediterranean Sea", coordinates: [19.575836, 34.642244], dx:5, dy:10, hidden: true },
        { name: "Red Sea", coordinates: [38.476024, 20.218116], dx:5, dy:5, hidden: true },
        { name: "Persian Gulf", coordinates: [51.478464, 26.994955], dx:-2, dy:-2, hidden: true },
        { name: "Pacific Ocean", coordinates: [139.884671, 23.423158], dx:5, dy:-1, hidden: true },
        { name: "South China Sea", coordinates: [15.507292, 114.020380], dx:5, dy:5, hidden: true },
        { name: "Bay of Bengal", coordinates: [87.661210, 13.298417], dx:-5, dy:5, hidden: true },
        { name: "Indian Ocean", coordinates: [77.752446, -14.537628], dx:5, dy:-5, hidden: true },
        { name: "Lake Victoria", coordinates: [32.996394, -1.079183], dx:-5, dy:5, hidden: true },
        { name: "Arabian Sea", coordinates: [59.539337, 16.594514], dx:5, dy:-5, hidden: true },
      ]
    }
    // this.citySelected = this.citySelected.bind(this)
    this.resetClicked = this.resetClicked.bind(this)
    this.viewAllClicked = this.viewAllClicked.bind(this)
    this.toggleWaterName = this.toggleWaterName.bind(this)
  }

  // citySelected(evt) {
  //   const cityId = evt.target.getAttribute("data-city")
  //   const city = this.state.cities[cityId]
  //   city.hidden = false
  //   this.setState({
  //     center: city.coordinates,
  //     zoom: 2,
  //   })
  // }

  resetClicked() {
    this.state.waters.map( water => water.hidden = true )
    this.setState({
      center: [55,10],
      zoom: 1,
    })
  }

  viewAllClicked() {
    this.state.waters.map( water => water.hidden = false )
    this.setState({
      center: [55,10],
      zoom: 1,
    })
  }

  toggleWaterName(water) {
    water.hidden = !water.hidden
    this.setState({

    })
  }

  zoom() {
    this.setState({
      zoom: this.state.zoom + 0.25,
    })
  }

  render() {
    return (
      <div style={container} onWheel={ event => {
           this.setState({
              zoom: Math.min(Math.max(0.5, this.state.zoom + event.nativeEvent.wheelDelta/1000), 5.0),
            })
         }}>
        <div style={barStyles}>
          <h1 style={titleStyles}>Bodies of Water</h1>
        </div>
        <div style={wrapperStyles}>
          <ComposableMap
            projection = "mercator"
            projectionConfig={{
              scale: 200,
            }}
            
            style={{
              viewBox: "0 0 1920 1080",
              minHeight: "100%", 
              minWidth: "100%",
            }}
            >
            <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
              <Geographies geography={"world-10m.json"}>
                {(geographies, projection) => geographies.map((geography, i) => (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: "#ECEFF1",
                        stroke: "#607D8B",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "#ECEFF1",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#ECEFF1",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                    }}
                  />
                ))}
              </Geographies>
              <Markers>
                {
                  this.state.waters.map((water, i) => (
                    <Marker key={i} marker={water}>
                      <circle
                        cx={0}
                        cy={0}
                        r={2.25}
                        fill="#FF5722"
                        onClick={() => this.toggleWaterName(water)}
                      />
                    </Marker>
                  ))
                }
              </Markers>
              <Annotations>
                {
                this.state.waters.map((water, i) => (
                  <Annotation
                    dx={ water.dx }
                    dy={ water.dy }
                    subject={ water.coordinates }
                    strokeWidth={ 0 }
                    style={{ visibility: water.hidden ? 'hidden' : 'visible' }}>
                    <text id={ water.name + "Annotation"} style={ annotationTextStyles } >{ water.name }</text>
                  </Annotation>
                      ))
                }
              </Annotations>
            </ZoomableGroup>
          </ComposableMap>
        </div>
        <div style={buttonStyles}>
          <button style={resetButton} onClick={this.resetClicked}>
            { "Reset" }
          </button>
          <button style={resetButton} onClick={this.viewAllClicked}>
            { "Show Answers" }
          </button>
        </div>
      </div>
    )
  }
}

export default BodiesOfWater