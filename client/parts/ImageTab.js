/**
 * Created by Jeff on 2016-01-03.
 */
Template.imageTab.onCreated(function(){
    Session.set("filterImageQuery",{});
    Session.set("currentFilterTab", "all");
});

Template.imageTab.onDestroyed( function() {

    Session.set("filterImageQuery",undefined);
    Session.set("currentFilterTab", undefined);
});

Template.imageTab.helpers({
    isCurrentTab : function(tab){
        return Session.get("currentFilterTab")===tab;
    }
});

Template.imageTab.events({
    "click #imageTab-all":function(event){
        event.preventDefault();
        Session.set("currentFilterTab","all");
        Session.set("filterImageQuery",{});
    },
    "click #imageTab-app":function(event){
        event.preventDefault();
        Session.set("currentFilterTab","app")
        Session.set("filterImageQuery",{status: "approved"});
    },
    "click #imageTab-pen":function(event){
        event.preventDefault();
        Session.set("currentFilterTab","pen")
        Session.set("filterImageQuery",{status: "pending"});
    },
    "click #imageTab-ina":function(event){
        event.preventDefault();
        Session.set("currentFilterTab","ina")
        Session.set("filterImageQuery",{status: "inappropriate"});
    },

})