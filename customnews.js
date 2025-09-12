/* global Game */

if (CustomNews == undefined) var CustomNews = {};
if (typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/' + (0 ? 'Beta/' : '') + 'CCSE.js');
CustomNews.launch = function(){
    CustomNews.init = function(){
        CustomNews.isLoaded = true;
        var strStream = "Custom News Loaded";
        Game.Notify(strStream);
    }
}

if(!CustomNews.isLoaded){
    console.log("Attempted load")
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
