/*
  This code comes from this blog post by Amit Agarwal
      http://ctrlq.org/code/19680-html5-web-speech-api
*/

	var final_transcript = '';
	var recognizing = false;
	
	if ('webkitSpeechRecognition' in window) {
		console.log("webkit is available!");
		var recognition = new webkitSpeechRecognition();
	    recognition.continuous = true;
	    recognition.interimResults = true;
 
	    recognition.onstart = function() {
	      recognizing = true;
	    };
 
	    recognition.onerror = function(event) {
	      console.log(event.error);
	    };
 
	    recognition.onend = function() {
	      recognizing = false;
	    };
 
	    recognition.onresult = function(event) {
            keepGoing=true;
			myevent = event;
	      var interim_transcript = '';
        
	      for (var i = event.resultIndex; i < event.results.length; ++i) {
			  console.log("i="+i);
            if(event.results[i][0].transcript.includes("再见")){
	            console.log("stop");
                recognition.stop();
	            return;
            }
	        if (event.results[i].isFinal) {
                final_transript +=Math.round(100*event.results[i][0].confidence)+"%--"+capitalize(event.results[i][0].transcript.trim()) +".\n";
			  console.log('final events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
	        } else {
	          interim_transcript +=Math.round(100*event.results[i][0].confidence)+"%:"+ event.results[i][0].transcript;
			  console.log('interim events.results[i][0].transcript = '+ JSON.stringify(event.results[i][0].transcript));
                if(event.results[i][0].transcript.includes("你好")){
                     console.log("repeat");
                     var msg = new SpeechSynthesisUtterance( interim_transcript);
                     msg.lang = "zh-CN"; 
                     window. speechSynthesis.speak(msg);
                    recognition.stop();
                        
                }
	        }
	      }
	      //final_transcript = capitalize(final_transcript);
	      final_span.innerHTML = linebreak(final_transcript);
	      interim_span.innerHTML = linebreak(interim_transcript);
	    };
	}
	
 
	var two_line = /\n\n/g;
	var one_line = /\n/g;
	function linebreak(s) {
	  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
	}
 
	function capitalize(s) {
	  return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
	}
 
	function startDictation(event) {
	  if (recognizing) {
	    recognition.stop();
	    return;
	  }
	  final_transcript = '';
	  recognition.lang = 'zh-CN';
	  recognition.start();
	  final_span.innerHTML = '';
	  interim_span.innerHTML = '';
	}
	
  Template.listenAndSearch.events({
	
	'click #start_button': function(event){
		startDictation(event);
	}
  });