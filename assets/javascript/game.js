 $(document).ready(function() {

     var yourFighter;
     var defender;
     var fighterSelected;
     var defenderSelected;
     var opponentsReady;
     var counter;
     var kills;

     var characters = {
         'morrigan': {
             name: 'Morrigan',
             health: 120,
             attack: 8,
             image: "assets/images/morrigan.png",
             defenderCounterAttack: 20
         },
         'alistair': {
             name: 'Alistair',
             health: 120,
             attack: 10,
             image: "assets/images/alistair.png",
             defenderCounterAttack: 12
         },
         'varric': {
             name: 'Varric',
             health: 150,
             attack: 8,
             image: "assets/images/varric.png",
             defenderCounterAttack: 15
         },
         'cassandra': {
             name: 'Cassandra',
             health: 180,
             attack: 9,
             image: "assets/images/cassandra.png",
             defenderCounterAttack: 20
         }
     };

     function initGame() {
         fighterSelected = false;
         defenderSelected = false;
         opponentsReady = false;
         counter = 1;
         kills = 0;

         $(".fighter-stage, .defender-stage, .player-stable, .attack-reset, .damage-display").empty();

         Object.keys(characters).forEach(key => {

             var playerStable = $(".player-stable");
             var playerModule = $("<div class='player-module'>");
             playerModule.attr("data-key", key);
             var playerImage = $("<img class='character'>").attr("src", characters[key].image);
             var playerName = $("<h3 class='player-text'>").text(characters[key].name);
             var playerHealth = $("<p class='player-health'>").attr("id", key).text(characters[key].health);
             playerModule.append(playerImage).append(playerName).append(playerHealth);
             playerStable.append(playerModule);

         });
     }

     $(document).on("click", ".player-stable .player-module", function() {

         if (defenderSelected) {

         } else {

             if (fighterSelected) {

                 defender = $(this);

                 $(".defender-stage").append(defender);
                 var attack = $("<button class='attack-button'>").text("Attack!");
                 $(".instructions").text("Enter Battle!");
                 $(".damage-display").empty();
                 defenderSelected = true;
                 opponentsReady = true;

                 $(".attack-reset").append(attack);
                 $(".vs").text("vs.");

             } else {
                 yourFighter = $(this);

                 $(".fighter-stage").append(yourFighter);
                 $(".instructions").text("Choose Your Opponent:");
                 fighterSelected = true;
             }

         }

     });



     $(document).on("click", ".attack-button", function() {
         var fighterName = yourFighter.attr("data-key");
         var fighterAttack = characters[yourFighter.attr("data-key")].attack;
         var defenderName = defender.attr("data-key");
         var defenderAttack = characters[defender.attr("data-key")].defenderCounterAttack;
         var fighterMessage = ("You attacked " + characters[defender.attr("data-key")].name + " for " + (fighterAttack * counter) + " points damage.");
         var defenderMessage = (characters[defender.attr("data-key")].name + " attacked you for " + defenderAttack + " points damage.");

         characters[defender.attr("data-key")].health -= (fighterAttack * counter);
         $(".damage-display").append("<p>").text(fighterMessage);

         if (characters[defender.attr("data-key")].health < 1) {
            defenderSelected = false;
            $(".defender-stage, .attack-reset").empty();
            $(".vs").text("victory");
            $(".instructions").text("Choose Your Next Opponent:");
            kills++;
            
} else {
             characters[yourFighter.attr("data-key")].health -= defenderAttack;
             $("#" + fighterName).text(characters[yourFighter.attr("data-key")].health);
             $("#" + defenderName).text(characters[defender.attr("data-key")].health);
             $(".damage-display").append("<p>").html("" + fighterMessage + "<br /><br />" + defenderMessage + "");
            
         }
         counter++;

         if (characters[yourFighter.attr("data-key")].health < 1) {
            $("#" + fighterName).text(0);
            $(".instructions").text("Defeated! Press Reset to try again!");
            $(".vs").text("defeat");
            $(".attack-reset, .damage-display").empty();
            var reset = $("<button class='reset-button'>").text("Reset");
            $(".attack-reset").append(reset);
         }

         if (kills === 3) {
            $(".damage-display").empty();
            $(".instructions").text("Champion! Press Reset to play again!");
            $(".vs").text("champion");
            var reset = $("<button class='reset-button'>").text("Reset");
            $(".attack-reset").append(reset);
         }

     });

     $(document).on("click", ".reset-button", function() {
            location.reload();        
     });


     initGame();
 });