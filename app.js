// init synthesis
const synth = window.speechSynthesis;

// Dom Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");


// init voices array
let voices = [];

// async const getVoices = () => {
//     voices = synth.getVoices();
//     console.log(voices);

// }

const getVoices = () => {
    voices = synth.getVoices();
    if (voices.length !== 0) {
        // console.log("start loading voices");
        console.log(voices);

        // Loop through voices and create option element
        voices.forEach(voice => {
            const option = document.createElement("option");
            // Fill option with voice and language
            option.textContent = voice.name + "(" + voice.lang + ")";
            // Set needed option attribute
            option.setAttribute("data-lang", voice.lang);
            option.setAttribute("data-name", voice.name);
            // Add to select list
            voiceSelect.appendChild(option);
        })
    } else {
        setTimeout(() => getVoices(), 1)
    }
}
getVoices();