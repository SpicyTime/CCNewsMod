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
        CustomNews.config = CustomNews.defaultConfig();
        CustomNews.prevMessageCustom = false;
        CustomNews.currentMsg = {};
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
        // Updates every 2 seconds
        setInterval(CustomNews.update(), 250);
        CustomNews.showMessage(CustomNews.config.messages[0]);

        let startupStr = "Custom News Loaded";
        Game.Notify(startupStr, '', '', 1, 1);
    }

    // Returns the default configuration of the project
    CustomNews.defaultConfig = function(){
        return {
            showAchievementHints: false,
            showCreateMessageBox: false,
            achievementsGotten: [],
            replacePercentage: 50,
            messages: CustomNews.defaultMessages()
        };
    }

    CustomNews.addMessage = function(msg_str, hex_color ){
        const msg = {text: msg_str, hex_color: hex_color};
        CustomNews.config.messages.push(msg);
        return msg;
    }

    CustomNews.showMessage = function(custom_msg){
        let newsTextEl = document.getElementById("commentsText1");
        CustomNews.currentMsg = custom_msg;
        if (newsTextEl){
            newsTextEl.style.color = custom_msg.hex_color;
            newsTextEl.textContent = custom_msg.text;
        }
    }
    // Returns a list of message objects
    CustomNews.defaultMessages = function(){
        return [
            { text: "Maxsuulis Rocks!", hex_color: '#852323ff' },
            { text: "Hello from CustomNews mod!", hex_color: '#852323ff' }
        ];
    }

    CustomNews.update = function(){
        var newsTextEl1 = document.getElementById("commentsText1");
        var newsTextEl2 = document.getElementById("commentsText2");
        if (newsTextEl1.textContent != CustomNews.currentMsg.text){
            newsTextEl2.style.color = CustomNews.hex_color;
            CustomNews.currentMsg.text = newsTextEl1.textContent;
            
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
