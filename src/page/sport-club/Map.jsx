import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import {
  fetchMaps,
  seleteAllMaps,
} from "../../redux/feature/mapSlice/MapSlices";
import debounce from "lodash/debounce";

const containerStyle = {
  width: "800px",
  height: "600px",
};

function Map() {
  const dispatch = useDispatch();
  const maps = useSelector(seleteAllMaps);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [distance, setDistance] = useState(null);
  const [startLocation] = useState({
    lat: 11.578359693811585,
    lng: 104.90177606762974,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchMaps());
  }, [dispatch]);

  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      maps.forEach((marker) => {
        bounds.extend({
          lat: parseFloat(marker.latitude),
          lng: parseFloat(marker.longitude),
        });
      });
      map.fitBounds(bounds);
      setMap(map);
    },
    [maps]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerHover = (marker) => {
    setHoveredMarker(marker);
  };

  const handleMarkerHoverExit = () => {
    setHoveredMarker(null);
  };

  const calculateDistance = (marker) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [startLocation],
        destinations: [
          {
            lat: parseFloat(marker.latitude),
            lng: parseFloat(marker.longitude),
          },
        ],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === window.google.maps.DistanceMatrixStatus.OK) {
          setDistance(response.rows[0].elements[0].distance.text);
        } else {
          console.error("Error calculating distance:", status);
        }
      }
    );
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    calculateDistance(marker);
    map.panTo({
      lat: parseFloat(marker.latitude),
      lng: parseFloat(marker.longitude),
    });
  };

  const debouncedSearch = useCallback(
    debounce((term) => {
      const filteredMarker = maps.find((marker) =>
        marker.sport_name.toLowerCase().includes(term.toLowerCase().trim())
      );
      if (filteredMarker) {
        setSelectedMarker(filteredMarker);
      }
    }, 300),
    [maps]
  );

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const filteredMaps = searchTerm
    ? maps.filter((marker) =>
        marker.sport_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim())
      )
    : maps;

  useEffect(() => {
    if (selectedMarker) {
      handleMarkerClick(selectedMarker);
    }
  }, [selectedMarker]);

  return isLoaded ? (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
      />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: startLocation.lat,
          lng: startLocation.lng,
        }}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {filteredMaps.map((marker, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(marker.latitude),
              lng: parseFloat(marker.longitude),
            }}
            label={{
              text: marker.sport_name,
              className: "custom-label",
            }}
            onMouseOver={() => handleMarkerHover(marker)}
            onMouseOut={handleMarkerHoverExit}
            onClick={() => handleMarkerClick(marker)}
          >
            {hoveredMarker && hoveredMarker === marker && (
              <InfoWindow
                position={{
                  lat: parseFloat(marker.latitude),
                  lng: parseFloat(marker.longitude),
                }}
                options={{
                  disableAutoPan: true,
                }}
              >
                <div className="w-[300px] h-[250px] bg-white shadow-lg rounded-lg p-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {marker.sport_name}
                  </h3>
                  {selectedMarker === marker && distance && (
                    <p className="text-gray-600 mb-4">Distance: {distance}</p>
                  )}
                  <img
                    className="w-full h-48 object-cover rounded-lg"
                    alt={marker.sport_name}
                    src={marker.image}
                  />
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);
