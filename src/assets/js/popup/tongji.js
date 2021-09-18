
import {Util} from './util';

(function(document,datracker,root){function loadJsSDK(){var script,first_script;script=document.createElement("script");script.type="text/javascript";script.async=true;script.src="https://hubble-js-bucket.nosdn.127.net/DATracker.globals.1.6.12.8.js";first_script=document.getElementsByTagName("script")[0];first_script.parentNode.insertBefore(script,first_script)}if(!datracker["__SV"]){var win=window;var gen_fn,functions,i,lib_name="DATracker";window[lib_name]=datracker;datracker["_i"]=[];datracker["init"]=function(token,config,name){var target=datracker;if(typeof(name)!=="undefined"){target=datracker[name]=[]}else{name=lib_name}target["people"]=target["people"]||[];target["abtest"]=target["abtest"]||[];target["toString"]=function(no_stub){var str=lib_name;if(name!==lib_name){str+="."+name}if(!no_stub){str+=" (stub)"}return str};target["people"]["toString"]=function(){return target.toString(1)+".people (stub)"};function _set_and_defer(target,fn){var split=fn.split(".");if(split.length==2){target=target[split[0]];fn=split[1]}target[fn]=function(){target.push([fn].concat(Array.prototype.slice.call(arguments,0)))}}functions="get_user_id track_heatmap register_attributes register_attributes_once clear_attributes unregister_attributes current_attributes single_pageview disable time_event get_appStatus track set_userId track_pageview track_links track_forms register register_once alias unregister identify login logout signup name_tag set_config reset people.set people.set_once people.set_realname people.set_country people.set_province people.set_city people.set_age people.set_gender people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.set_populationWithAccount  people.set_location people.set_birthday people.set_region people.set_account abtest.get_variation abtest.async_get_variable".split(" ");for(i=0;i<functions.length;i++){_set_and_defer(target,functions[i])}datracker["_i"].push([token,config,name])};datracker["__SV"]=1.6;loadJsSDK()}})(document,window["DATracker"]||[],window);

(function(document,abtestingLeadCode,dataLayer,root){if(!abtestingLeadCode["__SV"]){abtestingLeadCode={__SV:1,isshowPage:false,showPage:function(){if(!this.isshowPage){this.isshowPage=true;var styleNode=document.getElementById("_hb_abtesting_page_hides");if(styleNode){styleNode.parentNode.removeChild(styleNode)}}},hidePage:function(){var styleNode=document.createElement("style");var style="";var head=document.getElementsByTagName("head")[0];styleNode.setAttribute("id","_hb_abtesting_page_hides");styleNode.setAttribute("type","text/css");if(styleNode.styleSheet){styleNode.styleSheet.cssText=style}else{styleNode.appendChild(document.createTextNode(style))}head.appendChild(styleNode)},transition:function(){var styleNode=document.createElement("style");var style="*{transition: opacity .3s linear; -moz-transition: opacity .3s linear; -webkit-transition: opacity .3s linear; -o-transition: opacity .3s linear;}";var head=document.getElementsByTagName("head")[0];styleNode.setAttribute("id","_hb_abtesting_transition_hides");styleNode.setAttribute("type","text/css");if(styleNode.styleSheet){styleNode.styleSheet.cssText=style}else{styleNode.appendChild(document.createTextNode(style))}head.appendChild(styleNode)},getShowPage:function(){return this.isshowPage},getDataLayer:function(){if(typeof dataLayer==="number"){return dataLayer}return 4000},init:function(){var settings_timer=setTimeout("DATrackerABTestingLeadCode.showPage()",this.getDataLayer());this.hidePage();this.transition();return settings_timer}};window["DATrackerABTestingLeadCode"]=abtestingLeadCode}})(document,window["DATrackerABTestingLeadCode"]||{},4000,window);DATrackerABTestingLeadCode.init();

const appId = 'MA-BFB6-AC673A756684'
const expires = 10*60*1000; 
let sessionTime = 0;
let date = new Date();
let curPageSession = {
    title:document.title,
    url:window.location.origin + window.location.pathname,
    start:date.getTime(),
    end:'',
    viewTime:Util.dateFormat(date,'yyyyMMdd'),
}

let setLocalStroage = (name,data)=>{
    console.log(window.localStorage.getItem(name));
    let stroageSession = JSON.parse(window.localStorage.getItem(name) || JSON.stringify([]));
    stroageSession.push(data);
    window.localStorage.setItem(name,JSON.stringify(stroageSession));
}

let loaded = function(datracker) { 
    var fn = datracker.track;
    var nowFn = function(event_name, properties, callback,setData_type) {
        if(event_name=='da_screen'){
            setInterval(()=>{
                if(sessionTime<expires+1000){
                    sessionTime += 1000;
                    if(sessionTime>expires){
                        let date = new Date().getTime();
                        curPageSession.end = date;
                        setLocalStroage('pageSession',curPageSession);
                        curPageSession.start = date;
                        curPageSession.end = '';
                    }
                }
            },1000)
        }else{
            sessionTime = 0;
        }
        fn.call(datracker, event_name, properties, callback,setData_type);
    }
    datracker.track = nowFn;
}

window.DATracker.init(appId, {
    truncateLength: 255,
    session_interval_mins: expires/60000,
    persistence: "localStorage",
    cross_subdomain_cookie: false,
    heatmap: {
        collect_all: true
    },
    abtest: {
        enable_abtest: true,
        default_variables: {
            plan: 1
        }
    },
    loaded:loaded
}
);

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?220312f3cfcd6a3838109b26fe7872dd";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
})();



export var htmlOject = {
    'index':'首页',
    'intro-email':'产品页',
    'buy-price':'定价页',
    'user-story':'客户案例页',
    'service':'服务页',
    'join-dstrib':'经销商页',
    'security-center':'安全中心页',
    'brand':'品牌历程页',
    'buy-strategy':'购买攻略页'
}

$(function(){
    if(window.localStorage.getItem('pageSession')){
        let prevPageSession = JSON.parse(window.localStorage.getItem('pageSession'));
        
        if(prevPageSession.length>0){
            prevPageSession.forEach((item)=>{
                window.DATracker.track('page_staytime',{
                    stayTime:item.end - item.start,
                    start:item.start,
                    end:item.end,
                    title:prevPageSession.title,
                    url:prevPageSession.url,
                    viewTime:prevPageSession.viewTime,
                })
            })
            /* 上报完移除，防止重复上报 */
            window.localStorage.removeItem('pageSession');
        }
    }else{
        window.localStorage.setItem('pageSession',JSON.stringify([]));
    }

    $(window).on('unload',function(){
        curPageSession.end = new Date().getTime();
        /* 未过期则写入stroage */
        if(sessionTime<=expires){
            setLocalStroage('pageSession',curPageSession);
        }
    })
})