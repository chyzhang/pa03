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
            myevent = event;
            var interim_transcript ='';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              console.log("i="+i);
            if(event.results[i][0].transcript.includes("okay")){
                interim_transcript += event.results[i][0].transcript;
                console.log("stop");
                recognition.stop();
                
                 var mmm=interim_transcript;
                var lll = mmm.substring(0,mmm.indexOf("ok"));
            OnChange(lll);
                return;
            }else if (event.results[i][0].transcript.includes("cancel")) {
                    $('#q').val('');
                    recognition.stop();
                    return;
            }
            if (event.results[i].isFinal) {
                final_transcript+=event.results[i][0].transcript;
              console.log('final events.results[i][0].transcript ='+ JSON.stringify(event.results[i][0].transcript));
            } else {
              interim_transcript+=event.results[i][0].transcript;
              console.log('interim events.results[i][0].transcript ='+ JSON.stringify(event.results[i][0].transcript));
            }
          }
          //final_transcript = capitalize(final_transcript);
          //final_span.innerHTML = linebreak(final_transcript);
          //interim_span.innerHTML = linebreak(interim_transcript);
            
        $('#q').val(interim_transcript);
        
        var cmd=interim_transcript;      
        var string2 = cmd.substring(1);
        if(cmd.indexOf(" ")==0){
            OnChange(cmd);
        }else{
        OnChange(string2);
        }
        };
    }
    function startDictation(event) {
      if (recognizing) {
        recognition.stop();
        return;
      }
        final_transcript ='';
        recognition.lang = 'en-US';
        recognition.start();
    }
	
  Template.listenAndSearch.events({
	
	'click #start_button': function(event){
		startDictation(event);
	}
  });
Template.listenAndSearch.rendered = function() {
    OnChange =function(value){
        if (value==""){
            ShowAll();
            return;
        };
        $('#sven').hide();
        $('#doom').hide();
        $('#timbersaw').hide();
        $('#huskar').hide();
        $('#centaur_warrunner').hide();
        $('#magnus').hide();
        $('#bristleback').hide();
        $('#tiny').hide();
        $('#axe').hide();
        $('#kunkka').hide();
        $('#chaos_knight').hide();
        $('#spirit_breaker').hide();
        $('#beastmaster').hide();
        $('#legion_commander').hide();
        $('#pudge').hide();
        $('#alchemist').hide();
        $('#night_stalker').hide();
        $('#slardar').hide();
        $('#brewmaster').hide();
        $('#clockwerk').hide();
        $('#tidehunter').hide();
        $('#sand_king').hide();
        $('#earth_spirit').hide();
        $('#phoenix').hide();
        $('#wraith_king').hide();
        $('#treant_protector').hide();
        $('#io').hide();
        $('#elder_titan').hide();
        $('#undying').hide();
        $('#earthshaker').hide();
        $('#abaddon').hide();
        $('#omniknight').hide();
        $('#tusk').hide();
        $('#lycan').hide();
        $('#lifestealer').hide();
        $('#dragon_knight').hide();
        $('#mirana').hide();
        $('#naga_siren').hide();
        $('#ursa').hide();
        $('#shadow_fiend').hide();
        $('#drow_ranger').hide();
        $('#razor').hide();
        $('#bounty_hunter').hide();
        $('#lone_druid').hide();
        $('#phantom_lancer').hide();
        $('#sniper').hide();
        $('#broodmother').hide();
        $('#templar_assassin').hide();
        $('#viper').hide();
        $('#meepo').hide();
        $('#luna').hide();
        $('#juggernaut').hide();
        $('#bloodseeker').hide();
        $('#clinkz').hide();
        $('#slark').hide();
        $('#spectre').hide();
        $('#weaver').hide();
        $('#gyrocopter').hide();
        $('#terrorblade').hide();
        $('#venomancer').hide();
        $('#vengeful_spirit').hide();
        $('#nyx_assassin').hide();
        $('#anti_mage').hide();
        $('#morphling').hide();
        $('#medusa').hide();
        $('#troll').hide();
        $('#phantom_assassin').hide();
        $('#riki').hide();
        $('#faceless_void').hide();
        $('#ember_spirit').hide();
        $('#shadow_demon').hide();
        $('#batrider').hide();
        $('#pugna').hide();
        $('#outworld_devourer').hide();
        $('#puck').hide();
        $('#necrophos').hide();
        $('#tinker').hide();
        $('#natures_prophet').hide();
        $('#death_prophet').hide();
        $('#invoker').hide();
        $('#dark_seer').hide();
        $('#storm_spirit').hide();
        $('#witch_doctor').hide();
        $('#silencer').hide();
        $('#techies').hide();
        $('#enigma').hide();
        $('#leshrac').hide();
        $('#chen').hide();
        $('#shadow_shaman').hide();
        $('#bane').hide();
        $('#keeper_of_the_light').hide();
        $('#enchantress').hide();
        $('#rubick').hide();
        $('#lich').hide();
        $('#lion').hide();
        $('#visage').hide();
        $('#ancient_apparition').hide();
        $('#dazzle').hide();
        $('#jakiro').hide();
        $('#skywrath_mage').hide();
        $('#warlock').hide();
        $('#lina').hide();
        $('#crystal_maiden').hide();
        $('#disruptor').hide();
        $('#ogre_magi').hide();
        $('#queen_of_pain').hide();
        $('#zeus').hide();
        $('#windranger').hide();
        $('#oracle').hide();
        $('#winter_wyvern').hide();

        $('div[id*="'+ value +'"]').show();
                 console.log( "Handler for onchange called." );
    }
     
    ShowAll =function() {
        $(".hero-list-hero").show();
        $(".nabtn").removeClass("active");
        $("#all").addClass("active");
    }
    
    
}