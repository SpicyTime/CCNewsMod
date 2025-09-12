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
                CustomNews.config = CustomNews.defaultConfig();
            }
        });

        if(CustomNews.postloadHooks) {
			for(var i = 0; i < CustomNews.postloadHooks.length; ++i) {
				(CustomNews.postloadHooks[i])();
			}
		}

        var startupStr = "Custom News Loaded";
        Game.Notify(startupStr, '', '', 1, 1);
    }

    // Returns the default configuration of the project
    CustomNews.defaultConfig = function(){
        return {
            showAchievementHints: false,
            showCreateMessageBox: false,
            achievementsGotten: [],
            replacePercentage: 50,
        };
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
