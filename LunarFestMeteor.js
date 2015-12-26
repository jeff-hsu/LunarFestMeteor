if (Meteor.isClient) {
  Template.registerHelper('_', function(){
    return _;
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if(Meteor.users.findOne({username:"admin"})==undefined){
      Accounts.createUser({
        username: "admin",
        email:"admin@111.com",
        password: "123456",
        profile: {
          name: "admin"
        }
      });
      var user = Meteor.users.findOne({username: "admin"});
      Roles.addUsersToRoles( user._id ,  ["admin"] );
    }

  });
}
