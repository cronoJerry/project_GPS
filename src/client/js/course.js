const locationMap = document.getElementById("location-map");

let map;
let markers = [];
// 분기점을 만들기 위한 변수
let isMapDrawn = false;
let userLatitude;
let userLongitude;

const drawMap = (latitude, longitude) => {
    const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 2,
    };
    map = new kakao.maps.Map(locationMap, options);
    map.setZoomable(false);
};

const deleteMarkers = () => {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
};

const addUserMarker = () => {
    let marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(userLatitude, userLongitude),
    });
    markers.push(marker);
};

const addCourseMarker = () => {
    let markerImage = "/file/map_not_done.png";
    let markerSize = new kakao.maps.Size(24, 35);

    const image = new kakao.maps.MarkerImage(markerImage, markerSize);
    const position = new kakao.maps.LatLng(
        35.87558554748438,
        128.6814743128405
    );
    new kakao.maps.Marker({
        map,
        position,
        title: "영진직업전문학교",
        image,
    });
};

const configurationLocationWatch = () => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            deleteMarkers();
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            // 지도를 한번만 그리기 위해서 false를 true로 바꿔줘서 막아줌
            if (!isMapDrawn) {
                drawMap(userLatitude, userLongitude);
                isMapDrawn = true;
            }
            // drawing user marker
            addUserMarker();
            addCourseMarker();
        });
    }
};

// drawMap(35.87558554748438, 128.6814743128405);
configurationLocationWatch();
