!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var i;i=jQuery,window.CalendarPlusAdmin={models:{},views:{},collections:{},misc:{},helpers:{template:function(e){return _.template(document.getElementById(e).innerHTML)},setSelectedLocation:function(e){if(!e.toJSON().id)return;let t=new CalendarPlusAdmin.views.SelectedLocation({model:e});i("#selected-location").html("").hide().append(t.render().el).fadeIn()}}},n(1),n(2),n(3),n(4),n(5),n(6)},function(e,t){jQuery,window.CalendarPlusAdmin.models.LocationSelector=Backbone.Model.extend({defaults:{type:!1,mapOptions:{},markerOptions:{},mapModel:!1,mapView:!1}})},function(e,t){var n;n=jQuery,window.CalendarPlusAdmin.views.LocationSelector=Backbone.View.extend({$currentTab:!1,tabs:[],$currentSelector:!1,$metaboxInside:!1,events:{"click .location-selector":"setSelector"},initialize:function(){this.$metaboxInside=n("#calendar-location-location").first(),this.listenTo(this.model,"change:type",this.changeType)},render:function(){let e=CalendarPlusAdmin.helpers.template("location-type-selector-template");if(this.$el.html(e({})),!this.tabs.length){let e=this.$el.find(".location-selector-tab"),t=this;e.each(function(e,i){t.tabs[i.id]=n(i)})}return this},setSelector:function(e){e.preventDefault();let t=n(e.target).data("type");t!==this.model.get("type")&&(this.model.set("type",t),this.changeType())},changeType:function(){let e=this.model.get("type");0!=this.$currentSelector&&this.$currentSelector.removeClass("selected"),0!=this.$currentTab&&this.$currentTab.hide(),n("input[name=location-type]").val(e),this.$currentTab=this.tabs["location-"+e].first(),this.$currentSelector=n("#location-selector-"+e),this.$currentSelector.addClass("selected");let t=this;this.$currentTab.fadeIn(function(){"gmaps"===e&&t.loadMap()})},loadMap:function(){this.mapModel||(this.mapModel=new CalendarPlusAdmin.models.GMap({mapOptions:this.model.get("mapOptions"),markerOptions:this.model.get("markerOptions")}),this.mapView=new CalendarPlusAdmin.views.GMap({model:this.mapModel}),this.mapView.render())}})},function(e,t){jQuery,window.CalendarPlusAdmin.models.GMap=Backbone.Model.extend({defaults:{mapOptions:{},markerOptions:{},address:!1,marker:!1,center:!1,address:"",infowindow:!1,textBox:!1,htmlBox:!1},initialize:function(){this.set("address",this.get("markerOptions").address)}})},function(e,t){var n;window.gm_authFailure=function(e){document.getElementById("map_canvas").innerHTML=CalendarPlusi18n.gmaps_api_key_error},n=jQuery,window.CalendarPlusAdmin.views.GMap=Backbone.View.extend({canvas:!1,searchBox:!1,$mapOptionsFields:!1,initialize:function(){this.canvas=document.getElementById("map_canvas"),this.searchBox=document.getElementById("location-gmaps-search"),this.$mapOptionsFields=n(".location-gmaps-map-options"),this.listenTo(this.model,"change",this.updateMapFields)},render:function(){if("function"==typeof google.maps.Map){let e=this.model.get("mapOptions"),t=this.model.get("markerOptions"),a=new google.maps.Map(this.canvas,e);this.dropMarker(t.position.lat(),t.position.lng(),a),a.controls[google.maps.ControlPosition.TOP_LEFT].push(this.searchBox),this.searchBox=new google.maps.places.SearchBox(this.searchBox),n("#location-gmaps-search").keydown(function(e){13==e.keyCode&&e.preventDefault()}),this.model.set("center",a.center),this.model.set("zoom",a.getZoom());let s=this;google.maps.event.addListener(this.searchBox,"places_changed",function(){let e,t=s.searchBox.getPlaces(),n=s.model.get("marker");if(e=!1===n?[]:[n],0===t.length)return;for(let t=0;n=e[t];t++)n.setMap(null);e=[];let l,r=new google.maps.LatLngBounds;for(i=0;l=t[i];i++)s.dropMarker(l.geometry.location.lat(),l.geometry.location.lng(),a),e.push(n),r.extend(l.geometry.location);a.fitBounds(r)}),google.maps.event.addListener(a,"bounds_changed",function(e){s.model.set("center",a.center),s.model.set("zoom",a.getZoom())})}return this},dropMarker:function(e,t,n){let i=this.model.get("marker"),a=this;!1!==i?(i=this.moveMarker(e,t)).setMap(n):(i=new google.maps.Marker({position:new google.maps.LatLng(e,t),draggable:!0,map:n})).set("editing",!1),google.maps.event.addListener(i,"drag",function(e){a.moveMarker(e.latLng.lat(),e.latLng.lng(),n)}),this.model.set("marker",i),this.model.set("center",i.map.center),this.model.set("zoom",i.map.getZoom())},moveMarker:function(e,t){let n=this.model.get("marker");return n.setPosition(new google.maps.LatLng(e,t)),this.model.set("marker",n),this.updateMapFields(),n},updateMapFields:function(){let e=this.model.get("marker"),t=this.model.get("center"),n=this.model.get("zoom"),i=this.model.get("address");!1!==e?(this.$mapOptionsFields.find('[name="gmaps[location-gmaps-marker-lat]"]').first().val(e.getPosition().lat()),this.$mapOptionsFields.find('[name="gmaps[location-gmaps-marker-long]"]').first().val(e.getPosition().lng())):(this.$mapOptionsFields.find('[name="gmaps[location-gmaps-marker-lat]"]').first().val(""),this.$mapOptionsFields.find('[name="gmaps[location-gmaps-marker-long]"]').first().val("")),!1!==t?(this.$mapOptionsFields.find('[name="gmaps[location-gmaps-lat]"]').first().val(t.lat()),this.$mapOptionsFields.find('[name="gmaps[location-gmaps-long]"]').first().val(t.lng())):(this.$mapOptionsFields.find('[name="gmaps[location-gmaps-lat]"]').first().val(""),this.$mapOptionsFields.find('[name="gmaps[location-gmaps-long]"]').first().val("")),!1!==n?this.$mapOptionsFields.find('[name="gmaps[location-gmaps-zoom]"]').first().val(n):this.$mapOptionsFields.find('[name="gmaps[location-gmaps-zoom]"]').first().val(2),this.$mapOptionsFields.find('[name="gmaps[location-gmaps-address]"]').first().val(i)}})},function(e,t){var n;n=jQuery,window.CalendarPlusAdmin.misc.eventDetailsMetabox=function(e){if(this.args={selector:!1,settings:{regular:{},recurrent:{},datespan:{}},type:"regular",wrapper:!1,disabled:0},n.extend(this.args,e),this.settings=this.args.settings,this.$selector=this.args.selector,this.type=this.args.type,this.$el=this.args.wrapper||n("#event-dates"),"1"==this.args.disabled&&this.disableInputs(),!this.$selector||!this.$selector.length)return!1;this.init()},window.CalendarPlusAdmin.misc.eventDetailsMetabox.prototype.disableInputs=function(){n("#edit-dates").length&&(this.$el.find("input, select, #event-dates-recurrent-exclusions-add, #add-regular-event").not("#edit-dates").attr("disabled","disabled"),this.$el.find("a.remove-link").hide())},window.CalendarPlusAdmin.misc.eventDetailsMetabox.prototype.enableInputs=function(){this.$el.find("input, select, #event-dates-recurrent-exclusions-add, #add-regular-event").not("#edit-dates").removeAttr("disabled"),this.$el.find("a.remove-link").show()},window.CalendarPlusAdmin.misc.eventDetailsMetabox.prototype.init=function(){let e=this,t=this.$el.find(".event-dates-option");this.$options={},this.$options.regular=new window.CalendarPlusAdmin.misc.eventDetailRegularItem({element:t.filter("#event-dates-regular").first(),add_new_button:t.find("#add-regular-event").first(),settings:this.settings.regular}),this.$options.recurrent=new window.CalendarPlusAdmin.misc.eventDetailRecurrentItem({element:t.filter("#event-dates-recurrent").first(),settings:this.settings.recurrent}),this.$options.datespan=new window.CalendarPlusAdmin.misc.eventDetailDatespanItem({element:t.filter("#event-dates-datespan").first(),settings:this.settings.datespan}),this.$options[this.type].display(),this.$selector.change(function(t){e.setSelection.call(e,n(this).val())}),this.$editDatesCheckbox=this.$el.find("#edit-dates").change(function(t){n(this).is(":checked")?e.enableInputs():e.disableInputs()})},window.CalendarPlusAdmin.misc.eventDetailsMetabox.prototype.setSelection=function(e){e!==this.type&&(this.$options[this.type].hide(),this.type=e,this.$options[this.type].display(),this.$el.find("#edit-dates").is(":checked")?this.enableInputs():this.disableInputs())},window.CalendarPlusAdmin.misc.eventDetailRegularItem=function(e){this.args={settings:{},element:!1,add_new_button:!1,template:n("#event-regular-date-template")},n.extend(this.args,e),this.index=n("#standard-dates-index").val(),this.$el=this.args.element,this.$add_new_button=this.args.add_new_button,this.$template=this.args.template,this.init()},window.CalendarPlusAdmin.misc.eventDetailRegularItem.prototype.init=function(){let e=this;"0"==this.index&&this.addRegularDate(),this.$add_new_button.click(function(t){return t.preventDefault(),e.addRegularDate(),!1}),n(".remove-regular-event").click(function(t){return t.preventDefault(),e.removeRegularDate(n(this).data("regular-date-id")),!1}),this.$el.find(".datepicker").datepicker({dateFormat:"yy-mm-dd"});let t=n("#event-dates-regular-time-all-day-event");t.change(function(){n(this).is(":checked")?e.$el.addClass("all-day-event"):e.$el.removeClass("all-day-event")}),t.trigger("change")},window.CalendarPlusAdmin.misc.eventDetailRegularItem.prototype.addRegularDate=function(){this.index++;let e=this,t=this.$template.clone();t.attr("id","event-regular-date-"+this.index).addClass("event-regular-date-item").show();let i=t.find(".remove-regular-event").first();i.attr("data-regular-date-id",this.index),i.click(function(t){return t.preventDefault(),e.removeRegularDate(n(this).data("regular-date-id")),!1}),t.find(".standard-dates-datepicker").datepicker({dateFormat:"yy-mm-dd"}),t.insertBefore(this.$add_new_button)},window.CalendarPlusAdmin.misc.eventDetailRegularItem.prototype.removeRegularDate=function(e){return this.$el.find("#event-regular-date-"+e).slideUp(function(){n(this).detach()}),this.$el},window.CalendarPlusAdmin.misc.eventDetailRegularItem.prototype.display=function(){return this.$el.fadeIn(),this.$el},window.CalendarPlusAdmin.misc.eventDetailRegularItem.prototype.hide=function(){return this.$el.fadeOut(),this.$el},window.CalendarPlusAdmin.misc.eventDetailDatespanItem=function(e){this.args={settings:{},element:!1,add_new_button:!1,template:n("#event-datespan-date-template")},n.extend(this.args,e),this.$el=this.args.element,this.$template=this.args.template,this.init()},window.CalendarPlusAdmin.misc.eventDetailDatespanItem.prototype.init=function(){let e=this;this.$el.find(".datepicker").datepicker({dateFormat:"yy-mm-dd"});let t=n("#event-dates-datespan-time-all-day-event");t.change(function(){n(this).is(":checked")?e.$el.addClass("all-day-event"):e.$el.removeClass("all-day-event")}),t.trigger("change")},window.CalendarPlusAdmin.misc.eventDetailDatespanItem.prototype.addDatespanDate=function(){this.index++;let e=this,t=this.$template.clone();t.attr("id","event-regular-date-"+this.index).addClass("event-regular-date-item").show();let i=t.find(".remove-regular-event").first();i.attr("data-regular-date-id",this.index),i.click(function(t){return t.preventDefault(),e.removeDatespanDate(n(this).data("regular-date-id")),!1}),t.find(".standard-dates-datepicker").datepicker({dateFormat:"yy-mm-dd"}),t.insertBefore(this.$add_new_button)},window.CalendarPlusAdmin.misc.eventDetailDatespanItem.prototype.removeDatespanDate=function(e){return this.$el.find("#event-regular-date-"+e).slideUp(function(){n(this).detach()}),this.$el},window.CalendarPlusAdmin.misc.eventDetailDatespanItem.prototype.display=function(){return this.$el.fadeIn(),this.$el},window.CalendarPlusAdmin.misc.eventDetailDatespanItem.prototype.hide=function(){return this.$el.fadeOut(),this.$el},window.CalendarPlusAdmin.misc.eventDetailRecurrentItem=function(e){this.args={settings:{},element:!1},n.extend(this.args,e),this.exclusionsIndex=n("#recurring-exclusions-index").val(),this.$el=this.args.element,this.$addExclusionsButton=this.$el.find("#event-dates-recurrent-exclusions-add"),this.$exclusionsList=this.$el.find("#event-dates-recurrent-exclusions-list"),this.$exclusionsTemplate=this.$el.find("#event-dates-recurrent-exclusions-date-template"),this.$everyContainers=this.$el.find(".recurring-every-container"),this.$everySelector=this.$el.find("#recurring-frequency-every"),this.init()},window.CalendarPlusAdmin.misc.eventDetailRecurrentItem.prototype.init=function(){let e=this;this.$addExclusionsButton.click(function(t){return t.preventDefault(),e.addExcludedDate(),!1}),this.showEveryContainer(this.$everySelector.val()),this.$everySelector.change(function(){e.showEveryContainer(n(this).val())}),this.$el.find(".remove-exclusions-date").click(function(t){return t.preventDefault(),e.removeExcludedDate(n(this).data("excluded-date-id")),!1});let t=this.$el.find("#event-dates-recurrent-time-all-day-event");t.change(function(){n(this).is(":checked")?n("#event-dates-recurrent-time").find(".recurring-times-from").slideUp():(n("#edit-dates").is(":checked")||n("#event-dates-recurrent-time").find(".recurring-times-from").hide(),n("#event-dates-recurrent-time").find(".recurring-times-from").slideDown())}),t.trigger("change")},window.CalendarPlusAdmin.misc.eventDetailRecurrentItem.prototype.hideEveryContainers=function(){this.$everyContainers.hide(),this.$everyContainers.find(".recurring-every-field").attr("disabled",!0)},window.CalendarPlusAdmin.misc.eventDetailRecurrentItem.prototype.showEveryContainer=function(e){this.hideEveryContainers(),this.$everyContainers.filter(".recurring-every-"+e).show(),this.$everyContainers.find(".recurring-every-field-"+e).attr("disabled",!1)},window.CalendarPlusAdmin.misc.eventDetailRecurrentItem.prototype.display=function(){return this.$el.fadeIn(),this.$el},window.CalendarPlusAdmin.misc.eventDetailRecurrentItem.prototype.hide=function(){return this.$el.fadeOut(),this.$el},window.CalendarPlusAdmin.misc.eventDetailRecurrentItem.prototype.addExcludedDate=function(){let e=this;this.exclusionsIndex++;let t=this.$exclusionsTemplate.clone();t.attr("id","recurring-exclusions-"+this.exclusionsIndex).removeClass("hidden");let i=t.find(".remove-exclusions-date").first();i.attr("data-excluded-date-id",this.exclusionsIndex),i.click(function(t){return t.preventDefault(),e.removeExcludedDate(n(this).data("excluded-date-id")),!1}),(t=this.$exclusionsList.append(t)).find(".recurring-exclusions-datepicker").datepicker({dateFormat:"yy-mm-dd"})},window.CalendarPlusAdmin.misc.eventDetailRecurrentItem.prototype.removeExcludedDate=function(e){return this.$exclusionsList.find("#recurring-exclusions-"+e).detach(),this.$exclusionsList}},function(e,t){var n;n=jQuery,window.CalendarPlusAdmin.misc.Calendar=function(e){this.init(e)},window.CalendarPlusAdmin.misc.Calendar.prototype.init=function(e){let t=this;this.fillWeekCalendar(),n(".calendarp_calendar .event").click(function(e){t.showPopup(n(e.target).data("calendar-cell-id"))}),n(".calendarp-calendar-backdrop").click(this.hidePopups),n(".calendar_popup .close-popup").click(this.hidePopups),n(".calendar_popup .delete-calendar-cell").click(function(e){t.deleteCell.apply(t,[e])}),n(".calendar_popup .edit-calendar-cell").click(function(e){t.toggleToEditCell.apply(t,[e])})},window.CalendarPlusAdmin.misc.Calendar.prototype.showPopup=function(e){let t=n("#calendar-popup-cell-id-"+e);this.hidePopups(),t.show(),n(".calendarp-calendar-backdrop").show()},window.CalendarPlusAdmin.misc.Calendar.prototype.hidePopups=function(){n(".calendar_popup").hide(),n(".calendarp-calendar-backdrop").hide(),n(".calendar_popup .popup-inner-content").show(),n(".calendar_popup .popup-footer-inner-content").show(),n(".calendar_popup .popup-inner-content-editable").hide(),n(".calendar_popup .popup-footer-inner-content-editable").hide()},window.CalendarPlusAdmin.misc.Calendar.prototype.deleteCell=function(e){if(e.preventDefault(),!confirm(CalendarPlusi18n.delete_calendar_event))return void this.hidePopups();let t=n(e.target).data("cell-id");n(".event-cell-"+t).hide(),this.hidePopups(),n.ajax({url:CalendarPlusi18n.ajaxurl,type:"POST",data:{action:"calendarp_remove_calendar_cell",cell_id:t}})},window.CalendarPlusAdmin.misc.Calendar.prototype.toggleToEditCell=function(e){e.preventDefault();let t=this,i=n(e.target).data("cell-id"),a=n("#calendar-popup-cell-id-"+i);a.length&&(a.find(".popup-inner-content").hide(),a.find(".popup-footer-inner-content").hide(),a.find(".popup-inner-content-editable").show(),a.find(".popup-footer-inner-content-editable").show(),a.find(".save-calendar-cell").click(function(e){e.preventDefault(),t.saveCell.apply(a,[e,t])}))},window.CalendarPlusAdmin.misc.Calendar.prototype.saveCell=function(e,t){let i=this.data("cell-id"),a=this.find(".spinner");a.css("visibility","visible"),a.show();let s={from_time:this.find('select[name="from-time-hour-'+i+'"]').first().val()+":"+this.find('select[name="from-time-minute-'+i+'"]').first().val(),until_time:this.find('select[name="to-time-hour-'+i+'"]').first().val()+":"+this.find('select[name="to-time-minute-'+i+'"]').first().val(),from_am_pm:this.find('select[name="from-time-am-pm-'+i+'"]').first().val(),until_am_pm:this.find('select[name="to-time-am-pm-'+i+'"]').first().val(),cell_id:i,action:"calendarp_edit_calendar_cell"};n.ajax({url:CalendarPlusi18n.ajaxurl,type:"POST",data:s}).always(function(){location.reload(!0)})},window.CalendarPlusAdmin.misc.Calendar.prototype.fillWeekCalendar=function(){n("#calendar-slots .event").each(function(e){let t=n(this),i=t.data("date");t.detach().appendTo(n("#"+i))})}}]);
//# sourceMappingURL=admin.js.map