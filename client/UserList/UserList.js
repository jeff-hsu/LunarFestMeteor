/**
 * Created by Jeff on 2015-12-11.
 */
Meteor.subscribe('allUsers');

Template.UserList.helpers({
    "getUsersList": function(){
        return Meteor.users.find();
    },
    "settings": function(){
        return {
          collection:  Meteor.users.find(),
            showFilter: true,
            showColumnToggles: true,
            fields:[
                {key: 'profile.name', label: 'Name'},
                {key: 'username', label: 'User Name'},
                {key: 'emails.0.address', label: 'Email'},
                {key: 'profile.country', label: 'Country'},
                {key: 'roles', label: 'Role'},
                {
                    key: 'createdAt',
                    label: 'Registered Date',
                    fn: function (value) {
                        return (new Date(value)).toDateString()
                    }
                }
            ],
        };
    }
})