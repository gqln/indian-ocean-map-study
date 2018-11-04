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

class StraitsAndCanals extends Component {
  constructor() {
    super()
    this.state = {
      center: [75,10],
      zoom: 1,
      waters: [
        { name: "Strait of Hormuz", coordinates: [55.2933877, 26.7753326], dx:5, dy:10, hidden: true },
        { name: "Strait of Malacca", coordinates: [98.4366044,4.3771756], dx:5, dy:5, hidden: true },
        { name: "Suez Canal", coordinates: [32.1244647,30.3411909], dx:-2, dy:-2, hidden: true },
        { name: "Bab al-Mandeb", coordinates: [43.470741, 12.549935], dx:5, dy:-1, hidden: true },
        { name: "Lombok Strait", coordinates: [115.733333,-8.766667], dx:5, dy:5, hidden: true },
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
      center: [75,10],
      zoom: 1,
    })
  }

  viewAllClicked() {
    this.state.waters.map( water => water.hidden = false )
    this.setState({
      center: [75,10],
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
          <h1 style={titleStyles}>Straits, Gates, Capes, and Canals</h1>
        </div>
        <div style={wrapperStyles}>
          <ComposableMap
            projection = "mercator"
            projectionConfig={{
              scale: 275,
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

export default StraitsAndCanals