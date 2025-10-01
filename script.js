const video = document.getElementById("video");
const snap = document.getElementById("snap")
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")


navigator.mediaDevices.getUserMedia({video:true})
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.log("Error:" +err);
    })

function chooseBooth(templateName) {
    currentBooth = templateName;
    video.style.filter = boothFilters(templateName);
}

snap.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight * 4;

    let count = 3
    const countdown = setInterval(() =>{
        console.log(count);
        count--;
        if (count<0) {
            clearInterval(countdown);
        }
    },1000)

    ctx.save();
    ctx.scale(-1,1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
    ctx.restore()

    if(templateName) {
        const templateImage = new Image();
        templateImage.src = "template/" + templateName;
        templateImage.Onload = () =>{
            ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);
        }
    }
    })



