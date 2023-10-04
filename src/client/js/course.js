const locationMap = document.getElementById("location-map");

let map;
let markers = [];
// 분기점을 만들기 위한 변수
let isMapDrawn = false;
let userLatitude;
let userLongitude;
// TODO 추후 사라질 수 있음
let courseListInfo = [];

let clickCourseId = 0;

// function declaration
const drawMap = (latitude, longitude) => {
    const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 3,
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

const panTo = (latitude, longitude) => {
    map.panTo(new kakao.maps.LatLng(latitude, longitude));
};

// course marker making
const addCourseMarker = (course) => {
    let markerImage = "/file/map_not_done.png";
    let markerSize = new kakao.maps.Size(24, 35);

    if (course.users_course_id) {
        markerImage = "/file/map_complete.jpg";
        markerSize = new kakao.maps.Size(40, 50);
    }

    const image = new kakao.maps.MarkerImage(markerImage, markerSize);
    const position = new kakao.maps.LatLng(
        course.course_latitude,
        course.course_longitude
    );
    new kakao.maps.Marker({
        map,
        position,
        title: course.course_name,
        image,
    });
};

const clickCourseList = (e, courseId) => {
    if (clickCourseId !== courseId) {
        const courseWrap = document.querySelectorAll(".course");
        for (let i = 0; i < courseWrap.length; i++) {
            courseWrap[i].classList.remove("on");
        }
        e.currentTarget.classList.add("on");

        let courseLatitude;
        let courseLongitude;

        if (courseId === 0) {
            courseLatitude = userLatitude;
            courseLongitude = userLongitude;
        } else {
            let matchedCourse = courseListInfo.find(
                (course) => course.course_id === courseId
            );
            courseLatitude = matchedCourse.course_latitude;
            courseLongitude = matchedCourse.course_longitude;
        }
        panTo(courseLatitude, courseLongitude);
        clickCourseId = courseId;
    }
};

// 모든 코스를 돌면서 마커를 그리기 위한 함수
const allCourseMarker = () => {
    for (let i = 0; i < courseListInfo.length; i++) {
        addCourseMarker(courseListInfo[i]);
    }
};

const configurationLocationWatch = () => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            deleteMarkers();
            console.log("hi");
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            // 지도를 한번만 그리기 위해서 false를 true로 바꿔줘서 막아줌
            if (!isMapDrawn) {
                drawMap(userLatitude, userLongitude);
                allCourseMarker();
                isMapDrawn = true;
            }
            // drawing user marker
            addUserMarker();
            if (clickCourseId === 0) {
                panTo(userLatitude, userLongitude);
            }
        });
    }
};

const makeNavigationHtml = () => {
    const courseWrap = document.getElementById("course-wrap");
    let html = "";
    for (let i = 0; i < courseListInfo.length; i++) {
        html += `<li class="course" onClick="clickCourseList(event,${courseListInfo[i].course_id})">`;
        if (courseListInfo[i].users_course_id) {
            html += `<div class="mark-wrap"><img src="/file/complete.png" /></div>`;
        }
        html += ` <p>${courseListInfo[i].course_name}</p>`;
        html += `</li>`;
    }
    html += `<li id="myPosition" class="course on" onClick="clickCourseList(event,0)">나의 위치</li>`;
    courseWrap.innerHTML = html;
};

// 코스 정보를 받아온 다음에 할 일
const afterGetCourseList = () => {
    makeNavigationHtml();
    configurationLocationWatch();
};

// 백엔드 서버로 코스정보 요청
const getCourseListFetch = async () => {
    const response = await fetch("/api/courses");
    const result = await response.json();
    courseListInfo = result;
    afterGetCourseList();
};

// drawMap(35.87558554748438, 128.6814743128405);
getCourseListFetch();
