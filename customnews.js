/* global Game */

if (CustomNews == undefined) var CustomNews = {};
if (typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/' + (0 ? 'Beta/' : '') + 'CCSE.js');
CustomNews.name = "CustomNews";
CustomNews.version = "1.0.0";
CustomNews.GameVersion = "2.052";

CustomNews.launch = function(){

    CustomNews.init = function(){
        CustomNews.isLoaded = true;
        CustomNews.config = {};
        console.log("Initializing")
        CustomNews.config = CustomNews.defaultConfig();
        CustomNews.prevMessageCustom = false;
        CCSE.customSave.push(function(){
            CCSE.config.OtherMods.CustomNews = CustomNews.config;
        });
        
        CCSE.customLoad.push(function(){
            if(CCSE.config.OtherMods.CustomNews){
                CustomNews.config = CCSE.config.OtherMods.CustomNews;
            }else{
                console.log("Using Default");
                CustomNews.config = CustomNews.defaultConfig();
            }
        });

        if(CustomNews.postloadHooks) {
            for(let i = 0; i < CustomNews.postloadHooks.length; ++i) {
                (CustomNews.postloadHooks[i])();
			}
		}
        // Stores the index of the current custom message
        CustomNews.currentMsgIndex = 0;
        CustomNews.currentHexColor = '' ;
        CustomNews.currentText = CustomNews.config.messages[CustomNews.currentMsgIndex];
        CustomNews.showMessage(CustomNews.currentMsgIndex);
        CustomNews.IntervalId = setInterval(() => CustomNews.update(), 5);

        let startupStr = "Custom News Loaded";
        Game.Notify(startupStr, '', '', 1, 1);
    }

    // Returns the default configuration of the project
    CustomNews.defaultConfig = function(){
        return {
            showAchievementHints: false,
            showCreateMessageBox: false,
            achievementsGotten: [],
            replacePercentage: 10,
            messages: CustomNews.defaultMessages()
        };
    }

    CustomNews.addMessage = function(msg_str, hexColor ){
        const msg = {text: msg_str, hexColor: hexColor};
        CustomNews.config.messages.push(msg);
        return msg;
    }
    // Returns a list of message objects
    CustomNews.defaultMessages = function(){
        let defaultColor = '#ffffff';
        return [
            { text: "Maxsuulis Rocks!", hexColor: defaultColor },
            { text: "Hello from CustomNews mod!", hexColor: defaultColor }
        ];
    }

    CustomNews.showMessage = function(customMsgIndex){
        //Creates a deep copy.
        const customMsg = JSON.parse(JSON.stringify(CustomNews.config.messages[customMsgIndex]));

        CustomNews.currentMsgIndex = customMsgIndex;
        CustomNews.currentText = customMsg.text;
        CustomNews.currentHexColor = customMsg.hexColor;
        CustomNews.prevMessageCustom = true;
    
        Game.tickerL.style.color = customMsg.hexColor;
        Game.tickerL.textContent = customMsg.text;
        
    }

    CustomNews.showRandMsg = function(){
        var randIndex = Math.floor(Math.random() * CustomNews.config.messages.length); 
        console.log(CustomNews.config.messages);
        CustomNews.showMessage(randIndex);
    }
    
    CustomNews.update = function(){
        if (Game.tickerL.textContent != CustomNews.currentText){
            // Changes the secondary color
            Game.tickerBelowL.style.color = CustomNews.currentHexColor;
            
            // Shows a custom message based on a random value
            let rand = Math.random();
            console.log("Random Number: " + rand);
            if (rand <= CustomNews.config.replacePercentage / 100){
                CustomNews.showRandMsg();
                return;
            }
            console.log(CustomNews.currentHexColor);
            // Swaps everything to a non-custom message format
            if (CustomNews.prevMessageCustom){
                const defaultColor = '#ffffff';
                Game.tickerL.style.color = defaultColor;
                CustomNews.currentText = Game.tickerL.textContent;
                CustomNews.currentHexColor = defaultColor;
                CustomNews.prevMessageCustom = false;
            }
        }
    

    }


    // Checks if the versions are correct then registers the mod
    if(CCSE.ConfirmGameVersion(CustomNews.name, CustomNews.version, CustomNews.GameVersion)){
        Game.registerMod(CustomNews.name, CustomNews);
    }
}


if(!CustomNews.isLoaded){
    if(CCSE && CCSE.isLoaded){
        CustomNews.launch();

    }else{
        if(!CCSE) var CCSE = {};
        if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
        CCSE.postLoadHooks.push(CustomNews.launch);
    }
}

function reloadCustomNews() {
    if (CustomNews && CustomNews.IntervalId){
        clearInterval(CustomNews.IntervalId);
        CustomNews.IntervalId = null;
    }
    console.log("Reloading CustomNew");
    // Remove old mod from CCSE/Game
    delete Game.mods.CustomNews;

    // Delete global object to ensure fresh load
    CustomNews = undefined;

    // Force browser to fetch latest file
    Game.LoadMod("http://localhost:8080/customnews.js?" + Date.now());
}

