/* global Game */

if (CustomNews == undefined) var CustomNews = {};
if (typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/' + (0 ? 'Beta/' : '') + 'CCSE.js');
CustomNews.name = "CustomNews";
CustomNews.version = "1.0.0";
CustomNews.GameVersion = "2.052";
CustomNews.launch = function(){
    CustomNews.init = function(){
        CustomNews.isLoaded = true;
        var strStream = "Custom News Loaded";
        Game.Notify(strStream);
    }
    CustomNews.init();
    if(CCSE.ConfirmGameVersion(CustomNews.name, CustomNews.version, CustomNews.Game)){
        Game.registerMod(CustomNews.name, CustomNews);
    }

}
console.log("Hello");
if(!CustomNews.isLoaded){
    console.log("Attempted load");
    if(CCSE && CCSE.isLoaded){
        console.log("Loaded Successfully");
        CustomNews.launch();

    }else{
        console.log("Post poning Launch");
        if(!CCSE) var CCSE = {};
        if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
        CCSE.postLoadHooks.push(CustomNews.launch);
    }
}
