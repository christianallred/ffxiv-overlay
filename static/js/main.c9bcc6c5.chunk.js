(this["webpackJsonpffxiv-overlay"]=this["webpackJsonpffxiv-overlay"]||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){e.exports=a.p+"static/media/logo.25bf045c.svg"},16:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(8),c=a.n(r),l=(a(14),a(15),a(16),a(1)),i=a(2),o=a(4),d=a(3),p=a(5),m=[],h=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(d.a)(t).call(this,e))).state={expanded:!1,group:!0,showEncountersList:!1},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"shouldComponentUpdate",value:function(e){return"---"!==e.encounter.encdps}},{key:"handleExtraDetails",value:function(e){this.props.onExtraDetailsClick(e),this.setState({expanded:!this.state.expanded})}},{key:"handleEncounterClick",value:function(e){this.setState({showEncountersList:!this.state.showEncountersList})}},{key:"handleToggleStats",value:function(e){this.setState({group:!this.state.group})}},{key:"render",value:function(){var e=this.props.data,t=this.props.encounter;if(!e)return s.a.createElement("div",null);var a=e.YOU,n=parseFloat(t.encdps),r=0;isNaN(n)||n===1/0||(r=Math.max(r,n));var c=this.state.group?t:a;void 0==a&&(c=t);var l=0,i=0,o=0;if(this.state.group){if(void 0!==e){for(var d in e)e.hasOwnProperty(d)&&(i+=parseFloat(e[d].DirectHitPct.substring(0,e[d].DirectHitPct.length-1)),o+=parseFloat(e[d].CritDirectHitPct.substring(0,e[d].CritDirectHitPct.length-1)),l++);i>0&&(i=parseFloat(i/l)),o>0&&(o=parseFloat(o/l))}}else void 0!=a&&(i=a.DirectHitPct,o=a.CritDirectHitPct);return s.a.createElement("div",{className:"header ".concat(this.state.expanded?"":"collapsed")},s.a.createElement("div",{className:"encounter-header"},s.a.createElement("div",{className:"encounter-data ff-header"},s.a.createElement("span",{className:"target-name dropdown-parent",onClick:this.handleEncounterClick.bind(this)},t.title,s.a.createElement("div",{className:"dropdown-menu encounters-list-dropdown ".concat(this.state.showEncountersList?"":"hidden")},s.a.createElement("div",{onClick:this.props.onSelectEncounter.bind(this,null)},"Current Fight"),m.map(function(e,t){return s.a.createElement("div",{key:t,onClick:this.props.onSelectEncounter.bind(this,t)},e.Encounter.title)}.bind(this)))),s.a.createElement("span",{className:"duration"},"(",t.duration,")"),s.a.createElement("span",{className:"arrow ".concat(this.state.expanded?"up":"down"),onClick:this.handleExtraDetails.bind(this)})),s.a.createElement("div",{className:"chart-view-switcher",onClick:this.props.onViewChange},this.props.currentView)),s.a.createElement("div",{className:"extra-details"},"Damage"==this.props.currentView?s.a.createElement("div",{className:"data-set-view-switcher clearfix",onClick:this.handleToggleStats.bind(this)},s.a.createElement("span",{className:"data-set-option ".concat(this.state.group?"active":"")},"G"),s.a.createElement("span",{className:"data-set-option ".concat(this.state.group?"":"active")},"I")):null,s.a.createElement("div",{className:"extra-row damage"},s.a.createElement("div",{className:"cell"},s.a.createElement("span",{className:"label ff-header"},"Damage"),s.a.createElement("span",{className:"value ff-text"},"".concat(u(c.damage)," (").concat(u(c.encdps),")"))),s.a.createElement("div",{className:"cell"},s.a.createElement("span",{className:"label ff-header"},"Max"),s.a.createElement("span",{className:"value ff-text"},c.maxhit))),s.a.createElement("div",{className:"extra-row damage"},s.a.createElement("div",{className:"cell"},s.a.createElement("span",{className:"label ff-header"},"Crit%"),s.a.createElement("span",{className:"value ff-text"},u(parseFloat(c.crithits/c.hits*100))+"%")),s.a.createElement("div",{className:"cell"},s.a.createElement("span",{className:"label ff-header"},"Misses"),s.a.createElement("span",{className:"value ff-text"},t.misses)),s.a.createElement("div",{className:"cell"},s.a.createElement("span",{className:"label ff-header"},"Direct%"),s.a.createElement("span",{className:"value ff-text"},u(i)+"%")),s.a.createElement("div",{className:"cell"},s.a.createElement("span",{className:"label ff-header"},"DirectCrit%"),s.a.createElement("span",{className:"value ff-text"},u(o)+"%"))),s.a.createElement("div",{className:"extra-row healing"},s.a.createElement("div",{className:"cell"},s.a.createElement("span",{className:"label ff-header"},"Heals"),s.a.createElement("span",{className:"value ff-text"},"".concat(u(c.healed)," (").concat(u(c.enchps),")"))),s.a.createElement("div",{className:"cell"},s.a.createElement("span",{className:"label ff-header"},"Crit%"),s.a.createElement("span",{className:"value ff-text"},c["critheal%"])),s.a.createElement("div",{className:"cell"},s.a.createElement("span",{className:"label ff-header"},"Max"),s.a.createElement("span",{className:"value ff-text"},c.maxheal)))))}}]),t}(n.Component);h.defaultProps={encounter:{},onViewChange:function(){},onSelectEncounter:function(){},onExtraDetailsClick:function(){}};var u=function(e){return(e=parseFloat(e,10))>=1e3?(e/1e3).toFixed(2)+"K":e>=1e6?(e/1e6).toFixed(2)+"M":e.toFixed(2)},f=a(6),v=function(e){return(e=parseFloat(e,10))>=1e3?(e/1e3).toFixed(2)+"K":e>=1e6?(e/1e6).toFixed(2)+"M":e.toFixed(2)},E=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"jobImage",value:function(e){return"christianallred.github.io"===window.location.host?"".concat(window.location.origin,"/ffxiv-overlay/glow/").concat(e.toLowerCase(),".png"):"/glow/".concat(e.toLowerCase(),".png")}},{key:"render",value:function(){var e=Math.min(100,parseInt(this.props.total/this.props.max*100,10))+"%";return"---"===this.props.perSecond?null:s.a.createElement("li",{className:"row "+this.props.job.toLowerCase()+(this.props.isSelf?" self":""),onClick:this.props.onClick},s.a.createElement("div",{className:"bar",style:{width:e}}),s.a.createElement("div",{className:"text-overlay"},s.a.createElement("div",{className:"stats"},s.a.createElement("span",{className:"total"},this.props.totalFormatted),this.props.additional?s.a.createElement("span",{className:"additional"},"[",this.props.additional,"]"):null,"(",s.a.createElement("span",{className:"ps"},this.props.perSecond,","),s.a.createElement("span",{className:"percent"},this.props.percentage),")"),s.a.createElement("div",{className:"info"},s.a.createElement("span",{className:"job-icon"},s.a.createElement("img",{src:this.jobImage(this.props.job)})),s.a.createElement("span",{className:"rank"},this.props.rank,"."),s.a.createElement("span",{className:"character-name"},this.props.characterName),s.a.createElement("span",{className:"character-job"},this.props.job))))}}]),t}(n.Component);E.defaultProps={onClick:function(){}};var g=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"shouldComponentUpdate",value:function(e){return 0!==Object.getOwnPropertyNames(e.data).length}},{key:"render",value:function(){for(var e,t,a,n=[],r=Object(f.isArray)(this.props.data),c=r?this.props.data:Object.keys(this.props.data),l=(Math.max(c.length,12),c.slice(0,11)),i=!1,o=1,d=0;d<l.length;d++)a=null,t="YOU"===(e=r?this.props.data[d]:this.props.data[l[d]]).name||"You"===e.name,""!==e.Job&&("Healing"===this.props.currentView?parseInt(e.healed,10)>0&&(i||(i=parseFloat(e.healed)),a={job:e.Job||"",characterName:e.name,total:e.healed,totalFormatted:v(e.healed),perSecond:v(e.enchps),additional:e.OverHealPct,percentage:e["healed%"]}):"Tanking"===this.props.currentView?parseInt(e.damagetaken,10)>0&&(i||(i=parseFloat(e.damagetaken)),a={job:e.Job||"",characterName:e.name,total:e.damagetaken,totalFormatted:v(e.damagetaken),perSecond:e.ParryPct,percentage:e.BlockPct}):(i||(i=parseFloat(e.damage)),a={job:e.Job||"",characterName:e.name,total:e.damage,totalFormatted:v(e.damage),perSecond:v(e.encdps),percentage:e["damage%"]}),a&&(n.push(s.a.createElement(E,Object.assign({onClick:this.props.onClick,encounterDamage:this.props.encounterDamage,rank:o,data:e,isSelf:t,key:e.name,max:i},a))),o++));return s.a.createElement("ul",{className:"combatants"},n)}}]),t}(n.Component);g.defaultProps={onClick:function(){}};n.Component;var b=[],w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(d.a)(t).call(this,e))).onOverlayDataUpdate=function(e){a.setState({data:e.detail})},a.state={currentViewIndex:0,data:{}},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("onOverlayDataUpdate",this.onOverlayDataUpdate),document.addEventListener("onOverlayStateUpdate",this.onOverlayStateUpdate),document.addEventListener("message",this.onOverlayMessage)}},{key:"onOverlayStateUpdate",value:function(e){}},{key:"shouldComponentUpdate",value:function(e,t){return"---"!==t.data.Encounter.encdps&&(this.state.currentViewIndex!==t.currentViewIndex||!this.state.selectedEncounter)}},{key:"componentWillReceiveProps",value:function(e){}},{key:"handleCombatRowClick",value:function(e){}},{key:"handleClick",value:function(e){}},{key:"handleViewChange",value:function(e){var t=this.state.currentViewIndex;t>this.props.chartViews.length-2?t=0:t++,this.setState({currentViewIndex:t})}},{key:"handleSelectEncounter",value:function(e,t){e>=0?this.setState({selectedEncounter:b[e]}):this.setState({selectedEncounter:null}),this.render(),console.log("handle select",e)}},{key:"render",value:function(){var e=this,t=this.state.data.Combatant,a=this.state.data.Encounter;return this.state.selectedEncounter?(t=this.state.selectedEncounter.Combatant,a=this.state.selectedEncounter.Encounter):1===this.state.currentViewIndex?t=Object(f.sortBy)(Object(f.filter)(t,(function(e){return parseInt(e.healed,10)>0})),(function(t){if(1===e.state.currentViewIndex)return-parseInt(t.healed,10)})):2===this.state.currentViewIndex&&(t=Object(f.sortBy)(Object(f.filter)(t,(function(e){return parseInt(e.damagetaken,10)>0})),(function(t){if(2===e.state.currentViewIndex)return-parseInt(t.damagetaken,10)}))),s.a.createElement("div",{onClick:this.handleClick,className:"damage-meter"+(this.props.parseData.isActive?"":" inactive")+(this.props.noJobColors?"":" show-job-colors")},s.a.createElement(h,{encounter:a,data:t,onViewChange:this.handleViewChange.bind(this),onSelectEncounter:this.handleSelectEncounter.bind(this),currentView:this.props.chartViews[this.state.currentViewIndex]}),a&&a.damage?s.a.createElement(g,{currentView:this.props.chartViews[this.state.currentViewIndex],onClick:this.handleCombatRowClick,data:t,encounterDamage:a.damage}):null,null)}}]),t}(s.a.Component);w.defaultProps={chartViews:["Damage","Healing","Tanking"],parseData:{},noJobColors:!1};var N=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(w,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,a){e.exports=a(19)}},[[9,1,2]]]);
//# sourceMappingURL=main.c9bcc6c5.chunk.js.map