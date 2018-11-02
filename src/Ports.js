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
  backgroundColor: "#607D8B",
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

  padding: "15px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignSelf:"center",
  flexDirection: "row",
  alignItems: "center",
  alignContent: "space-around",
  backgroundColor: "#ECEFF1",
  borderRadius: "28px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  border: "1px #607D8B solid"
}

const annotationTextStyles = {
  fontSize: "10px",
  fontWeight: "Bold",
  textShadow: "-1px -1px 2 white 1px -1px 2 white -1px 1px 2 white 1px 1px 2 white",
  WebkitTextStrokeWidth: "15px",
  WebkitTextStrokeColor: "white"
}

const cityButton = {
  margin: "5px",
  padding: "10px",
  paddingLeft: "25px",
  paddingRight: "25px",
  color: "#607D8B",
  backgroundColor: "white",
  fontSize: "18px",
  fontWeight: "Bold",
  borderRadius: "8px"
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


const include = [
  "Africa", "Asia", "Europe", "Oceania"
]

class Ports extends Component {
  constructor() {
    super()
    this.state = {
      center: [75,10],
      zoom: 1,
      cities: [
        { mapName: "Calcutta", name: "Calcutta, India", coordinates: [88.363892, 22.572645], dx:-3, dy:5, hidden: true },
        { mapName: "Hong Kong", name: "Hong Kong, China", coordinates: [114.109497, 22.396427], dx:5, dy:10, hidden: true },
        { mapName: "Istanbul", name: "Istanbul (Constantinople), Turkey", coordinates: [28.978359, 41.008240], dx:5, dy:5, hidden: true },
        { mapName: "Sohar", name: "Sohar, Oman", coordinates: [56.752079, 24.325871], dx:-2, dy:-2, hidden: true },
        { mapName: "Muscat", name: "Muscat, Oman", coordinates: [58.405922, 23.585890], dx:5, dy:-1, hidden: true },
        { mapName: "Madras", name: "Madras (Chennai), India", coordinates: [80.270721, 13.082680], dx:5, dy:5, hidden: true },
        { mapName: "Jakarta", name: "Jakarta (Batavia), Indonesia", coordinates: [106.865036, -6.175110], dx:-5, dy:5, hidden: true },
        { mapName: "Sofala", name: "Sofala, Mozambique", coordinates: [34.786780, -19.072660], dx:5, dy:-5, hidden: true },
        { mapName: "Surat", name: "Surat, India", coordinates: [72.839233, 21.203510], dx:-5, dy:5, hidden: true },
        { mapName: "Chittagong", name: "Chittagong, Bangladesh", coordinates: [91.783180, 22.356852], dx:5, dy:-5, hidden: true },
        { mapName: "Mogadishu", name: "Mogadishu, Somalia", coordinates: [45.318161, 2.046934], dx:5, dy:5, hidden: true },
        { mapName: "Alexandria", name: "Alexandria, Egypt", coordinates: [29.918739, 31.200092], dx:0, dy:12, hidden: true },
        { mapName: "Aden", name: "Aden, Yemen", coordinates: [45.035469, 12.809800], dx:1, dy:10, hidden: true },
        { mapName: "Colombo", name: "Colombo, Sri Lanka", coordinates: [79.861244, 6.927079], dx:-5, dy:5, hidden: true },
        { mapName: "Canton", name: "Guangzho (Canton), China", coordinates: [113.288880, 23.130280], dx:1, dy:-5, hidden: true },
        { mapName: "Calicut", name: "Calicut (Kozhikode), India", coordinates: [75.795502, 11.234130], dx:-5, dy:-5, hidden: true },
        { mapName: "Mokha", name: "Mokha, Yemen", coordinates: [43.249530, 13.320810], dx:-5, dy:-5, hidden: true },
        { mapName: "Zanzibar", name: "Zanzibar, Tanzania", coordinates: [39.195339, -6.158160], dx:5, dy:-5, hidden: true },
        { mapName: "Masulipatnam", name: "Masulipatnam (Machilipatnam), India", coordinates: [81.132492, 16.178600], dx:1, dy:-5, hidden: true },
        { mapName: "Singapore", name: "Singapore", coordinates: [103.819839, 1.352083], dx:5, dy:-5, hidden: true },
      ]
    }
    this.citySelected = this.citySelected.bind(this)
    this.resetClicked = this.resetClicked.bind(this)
    this.viewAllClicked = this.viewAllClicked.bind(this)
    this.toggleCityName = this.toggleCityName.bind(this)
  }

  citySelected(evt) {
    const cityId = evt.target.getAttribute("data-city")
    const city = this.state.cities[cityId]
    city.hidden = false
    this.setState({
      center: city.coordinates,
      zoom: 2,
    })
  }

  resetClicked() {
    this.state.cities.map( city => city.hidden = true )
    this.setState({
      center: [75,10],
      zoom: 1,
    })
  }

  viewAllClicked() {
    this.state.cities.map( city => city.hidden = false )
    this.setState({
      center: [75,10],
      zoom: 1,
    })
  }

  toggleCityName(city) {
    city.hidden = !city.hidden
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
          <h1 style={titleStyles}>Ports</h1>
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
              <Geographies geography={"world-50m.json"}>
                {(geographies, projection) => geographies.map((geography, i) => include.indexOf(geography.properties.CONTINENT) !== -1 && (
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
                  this.state.cities.map((city, i) => (
                    <Marker key={i} marker={city}>
                      <circle
                        cx={0}
                        cy={0}
                        r={2.25}
                        fill="#FF5722"
                        onClick={() => this.toggleCityName(city)}
                      />
                    </Marker>
                  ))
                }
              </Markers>
              <Annotations>
                {
                this.state.cities.map((city, i) => (
                  <Annotation
                    dx={ city.dx }
                    dy={ city.dy }
                    subject={ city.coordinates }
                    strokeWidth={ 0 }
                    style={{ visibility: city.hidden ? 'hidden' : 'visible' }}>
                    <text id={ city.mapName + "Annotation"} style={ annotationTextStyles } >{ city.mapName }</text>
                  </Annotation>
                      ))
                }
              </Annotations>
            </ZoomableGroup>
          </ComposableMap>
        </div>
        <div style={buttonStyles}>
          {
            this.state.cities.map((city, i) => (
              <button
                key={i}
                className="btn px1"
                data-city={i}
                onClick={this.citySelected}
                style={cityButton}
                >
                { city.name }
              </button>
            ))
          }
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

export default Ports