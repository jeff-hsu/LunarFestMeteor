/**
 * Created by Jeff on 2015-12-11.
 */
Meteor.subscribe('allUsers');

Template.UserList.helpers({
    "users": function(){
        return Meteor.users.find({},{sort: {"profile.country":1}});
    }
})