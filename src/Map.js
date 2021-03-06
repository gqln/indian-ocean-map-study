import React, { Component,  } from "react"
import { Motion, spring } from "react-motion"
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
  backgroundColor: "#b9d3c2"
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

const crosshairs = {
  position: "fixed",
  top: "50%",
  bottom: "50%",
  left: "50%",
  right: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none",
  fontSize: "16px",
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

const elementButton = {
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

class Map extends Component {
  state = {
      center: this.props.center,
      minZoom: 0.5,
      maxZoom: 5.0,
      zoom: this.props.zoom,
      time: 1900,
      labels: {},
      labels2: []
    }

  constructor(props) {
    super(props)
    this.elementSelected = this.elementSelected.bind(this)
    this.resetClicked = this.resetClicked.bind(this)
    this.viewAllClicked = this.viewAllClicked.bind(this)
    this.toggleElementName = this.toggleElementName.bind(this)
    this.updateMap = this.updateMap.bind(this)

    this.zoomOnWheel = this.zoomOnWheel.bind(this)
		document.addEventListener('wheel', this.zoomOnWheel, {passive: true});

  }

  elementSelected(key, element) {
    if (element.timeStart < this.state.time && element.timeEnd > this.state.time) {
      this.props.handleSelectElement(key)
    }
    this.setState({
      center: element.coordinates,
      zoom: 2,
    })
  }

  resetClicked() {
  	this.props.handleReset()
    this.setState({
      center: this.props.center,
      zoom: 1,
    })
  }

  viewAllClicked() {
  	this.props.handleViewAll()
    this.setState({
      center: this.props.center,
      zoom: 1,
    })
  }

  toggleElementName(elementId) {
    this.props.handleToggleElement(elementId)
  }

  zoomOnWheel(event) {
  	this.setState({
  		zoom: Math.min(Math.max(this.state.minZoom, this.state.zoom + event.wheelDelta/1000), this.state.maxZoom),
   	})
	}

  renderButtons() {
  	if (this.props.showButtons) {
	  	return (this.props.elements.map((element, i) => (
					      <button
					        key={i}
					        className="btn px1"
					        onClick={() => this.elementSelected(i, element)}
					        style={elementButton}
					        >
					        { element.name }
					      </button> 
	  						))
							)
		} 
  }

  updateMap(time) {
    var adjustedTime = Math.floor(time * 4)/4
    
    var event = this.props.events[adjustedTime]

    if (event !== null && adjustedTime !== this.state.justMoved) {
      for (var index in event.active) {
        var id = event.active[index]
        this.props.handleSelectElement(id)
      } 

      if (event.center != null) {
        this.setState({
          center: event.center
        })
      } else if (event.active.length > 0) {
        id = event.active[0]
        var center = this.props.elements[id].coordinates
        this.setState({
          center: center
        })
      }

      this.setState({
        zoom: event.zoom,
        justMoved: adjustedTime,
        time: event.time
      })
    }
  }

  render() {
    return (
      <div style={container}>
        <div style={barStyles}>
          <h1 style={titleStyles}>{this.props.name}</h1>
        </div>
        <div style={wrapperStyles}>
        	<div style={crosshairs}> 
        		╳
        	</div>
          <Motion
          defaultStyle={{
            zoom: 1,
            x: 0,
            y: 20,
          }}
          style={{
            zoom: spring(this.state.zoom, {stiffness: 210, damping: 20}),
            x: spring(this.state.center[0], {stiffness: 210, damping: 20}),
            y: spring(this.state.center[1], {stiffness: 210, damping: 20}),
          }}
          >
          {({zoom,x,y}) => (
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
              <ZoomableGroup center={[x,y]} zoom={zoom}>
                <Geographies geography={"world-10m.json"}>
                  {(geographies, projection) => geographies.map((geography, i) => (
                    <Geography
                      id={geography.properties.NAME}
                      key={geography.properties.NAME}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: "#dfd2ae",
                          stroke: "#c9a996",
                          strokeWidth: 0.5, 
                          outline: "none",
                        },
                        hover: {
                          fill: "#dfd2ae",
                          stroke: "#c9a996",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#ffcc0d",
                          stroke: "#4d65e3",
                          strokeWidth: 0,
                          outline: "none",
                        },
                      }}
                    />
                  ))}
                </Geographies>
                <Markers zoom={1}>
                  {
                    this.props.elements.map((element, i) => (
                      <Marker key={i} marker={element}>
                        <circle
                          cx={0}
                          cy={0}
                          r={2.25}
                          fill="#FF5722"
                          onClick={() => this.toggleElementName(i)}
                        />
                      </Marker>
                    ))
                  }
                </Markers>
                <Annotations>
                  {
                  this.props.elements.map((element, i) => (
                    <Annotation key={element.name}
                      dx={ element.dx }
                      dy={ element.dy }
                      subject={ element.coordinates }
                      strokeWidth={ 0 }
                      style={{ visibility: element.hidden ? 'hidden' : 'visible' }}>
                      <text id={ element.mapName + "Annotation"} style={ annotationTextStyles } > { element.mapName ? element.mapName : element.name }</text>
                    </Annotation>))
                  }
                </Annotations>
              </ZoomableGroup>
            </ComposableMap>
            )}
          </Motion>
        </div>
        <div style={buttonStyles}>
        { this.renderButtons() }
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

export default Map