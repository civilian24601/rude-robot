const button = document.getElementById('button')
const audioElement = document.getElementById('audio')




// Toggle Function for disable/enable button
const toggleButton = () => {
    button.disabled = !button.disabled;
}

// Passing Joke to our Voice RSS API

const tellMe = (joke) => {
    VoiceRSS.speech({
        key: '3ea45cd4399949c2985e4fbb2cbbd05e',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });

}

// API Get Jokes
const getJokes = async () => {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Dark,Pun'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // text-to-speech
        tellMe(joke);
        // disable Button
        toggleButton();

    } catch(error) {
        // for catching errors
        console.log('fetched an error!', error)
    }
}

//  Event Listeners
button.addEventListener('click', getJokes);

audioElement.addEventListener('ended', toggleButton);