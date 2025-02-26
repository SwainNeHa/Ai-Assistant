let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Fuctionality
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "en-GB"
    window.speechSynthesis.speak(text_speak);
}

// Wishes
function wishMe() {
    let day = new Date()
    let hours = day.getHours()
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Ma'am");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Maam");
    } else {
        speak("Good Evening Maam");
    }
}
// window.addEventListener('load', () => {
//     wishMe()
// });

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.onresult = (event) => {
    let currentindex = event.resultIndex
    let transcript = event.results[currentindex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
})

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, what can I help you?");
    } else if (message.includes("who are you")) {
        speak("I'm shifra your virtual assistant");
    } else if (message.includes("open youtube")) {
        speak("opening youtube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("opening google...");
        window.open("https://www.google.co.in/", "_blank");
    } else if (message.includes("open gemini")) {
        speak("opening gemini...");
        window.open("https://gemini.google.com/", "_blank");
    } else if (message.includes("open github")) {
        speak("opening github...");
        window.open("https://github.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("opening calculator...");
        window.open("calculator://");
    } else if (message.includes("what is the time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric", });
        speak(time)
    } else if (message.includes("what is the date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric" });
        speak(date)
    } else {
        let finalText = "this is what i found in internet regarding" + message.replace("shipra", "") || message.replace("shifra", "")
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("shipra","")}`, "_blank");
    }
}