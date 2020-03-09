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
        // console.log(voices);

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
        setTimeout(() => getVoices(), 10)
    }
}
getVoices();


// Speak
const speak = () => {
    // check if speaking
    if(synth.speaking) {
        alert("Already Speaking")
        return;
    } 
    if(textInput.value !== '') {
        // Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // Speak end
        speakText.onend = e => {
            console.log("Done speaking");
        }

        // speak error

        speakText.onerror = e => {
            console.error("Something went wrong");
        }

        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
        // console.log(selectedVoice);

        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // SPeak

        synth.speak(speakText);
    }
}

// Event listeners

// Form submission

textForm.addEventListener("submit", (e) => {
    e.preventDefault();
    speak();
    textInput.blur();
})

// Rate value change
rate.addEventListener("change", e => rateValue.textContent = rate.value)
// Pitch value change
pitch.addEventListener("change", e => pitchValue.textContent = pitch.value)

// speak when change voice
voiceSelect.addEventListener("change", e => speak())