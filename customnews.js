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
        const msg = [
            hex_color,
            msg_str
        ];
        CustomNews.config.messages.push(msg);
        return msg;
    }

    // Checks if the versions are correct then registers the mod
    if(CCSE.ConfirmGameVersion(CustomNews.name, CustomNews.version, CustomNews.GameVersion)){
        Game.registerMod(CustomNews.name, CustomNews);
    }

    CustomNews.showMessage = function(custom_msg){
        let newsTextEl = document.getElementById("commentsText1");
        console.log(custom_msg);
        console.log(newsTextEl)
        if (newsTextEl){
            newsTextEl.style.color = custom_msg.hex_color;
            newsTextEl.textContent = custom_msg.text;
        }
    }

    CustomNews.defaultMessages = function(){
        const defaultColor = '#852323ff';
        return [
            ["Maxsuulis Rocks!", defaultColor],
            ["Hello from CustomNews mod!", defaultColor]
        ];
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
