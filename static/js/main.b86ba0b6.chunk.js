(this["webpackJsonpffxiv-overlay"]=this["webpackJsonpffxiv-overlay"]||[]).push([[0],{21:function(e,t,a){},22:function(e,t,a){},31:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(5),s=a.n(r),l=(a(21),a(22),a(3)),i=a(10),o=a(11),d=a(16),h=a(14),u=a(12),j=a.n(u),b=a(6),m=a(13),p=a.n(m),f=a(2),O=a(15),x=a(4),v=["title","DURATION","damage","dps","encdps","hits","crithits","crithit%","misses","maxhit","MAXHIT","healed","enchps","critheal%","maxheal","maxhealward","damagetaken","healstaken","powerdrain","powerheal","kills","deaths","CurrentZoneName","Last10DPS","Last30DPS","Last60DPS"],C=["name","DURATION","damage","damage%","dps","encdps","hits","crithits","crithit%","misses","swings","tohit","maxhit","MAXHIT","DirectHitPct","DirectHitCount","CritDirectHitPct","CritDirectHitCount","healed","healed%","enchps","critheals","critheal%","maxheal","MAXHEAL","maxhealward","MAXHEALWARD","OverHealPct","damagetaken","healstaken","powerdrain","powerheal","kills","deaths","threatdelta","Last10DPS","Last30DPS","Last60DPS","Job","ParryPct","BlockPct"],N="HANDLE_DATA_INJEST",w="HANDLE_STATE_CHANGE",g="HANDLE_ENCOUNTER_SELECT",D="HANDLE_COMBATANT_SELECT",E="HANDLE_CHART_VIEW_CHANGE",I="TOGGLE_SHOW_DETAILS",k="Damage",H="Healing",P="Tanking",S={data:{Encounter:{},Combatant:{}},Encounters:[],SelectedEncounter:null,SelectedCombatant:null,chartView:k,showDetails:!1},A=function(e){var t={};t=null!==e.SelectedEncounter?"ALL"===e.SelectedEncounter?U(e.Encounters):e.Encounters[e.SelectedEncounter]:e.data;var a=Object.assign({},t);return e.chartView===H?a.Combatant=Object(x.sortBy)(Object(x.filter)(a.Combatant,(function(e){return parseInt(e.healed,10)>0})),(function(e){return-parseInt(e.healed,10)})):e.chartView===P?a.Combatant=Object(x.sortBy)(Object(x.filter)(a.Combatant,(function(e){return parseInt(e.damagetaken,10)>0})),(function(e){return-parseInt(e.damagetaken,10)})):e.chartView===k&&(a.Combatant=Object(x.sortBy)(Object(x.filter)(a.Combatant,(function(e){return parseInt(e.damage,10)>0})),(function(e){return-parseInt(e.damage,10)}))),a},L=function(e){return A(e).Combatant.find((function(t){return t.name===e.SelectedCombatant}))},T=function(e){return{type:D,combatant:e}},y=Object(O.a)((function(e,t){switch(t.type){case N:var a=Object(x.cloneDeep)(e),n=F(t.data);if(a.data.Encounter&&"Encounter"===a.data.Encounter.title&&"Encounter"!==n.Encounter.title){var c=Object(x.concat)([n],a.Encounters);c.length>15&&c.pop(),a.Encounters=c}return a.data=n,a;case w:return e;case g:return Object(f.a)(Object(f.a)({},e),{},{SelectedEncounter:t.index,SelectedCombatant:null});case E:return Object(f.a)(Object(f.a)({},e),{},{chartView:V(e.chartView)});case I:return Object(f.a)(Object(f.a)({},e),{},{showDetails:!e.showDetails});case D:return Object(f.a)(Object(f.a)({},e),{},{SelectedCombatant:t.combatant});default:return e}}),S),V=function(e){switch(e){case k:return H;case H:return P;default:return k}},F=function(e){var t={Encounter:M(e.Encounter),Combatant:{}};for(var a in e.Combatant)e.Combatant.hasOwnProperty(a)&&(t.Combatant[a]=R(e.Combatant[a]));return t},M=function(e){var t={},a=function(a){if(!e.hasOwnProperty(a))return"continue";v.some((function(e){return e===a}))&&(t[a]=e[a])};for(var n in e)a(n);return t},R=function(e){var t={},a=function(a){if(!e.hasOwnProperty(a))return"continue";C.some((function(e){return e===a}))&&(t[a]=e[a])};for(var n in e)a(n);return t},U=function(e){for(var t=Object(x.cloneDeep)(e),a={Combatant:{},Encounter:{}},n=0;n<t.length;n++){var c=t[n],r=c.Combatant,s=c.Encounter;if(0!==n){for(var l in a.Encounter=_(s,a.Encounter),r)if(r.hasOwnProperty(l)){var i=r[l];a.Combatant.hasOwnProperty(l)?a.Combatant[l]=J(i,a.Combatant[l]):a.Combatant[l]=i}}else a=c}return a},_=function(e,t){return Object(f.a)(Object(f.a)({},t),{},{title:"All",duration:"--",DURATION:parseInt(t.DURATION)+parseInt(e.DURATION),damage:parseInt(t.damage)+parseInt(e.damage)})},J=function(e,t){return Object(f.a)(Object(f.a)({},t),{},{DURATION:parseInt(t.DURATION)+parseInt(e.DURATION),damage:parseInt(t.damage)+parseInt(e.damage),dps:0,encdps:0,hits:parseInt(t.hits)+parseInt(e.hits),crithits:parseInt(t.crithits)+parseInt(e.crithits),"crithit%":0,misses:parseInt(t.misses)+parseInt(e.misses),swings:parseInt(t.swings)+parseInt(e.swings),tohit:0,maxhit:0,MAXHIT:0,DirectHitPct:0,DirectHitCount:parseInt(t.DirectHitCount)+parseInt(e.DirectHitCount),CritDirectHitPct:0,CritDirectHitCount:parseInt(t.CritDirectHitCount)+parseInt(e.CritDirectHitCount),healed:parseInt(t.healed)+parseInt(e.healed),"healed%":0,enchps:0,critheals:parseInt(t.critheals)+parseInt(e.critheals),"critheal%":0,maxheal:0,MAXHEAL:0,maxhealward:0,MAXHEALWARD:0,OverHealPct:0,damagetaken:parseInt(t.damagetaken)+parseInt(e.damagetaken),healstaken:parseInt(t.healstaken)+parseInt(e.healstaken),powerdrain:parseInt(t.powerdrain)+parseInt(e.powerdrain),powerheal:parseInt(t.powerheal)+parseInt(e.powerheal),kills:parseInt(t.kills)+parseInt(e.kills),deaths:parseInt(t.deaths)+parseInt(e.deaths),threatdelta:0,Last10DPS:0,Last30DPS:0,Last60DPS:0,Job:e.Job,ParryPct:0,BlockPct:0})},B=(a(31),a(0)),X={handleEncounterSelect:function(e){return{type:g,index:e}}},G=Object(l.b)((function(e){return{Encounter:A(e).Encounter,Encounters:e.Encounters}}),X,null,{pure:!1})((function(e){var t=Object(n.useState)(!1),a=Object(b.a)(t,2),c=a[0],r=a[1],s=e.Encounters.map((function(t,a){return Object(B.jsx)("div",{onClick:function(){return e.handleEncounterSelect(a)},children:t.Encounter.title},a)}));return Object(B.jsx)("div",{className:"encounter-data ff-header",children:Object(B.jsxs)("span",{className:"button",onClick:function(){return r(!c)},children:[e.Encounter.title?e.Encounter.title:"Encounter"," - ",p()(e.Encounter.DURATION).format("00:00"),c?Object(B.jsxs)("div",{className:"dropdown-menu encounters-list-dropdown",children:[Object(B.jsx)("div",{onClick:function(){return e.handleEncounterSelect(null)},children:"Current Fight"}),s]}):null]})})})),W=function(e){return(e=parseFloat(e,10))>=1e3?(e/1e3).toFixed(2)+"K":e>=1e6?(e/1e6).toFixed(2)+"M":e.toFixed(2)},Y=(a(33),Object(l.b)((function(e){return Object(f.a)(Object(f.a)({},A(e)),{},{chartView:e.chartView,showDetails:e.showDetails})}),null,null,{pure:!1})((function(e){var t=Object(n.useState)(!0),a=Object(b.a)(t,2),c=a[0],r=a[1];if(!e.showDetails)return Object(B.jsx)("div",{});var s=e.Combatant,l=e.Encounter;if(!s)return Object(B.jsx)("div",{});var i=s.YOU,o=c?l:i;void 0===i&&(o=l);var d=0,h=0,u=0;if(c){if(void 0!==s){for(var j in s)s.hasOwnProperty(j)&&(h+=parseFloat(s[j].DirectHitPct.substring(0,s[j].DirectHitPct.length-1)),u+=parseFloat(s[j].CritDirectHitPct.substring(0,s[j].CritDirectHitPct.length-1)),d++);h>0&&(h=parseFloat(h/d)),u>0&&(u=parseFloat(u/d))}}else void 0!==i&&(h=i.DirectHitPct,u=i.CritDirectHitPct);return Object(B.jsxs)("div",{className:"extra-details",children:["Damage"===e.chartView?Object(B.jsxs)("div",{className:"data-set-view-switcher clearfix",onClick:function(){return r(!c)},children:[Object(B.jsx)("span",{className:"button data-set-option ".concat(c?"active":""),children:"Grp"}),Object(B.jsx)("span",{className:"button data-set-option ".concat(c?"":"active"),children:"Ind"})]}):null,Object(B.jsxs)("div",{className:"extra-row damage",children:[Object(B.jsxs)("div",{className:"cell",children:[Object(B.jsx)("span",{className:"label ff-header",children:"Damage"}),Object(B.jsx)("span",{className:"value ff-text",children:"".concat(W(o.damage)," (").concat(W(o.encdps),")")})]}),Object(B.jsxs)("div",{className:"cell",children:[Object(B.jsx)("span",{className:"label ff-header",children:"Max"}),Object(B.jsx)("span",{className:"value ff-text",children:o.maxhit})]})]}),Object(B.jsxs)("div",{className:"extra-row damage",children:[Object(B.jsxs)("div",{className:"cell",children:[Object(B.jsx)("span",{className:"label ff-header",children:"Crit%"}),Object(B.jsx)("span",{className:"value ff-text",children:W(parseFloat(o.crithits/o.hits*100))+"%"})]}),Object(B.jsxs)("div",{className:"cell",children:[Object(B.jsx)("span",{className:"label ff-header",children:"Misses"}),Object(B.jsx)("span",{className:"value ff-text",children:l.misses})]}),Object(B.jsxs)("div",{className:"cell",children:[Object(B.jsx)("span",{className:"label ff-header",children:"Direct%"}),Object(B.jsx)("span",{className:"value ff-text",children:W(h)+"%"})]}),Object(B.jsxs)("div",{className:"cell",children:[Object(B.jsx)("span",{className:"label ff-header",children:"DirectCrit%"}),Object(B.jsx)("span",{className:"value ff-text",children:W(u)+"%"})]})]}),Object(B.jsxs)("div",{className:"extra-row healing",children:[Object(B.jsxs)("div",{className:"cell",children:[Object(B.jsx)("span",{className:"label ff-header",children:"Heals"}),Object(B.jsx)("span",{className:"value ff-text",children:"".concat(W(o.healed)," (").concat(W(o.enchps),")")})]}),Object(B.jsxs)("div",{className:"cell",children:[Object(B.jsx)("span",{className:"label ff-header",children:"Crit%"}),Object(B.jsx)("span",{className:"value ff-text",children:o["critheal%"]})]}),Object(B.jsxs)("div",{className:"cell",children:[Object(B.jsx)("span",{className:"label ff-header",children:"Max"}),Object(B.jsx)("span",{className:"value ff-text",children:o.maxheal})]})]})]})}))),z=(a(34),{hanldeChartViewChange:function(){return{type:E}},hanldeToggleShowDetails:function(){return{type:I}}}),K=Object(l.b)((function(e){return{Encounters:e.Encounters,showDetails:e.showDetails,chartView:e.chartView}}),z,null,{pure:!1})((function(e){return Object(B.jsxs)("div",{className:"header",children:[Object(B.jsxs)("div",{className:"encounter-header",children:[Object(B.jsx)("div",{children:Object(B.jsx)(G,{})}),Object(B.jsxs)("div",{children:[Object(B.jsx)("div",{className:"button arrow",onClick:e.hanldeToggleShowDetails,children:e.showDetails?Object(B.jsx)("span",{children:"\u2191"}):Object(B.jsx)("span",{children:"\u2193"})}),Object(B.jsx)("div",{className:"button chart-view-switcher ".concat(e.chartView),onClick:e.hanldeChartViewChange,children:e.chartView})]})]}),Object(B.jsx)(Y,{})]})})),Z=(a(35),{hanldeCombatantSelect:T}),q=Object(l.b)(null,Z,null,{pure:!1})((function(e){var t,a=Math.min(100,parseInt(e.total/e.max*100,10))+"%";return"--- "===e.perSecond?null:Object(B.jsxs)("li",{className:"row "+(e.isSelf?" self":""),onClick:function(){return e.hanldeCombatantSelect(e.characterName)},children:[Object(B.jsx)("div",{className:"bar "+e.job.toLowerCase(),style:{width:a}}),Object(B.jsxs)("div",{className:"text-overlay",children:[Object(B.jsxs)("div",{className:"stats",children:[Object(B.jsx)("span",{className:"total",children:e.totalFormatted}),e.additional?Object(B.jsxs)("span",{className:"additional",children:["[",e.additional,"]"]}):null,"(",Object(B.jsxs)("span",{className:"ps",children:[e.perSecond,","]}),Object(B.jsx)("span",{className:"percent",children:e.percentage}),")"]}),Object(B.jsxs)("div",{className:"info",children:[Object(B.jsx)("span",{className:"job-icon",children:Object(B.jsx)("img",{src:(t=e.job,"/ffxiv-overlay/images/glow/".concat(t.toUpperCase(),".png")),alt:e.job})}),Object(B.jsxs)("span",{className:"rank",children:[e.rank,"."]}),Object(B.jsx)("span",{className:"character-name",children:e.characterName}),Object(B.jsx)("span",{className:"character-job",children:e.job})]})]})]})})),Q=(a(36),Object(l.b)((function(e){return{Combatants:A(e).Combatant,chartView:e.chartView}}),null,null,{pure:!1})((function(e){var t=Object.keys(e.Combatants),a=!1,n=0,c=t.map((function(t,c){if(c>20)return null;var r=e.Combatants[t],s=null,l="YOU"===r.name||"You"===r.name;if(""===r.Job)n+=1;else if(""!==r.Job)return e.chartView===H?parseInt(r.healed,10)>0&&(a||(a=parseFloat(r.healed)),s=function(e){return{job:e.Job||"",characterName:e.name,total:e.healed,totalFormatted:W(e.healed),perSecond:W(e.enchps),additional:e.OverHealPct,percentage:e["healed%"]}}(r)):e.chartView===P?parseInt(r.damagetaken,10)>0&&(a||(a=parseFloat(r.damagetaken)),s=function(e){return{job:e.Job||"",characterName:e.name,total:e.damagetaken,totalFormatted:W(e.damagetaken),perSecond:e.ParryPct,percentage:e.BlockPct}}(r)):(a||(a=parseFloat(r.damage)),s=function(e){return{job:e.Job||"",characterName:e.name,total:e.damage,totalFormatted:W(e.damage),perSecond:W(e.encdps),percentage:e["damage%"]}}(r)),Object(B.jsx)(q,Object(f.a)({onClick:e.onClick,rank:c+1-n,data:r,isSelf:l,max:a},s),r.name);return null}));return Object(B.jsx)("ul",{className:"combatants",children:c})}))),$=(a(37),{hanldeCombatantSelect:T}),ee=Object(l.b)((function(e){return{charView:e.chartView,Combatant:L(e)}}),$,null,{pure:!1})((function(e){var t=["damage","encdps","MAXHIT","crithit%","DirectHitPct","CritDirectHitPct","misses","tohit"].map((function(t,a){return Object(B.jsxs)("div",{children:[Object(B.jsxs)("span",{className:"label ff-header",children:[t.toLowerCase(),": "]}),Object(B.jsx)("span",{className:"value ff-text",children:W(e.Combatant[t])})]},a)})),a=["healed","enchps","OverHealPct","critheal%","MAXHEAL","MAXHEALWARD"].map((function(t,a){return Object(B.jsxs)("div",{children:[Object(B.jsxs)("span",{className:"label ff-header",children:[t.toLowerCase(),": "]}),Object(B.jsx)("span",{className:"value ff-text",children:W(e.Combatant[t])})]},a)})),n=["damagetaken","healstaken","ParryPct","BlockPct","threatdelta","deaths"].map((function(t,a){return Object(B.jsxs)("div",{children:[Object(B.jsxs)("span",{className:"label ff-header",children:[t.toLowerCase(),": "]}),Object(B.jsx)("span",{className:"value ff-text",children:W(e.Combatant[t])})]},a)}));return Object(B.jsxs)("div",{className:"combatant-detail",children:[Object(B.jsx)("span",{className:"button",onClick:function(){return e.hanldeCombatantSelect(null)},children:"back"}),Object(B.jsxs)("span",{className:"label ff-header",children:[" ",e.Combatant.name]}),Object(B.jsxs)("div",{className:"details-wrapper",children:[Object(B.jsxs)("div",{children:[Object(B.jsx)("span",{className:"label ff-header",children:"Damage"}),t]}),Object(B.jsxs)("div",{children:[Object(B.jsx)("span",{className:"label ff-header",children:"Healing"}),a]}),Object(B.jsxs)("div",{children:[Object(B.jsx)("span",{className:"label ff-header",children:"Tanking"}),n]})]})]})})),te=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(B.jsxs)("div",{onClick:this.handleClick,className:j()({"damage-meter":!0,resizable:!0}),children:[Object(B.jsx)(K,{}),this.props.SelectedCombatant?Object(B.jsx)(ee,{}):Object(B.jsx)(Q,{})]})}}]),a}(c.a.Component);te.defaultProps={parseData:{},noJobColors:!1};var ae,ne=Object(l.b)((function(e){var t=A(e),a=L(e);return{Combatants:t.Combatant,Encounter:t.Encounter,Encounters:e.Encounters,SelectedCombatant:a}}),null,null,{pure:!1})(te);ae=y.dispatch,y.getState,window.addOverlayListener("CombatData",(function(e){console.log(e),ae({type:N,data:e})})),window.startOverlayEvents();var ce=function(){return Object(B.jsx)(l.a,{store:y,children:Object(B.jsx)(ne,{})})},re=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,39)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))};s.a.render(Object(B.jsx)(ce,{}),document.getElementById("root")),re()}},[[38,1,2]]]);
//# sourceMappingURL=main.b86ba0b6.chunk.js.map