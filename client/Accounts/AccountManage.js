/**
 * Created by Jeff on 2015-12-20.
 */
Template.signupForm.events({
    'submit #signup-form': function(event, template){
        event.preventDefault();
        console.log(template.find('#signup-email'));
        Meteor.call('create_user',
            template.find('#signup-username').value,
            template.find('#signup-email').value,
            template.find('#signup-password').value,
            template.find('#signup-name').value,
            template.find('#signup-country').value
        )
        Meteor.loginWithPassword(template.find('#signup-email').value,template.find('#signup-password').value);

    }
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
    }
});