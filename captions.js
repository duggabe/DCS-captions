/* captions.js */
/* DCS-captions */

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const DB_SIZE = 4;            // display 4 lines
var display_buffer = [];
// init display buffer
var i;
for (i = 0; i < DB_SIZE; i++)
    display_buffer.push ("");       // fill buffer with empty strings

function cap_start()
  {
  var final_transcript = '';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;

  recognition.start();

  // event 1
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }

  recognition.onresult = function(event)
    {
    // console.log('SpeechRecognition.onresult');
    var speechResult = "";
    var tempResult = "";
    for (var i = event.resultIndex; i < event.results.length; ++i)
        {
        if (event.results[i].isFinal)
            {
            speechResult = event.results[i][0].transcript.toUpperCase();
            display_buffer.push (speechResult + "\n");  // put in new item at end
            display_buffer.shift();                     // remove oldest from top
            document.getElementById("demo").innerHTML = display_buffer.join("");
            }
        }
    }

  // event 2
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }

  // event 3
  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }

  // event 4
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }

  // event 5
  recognition.onspeechend = function() {
      console.log('SpeechRecognition.onspeechend');
  }

  // event 6
  recognition.onsoundend = function(event)
        {
        //Fired when any sound — recognisable speech or not — has stopped being detected.
        console.log('SpeechRecognition.onsoundend');
        // restart
        recognition.stop();
        }

  // event 7
  recognition.onaudioend = function(event)
        {
        //Fired when the user agent has finished capturing audio.
        console.log('SpeechRecognition.onaudioend');
        // restart
        recognition.stop();
        }

  // event 8
  recognition.onend = function(event)
        {
        //Fired when the speech recognition service has disconnected.
        console.log('SpeechRecognition.onend');
        // restart
        recognition.start();
        }
  
  recognition.onerror = function(event) {
      console.log('SpeechRecognition.onerror', event.error);
      // if network error
      if (event.error == 'network')
        {
        // restart
        recognition.stop();
        }
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }
  
}

