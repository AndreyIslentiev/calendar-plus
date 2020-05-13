!function(e){var t={};function a(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,a),l.l=!0,l.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)a.d(n,l,function(t){return e[t]}.bind(null,l));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=8)}({8:function(e,t){jQuery,tinymce.PluginManager.add("calendarp_shortcodes",function(e){let t=tinymce.activeEditor,a=function(e,t){let a=[];for(let n in e)e.hasOwnProperty(n)&&a.push({type:"checkbox",name:t+e[n].value,text:e[n].text,value:e[n].value});return a},n=t.getLang("calendarp_l10n.category_field_values"),l=t.getLang("calendarp_l10n.tag_field_values"),o=a(n,"category_"),r=a(l,"tag_"),_=n,d=[{text:t.getLang("calendarp_l10n.calendar_title"),onclick:function(){e.windowManager.open({title:t.getLang("calendarp_l10n.calendar_title"),body:[{type:"infobox",classes:"categories-infobox",minHeight:50,border:"none"},{type:"container",name:"categories_list_start",label:t.getLang("calendarp_l10n.category_field_title"),items:o,html:'<div class="calp_mce_categories_list">'},{type:"container",name:"categories_list_end",label:"",html:"</div>"},{type:"listbox",name:"default_view_field",label:t.getLang("calendarp_l10n.default_view_title"),values:t.getLang("calendarp_l10n.default_view_values")},{type:"listbox",name:"time_format",label:"Time format",values:[{text:"11:00 pm",value:"g:i a"},{text:"23:00",value:"H:i"}]},{type:"listbox",name:"dow_format",label:"Day of the week format",values:[{text:"Sunday",value:"l"},{text:"Sun",value:"D"}]},{type:"listbox",name:"month_name_format",label:"Month name format",values:[{text:"Jan",value:"M"},{text:"January",value:"F"}]},{type:"listbox",name:"day_format",label:"Day format",values:[{text:"09",value:"d"},{text:"9",value:"j"}]},{type:"listbox",name:"date_format",label:"Date format",values:[{text:"15/09",value:"d/m"},{text:"15/9",value:"j/n"},{text:"09/15",value:"m/d"},{text:"9/15",value:"n/j"}]},{type:"infobox",classes:"day-format-infobox",minHeight:34,border:"none"}],onopen:function(e){e.target.$el.find(".mce-day-format-infobox").append('<a target="_blank" href="https://codex.wordpress.org/Formatting_Date_and_Time">Documentation on date and time formatting</a>').css({color:"#0073aa"}),e.target.$el.find(".mce-categories-infobox").prepend("<p>"+t.getLang("calendarp_l10n.category_field_info")+"</p>")},onsubmit:function(a){let n,l,o,r,d,c,s,f;for(i in o=[],_)_.hasOwnProperty(i)&&!0===a.data["category_"+_[i].value]&&o.push(_[i].value);n=0!==o.length?' category="'+o.join(",")+'"':"",l="month"!==a.data.default_view_field?' view="'+a.data.default_view_field+'"':"",r=a.data.time_format!==t.getLang("calendarp_l10n.default_time_format")?' time_format="'+a.data.time_format+'"':"",d="l"!==a.data.dow_format?' dow_format="'+a.data.dow_format+'"':"",c="M"!==a.data.month_name_format?' month_name_format="'+a.data.month_name_format+'"':"",s="d"!==a.data.day_format?' day_format="'+a.data.day_format+'"':"",f="d/m"!==a.data.date_format?' date_format="'+a.data.date_format+'"':"",e.insertContent("[calendarp-calendar"+n+l+r+d+c+f+s+"]")}})}},{text:t.getLang("calendarp_l10n.events_by_cat_title"),onclick:function(){e.windowManager.open({title:t.getLang("calendarp_l10n.events_by_cat_title"),body:[{type:"infobox",classes:"categories-infobox",minHeight:50,border:"none"},{type:"container",name:"events_by_cat_categories_list_start",label:t.getLang("calendarp_l10n.events_by_cat_category_field_title"),items:o,html:'<div class="calp_mce_categories_list">'},{type:"container",name:"events_by_cat_categories_list_end",label:"",html:"</div>"},{type:"container",name:"events_by_cat_tags_list_start",label:t.getLang("calendarp_l10n.events_by_cat_tag_field_title"),items:r,html:'<div class="calp_mce_tags_list">'},{type:"container",name:"events_by_cat_tags_list_end",label:"",html:"</div>"},{type:"textbox",name:"events_by_cat_events_count_field",label:t.getLang("calendarp_l10n.events_by_cat_events_count_field_title"),value:"0",maxLength:3,size:3}],onopen:function(e){e.target.$el.find(".mce-categories-infobox").prepend("<p>"+t.getLang("calendarp_l10n.events_by_cat_info")+"</p>")},onsubmit:function(t){let a=function(e,a){let n=[];for(let l in e)e.hasOwnProperty(l)&&!0===t.data[a+e[l].value]&&n.push(e[l].value);return n},o=a(n,"category_"),i=a(l,"tag_"),r=0===o.length?"":' category="'+o.join(",")+'"',_=0===i.length?"":' tag="'+i.join(",")+'"',d="0"!==t.data.events_by_cat_events_count_field?' events="'+t.data.events_by_cat_events_count_field+'"':"";e.insertContent("[calendarp-events-list"+r+_+d+"]")}})}},{text:t.getLang("calendarp_l10n.single_event_title"),onclick:function(){e.windowManager.open({title:t.getLang("calendarp_l10n.single_event_title"),body:[{type:"textbox",name:"event_title",classes:"event-title-field",label:t.getLang("calendarp_l10n.search_event"),value:"",size:25},{type:"textbox",name:"event_id",classes:"event-id-field",value:"",hidden:!0}],onopen:function(e){let a=jQuery(e.target.$el.find(".mce-event-title-field"));a.attr("placeholder",t.getLang("calendarp_l10n.search_event_by_title"));let n=jQuery(e.target.$el.find(".mce-event-id-field"));a.autocomplete({source:function(e,t){(new wp.api.collections.Calendar_event).fetch({data:{search:e.term}}).done(function(e){let a,n=e.length,l=[];for(a=0;a<n;a++)l.push({id:e[a].id,label:jQuery("<span />").html(e[a].title.rendered).text()});t(l)})},appendTo:a.parent(),search:function(){n.val("")},select:function(e,t){n.val(t.item.id)}})},onsubmit:function(t){let a;a="all"!=t.data.event_id?' event_id="'+t.data.event_id+'"':"",e.insertContent("[calendarp-event"+a+"]")}})}}];e.addButton("calendarp_shortcodes",{icon:"mce-i-calendarp",menu:d,type:"menubutton"})})}});
//# sourceMappingURL=editor-shortcode.js.map