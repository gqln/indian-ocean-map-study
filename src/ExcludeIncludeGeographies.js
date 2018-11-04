import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"

const wrapperStyles = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

const include = [
  "Africa", "Asia"
]

class ExcludeIncludeGeographies extends Component {
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{ scale: 1200 }}
          width={1400}
          height={1400}
          style={{
            width: "100%",
            height: "100%",
          }}
          >
          <ZoomableGroup center={[ 20, 0 ]} disablePanning>
            <Geographies geography={"world-10m.json"}>
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  include.indexOf(geography.properties.CONTINENT) !== -1 && (
                    <Geography
                      key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          hover: {
                            fill: "#CFD8DC",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#FF5722",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                        }}
                    />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default ExcludeIncludeGeographies;
