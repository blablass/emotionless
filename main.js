prediction_1 = ""
prediction_2 = ""
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
Camera = document.getElementById("Camera")
Webcam.attach(Camera)
function takepicture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captureIMG' src='"+ data_uri +"'>"
    });
}
console.log("ml5 version" ,ml5.version)
Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BQQigr_cF/model.json", modelloaded)
function modelloaded(){
    console.log("modelloaded")
}
function speak(){
    var sync = window.speechSynthesis;
    data1 = "the first prediction is " + prediction_1
    data2 = "the second prediction is " + prediction_2 
    var utter = new SpeechSynthesisUtterance(data1 + data2)
    sync.speak(utter)
}
function Result(){
    img = document.getElementById("captureIMG")
    Classifier.classify(img,getresult)
}
function getresult(error,result){
    if(error){
         console.log(error)
    }else{
        console.log(result)
        prediction_1 = result[0].label
        prediction_2 = result[1].label
        document.getElementById("result1").innerHTML = prediction_1
        document.getElementById("result2").innerHTML = prediction_2
        speak()
        if(result[0].label == "Broad SMile"){
            document.getElementById("emoji1").innerHTML = "&#128512;"
        }else if(result[0].label == "Crying"){
            document.getElementById("emoji1").innerHTML = "&#128546;"
        }else if(result[0].label == "Sad"){
            document.getElementById("emoji1").innerHTML = "&#128532;"
        }
        if(result[1].label == "Broad SMile"){
            document.getElementById("emoji2").innerHTML = "&#128512;"
        }else if(result[1].label == "Crying"){
            document.getElementById("emoji2").innerHTML = "&#128546;"
        }else if(result[1].label == "Sad"){
            document.getElementById("emoji2").innerHTML = "&#128532;"
        }
    }
}
