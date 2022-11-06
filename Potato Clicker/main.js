     var game = {
        score: 0,
        totalScore: 0,
        totalClicks: 0,
        clickValue: 1,
        version: 0.001,
        
        addToScore: function(amount) {
            this.score += amount;
            this.totalScore += amount;
            display.updateScore();
        },
        
        getScorePerSecond: function() {
            var scorePerSecond = 0;
            for (i = 0; i < building.name.length; i++) { 
                 scorePerSecond += building.income[i] * building.count[i];
            }
            return scorePerSecond;
        }
    };
   
    var building = {
        name: [
            "Potato Collector",
            "Potato Mulitplier",
            "Potato Reviver",
            "Potato Factory"
        ],
        image: [
             "Potato Collector.png",
             "Potato Mulitplier.png",
             "Potato Reviver.png",
             "Potato Factory.png"
        ],
        count: [0, 0, 0, 0],
        income: [
            1,
            15,
            155,
            1555
        ],
        cost: [
            100,
            1000,
            10000,
            100000
        ],
        
        purchase: function(index) {
            if (game.score >= this.cost[index]) {
                game.score -= this.cost[index];
                this.count[index]++;
                this.cost[index] = Math.ceil(this.cost[index] * 1.10);
                display.updateScore();
                display.updateShop();
	        display.updateUpgrades();
            }
        }
    };
    
     var upgrade = {
         name: [
             "Stoneifier",
	     "Ironifier",
	     "Stone Cursor",
             "Iron Cursor"
         ],
         description: [
             "Potato Collectors are twice as efficient",
	     "Potato Collectors are twice as efficient",
	     "Your Cursor is twice as efficient",
             "Your Cursor is thrice as efficient"
         ],
         image: [
             "Stoneifier.png",
	     "Ironifier.png",
	     "Stone Cursor.png",
             "Iron Cursor.png"
         ],
         type: [
             "building",
	     "building",
	     "click",
	     "click"            
         ],
         cost: [
             300,
	     500,
	     300,
             550
         ],
         buildingIndex: [
             0,
	     0,
	    -1,
            -1,
         ],
         requirement: [
             1,
	     5,
	     10,
             1000
         ],
         bonus: [
             2,
	     2,
	     2,
             3
         ],
         purchased: [false, false, false, false],
      
         purchase: function(index) {
             if (!this.purchased[index] && game.score >= this.cost[index]) {
                 if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                     game.score -= this.cost[index];
	             building.income[this.buildingIndex[index]] *= this.bonus[index];
		     this.purchased[index] = true;
							
					  
		     display.updateUpgrades();
		     display.updateScore();
                 } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
                     game.score -= this.cost[index];
		     game.clickValue *= this.bonus[index];
		     this.purchased[index] = true;
							
					  
		     display.updateUpgrades();
		     display.updateScore();
	         }
             }
         }
     };
    
	 var achievement = {
	     name: [
		 "Buy your first Potato Collector",
		 "The start of it all",
		 "Buy 5 Potato Collectors",
                 "Click 50 times!"
             ],
             description: [
		 "Buy a potato collecter",
		 "Click once",
		 "Noice mate!",
                 "Your fingers are gifted!" 
             ],
             image: [
		  "1st Potato Collector.png",
		  "1st Click.png",
		  "5th Potato Collector.png",
                  "50th Click.png"
             ],
             type: [
		  "building",
	          "score",
		  "building",
                  "score"
             ],
             requirement: [
		  1,
		  1,
		  5,
                  50
             ],
             objectIndex: [
		  0,
		  -1,
		  0,
                  -1
             ],
             awarded: [false, false, false, false],
     
	     earn: function(index) {
		      this.awarded[index] = true;
           }
      };      
      var display = {
        updateScore: function() {
            document.getElementById("score").innerHTML = game.score;
            document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
            document.title = game.score + " Potato - Potato Clicker";
        
        },
        
        updateShop: function() {
            document.getElementById("shopContainer").innerHTML = "";
            for (i = 0; i < building.name.length; i++) {
                document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable" onclick="building.purchase('+i+')"><tr><td id="image"><img src="Images/'+building.image[i]+'"></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> Potatos</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>';
            }
        },
	 
	     updateUpgrades: function() {
	         document.getElementById("upgradeContainer").innerHTML = "";
		      for (i = 0; i < upgrade.name.length; i++) {
		          if (!upgrade.purchased[i]) {
				        if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) { 
					         document.getElementById("upgradeContainer").innerHTML += '<img src="Images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' Potatos)" onclick="upgrade.purchase('+i+')">';
	                 } else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
	                     document.getElementById("upgradeContainer").innerHTML += '<img src="Images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' Potatos)" onclick="upgrade.purchase('+i+')">';
	                 }
	             }
	         }
	     },  
    
	     updateAchievements: function() {
	         document.getElementById("achievementContainer").innerHTML = "";
	         for (i = 0; i < achievement.name.length; i++) {
	             if (achievement.awarded[i]) {
			  document.getElementById("achievementContainer").innerHTML += '<img src="Images/'+achievement.image[i]+'" title="'+achievement.name[i]+' &#10; '+achievement.description[i]+'">';
		     }
	         }
	     }
	 };
	 
	 
    function saveGame() {
        var gameSave = {
            score: game.score,
            totalScore: game.totalScore,
            totalClicks: game.totalClicks,
            clickValue: game.clickValue,
            version: game.version,
            buildingCount: building.count,
            buildingIncome: building.income,
            buildingCost: building.cost,
	    upgradePurchased: upgrade.purchased,
	    achievementAwarded: achievement.awarded
            
        };
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
    }
    
    function loadGame() {
        var savedGame = JSON.parse(localStorage.getItem("gameSave"));
        if (localStorage.getItem("gameSave") !== null) {
            if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
            if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
            if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
            if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
            if (typeof savedGame.buildingCount !== "undefined") {
                for (i = 0; i < savedGame.buildingCount.length; i++) {
                    building.count[i] = savedGame.buildingCount[i];
                }  
            }                     
            if (typeof savedGame.buildingIncome !== "undefined") {
                for (i = 0; i < savedGame.buildingCount.length; i++) {
                    building.income[i] = savedGame.buildingIncome[i];
                }      
            }  
            
            if (typeof savedGame.buildingCost !== "undefined") {
                for (i = 0; i < savedGame.buildingCost.length; i++) {
                    building.cost[i] = savedGame.buildingCost[i];
                }      
            } 
				
	    if (typeof savedGame.upgradePurchased !== "undefined") {
                for (i = 0; i < savedGame.upgradePurchased.length; i++) {
                    upgrade.purchased[i] = savedGame.upgradePurchased[i];	  	  
	        }
	    } 
				
	   if (typeof savedGame.achievementAwarded !== "undefined") {
                for (i = 0; i < savedGame.achievementAwarded.length; i++) {
                    achievement.awarded[i] = savedGame.achievementAwarded[i];
	        }
	    }   
        }                                     
    }                 
     
    function resetGame() {
        if (confirm("Are You sure yu want o rest le game?")) {
            var gameSave = {};
            localStorage.setItem("gameSave", JSON.stringify(gameSave));
            location.reload();      
        }     
    }    
    
    document.getElementById("clicker").addEventListener("click", function() {
        game.totalClicks++;
        game.addToScore(game.clickValue);
    }, false);
  
    
    window.onload = function() {
        loadGame();
        display.updateScore();
        display.updateUpgrades();
        display.updateShop();
    };
    
    setInterval(function() {
	for (i = 0; i < achievement.name.length; i++) {
	     if (achievement.type[i] == "score" && game.totalScore >= achievement.requirement[i]) achievement.earn(i);
		  else if (achievement.type[i] == "click" && game.totalClicks >= achievement.requirement[i]) achievement.earn(i);
	          else if (achievement.type[i] == "building" && building.count[achievement.objectIndex[i]] >= achievement.requirement[i]) achievement.earn(i);
        }
		  
        game.score += game.getScorePerSecond();
        game.totalScore += game.getScorePerSecond();
        display.updateScore();
		  display.updateAchievements();
    }, 1000); // 1000ms = 1 second    

    setInterval(function() {
        display.updateScore();
        display.updateUpgrades();
	 }, 10000);
	 
    setInterval(function() {
        saveGame();
    }, 30000); // 30000ms - 30 seconds
    
    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.which == 83) { // ctrl + s
            event.preventDefault();
            saveGame();
        }
    }, false);