//비디오 가져오기
var video = document.getElementById("myVideo");

//버튼 가져오기
var btn = document.getElementById("myBtn");

//비디오 일시 중지 및 재생 및 단추 텍스트 변경
function myFunction() {
    if (video.paused) {
        video.play();
        btn.innerHTML = "Pause";
    } else {
        video.pause();
        btn.innerHTML = "Play";
    }
}
