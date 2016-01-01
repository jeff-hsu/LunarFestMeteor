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

    process.env.MAIL_URL = 'smtp://' +
        encodeURIComponent(Meteor.settings.private.MailgunUsername) + ':' +
        encodeURIComponent(Meteor.settings.private.MailgunPassword) + '@' +
        encodeURIComponent(Meteor.settings.private.MailgunServer) + ':' + Meteor.settings.private.MailgunPort;

    Accounts.emailTemplates = {
      from: 'LunarFest <signup@lunarfest.com>',
      siteName: 'Lunar Fest',
      verifyEmail: {
        subject: function(user) {
          return 'Verification email from lunarfest.com';
        },
        text: function(user, url) {
          return 'Hi,\n' +
              'Please open the link below to verify your account on lunarfest.com:\n' + url;
        }
      }
    };

    Accounts.config({
      sendVerificationEmail: true
    });

    FlowRouter.initialize({hashbang: true});

  });

}
