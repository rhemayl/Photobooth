const video = document.getElementById("video");
const snap = document.getElementById("snap")
const canvas = document.getElementById("canvas");
const download = document.getElementById("download");
const countdown = document.getElementById("countdown");
const errormessage = document.getElementById("errormessage");
const ctx = canvas.getContext("2d");
let photo = 1;
let isShooting = false;
let template = null;
let readydownload = false;


navigator.mediaDevices.getUserMedia({video:true})
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        errormessage.textContent = "Error:" + err;
    })


function chooseBooth(templateName) {
    template = templateName
    video.style.filter = boothFilters(templateName);
}

function boothFilters(templateName) {
    switch (templateName) {
        case "y2k":
            return "brightness(1.4) saturate(160%)";
        case "retro":
            return "sepia(90%) contrast(160%) grayscale(40%)";
        case "modern":
            return "brightness(1.3) contrast(90%)";
        default:
            return "none";
    }
}



snap.addEventListener("click", () => {
    if (isShooting) return;
    readydownload = false
    isShooting = true
    photo = 1;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight * 4;
    takePhoto()
    })

function takePhoto(){
    if (photo>4) {
        isShooting = false;
        if(template) {
            const templateImage = new Image();
            templateImage.src = "template/" + template + ".jpg";
            templateImage.onload = () =>{
                ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);
                readydownload = true;
            }
            ctx.filter = "none";
        } else {
            readydownload=true
        }
        return;
    }
    let count = 3;
    const countdowntimer = setInterval(() => {
        countdown.textContent = count;
        count--;
        if (count<0) {
            ctx.save();
            ctx.scale(-1,1);
            ctx.filter = boothFilters(template);
            ctx.drawImage(video, -canvas.width, (photo-1) * video.videoHeight, canvas.width, video.videoHeight)
            ctx.restore()
            clearInterval(countdowntimer);
            countdown.textContent = ""
            photo++;
            takePhoto()
        }
    },1000)
}

download.addEventListener("click", () => {
    if (readydownload) {
        const photoLink = canvas.toDataURL("image/png"); 
        const link = document.createElement("a");       
        link.href = photoLink;                            
        link.download = "photo.png";                                 
        link.click();                                                 
    }
})
