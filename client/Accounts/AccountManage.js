/**
 * Created by Jeff on 2015-12-20.
 */
Template.signupForm.events({
    'submit #signup-form': function(event, template){
        event.preventDefault();
        Accounts.createUser({
            username: template.find('#signup-username').value,
            email: template.find('#signup-email').value,
            password: template.find('#signup-password').value,
            profile: {
                name: template.find('#signup-name').value,
                country: template.find('#signup-country').value
            }
        });
    },

});

Template.logoutForm.events({
    'submit #logout-form':function(event,template){
        event.preventDefault();

        Accounts.logout(function(err){
            if(err){
                alert("unable to logout");
            }
        });
    }
});

Template.loginForm.events({
    'submit #login-form':function(event,template){
        event.preventDefault();
        var email = template.find('#login-email').value;
        var password = template.find("#login-password").value;

        Meteor.loginWithPassword(email,password,function(err){
            if(err){
                alert("Wrong Credentials");
            }
        });
    },
    'click #forgot-password':function(){
        event.preventDefault();

        FlowRouter.go("/reset-password");
    }
});