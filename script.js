const video = document.getElementById("video");
const snap = document.getElementById("snap")
const canvas = document.getElementById("canvas");
const countdown = document.getElementById("countdown")
const ctx = canvas.getContext("2d");
let photo = 1;


navigator.mediaDevices.getUserMedia({video:true})
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.log("Error:" + err);
    })


function chooseBooth(templateName) {
    currentBooth = templateName;
    video.style.filter = boothFilters(templateName);
}

snap.addEventListener("click", () => {
    photo = 1;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight * 4;
    takePhoto()
    if(templateName) {
        const templateImage = new Image();
        templateImage.src = "template/" + templateName;
        templateImage.onload = () =>{
            ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);
        }
    }
    })

function takePhoto(){
    if (photo>4) return;
    let count = 3;
    countdown.textContent = count
    const countdowntimer = setInterval(() => {
        countdown.textContent = count;
        count--;
        if (count<0) {
            ctx.save();
            ctx.scale(-1,1);
            ctx.drawImage(video, -canvas.width, (photo-1) * video.videoHeight, canvas.width, video.videoHeight)
            ctx.restore()
            clearInterval(countdowntimer);
            countdown.textContent = ""
            photo++;
            takePhoto()
        }
    },1000)
}
