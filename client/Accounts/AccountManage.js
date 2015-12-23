/**
 * Created by Jeff on 2015-12-20.
 */
Template.signupForm.events({
    'submit #signup-form': function(event, template){
        event.preventDefault();
        console.log(template.find('#signup-email'));
        Accounts.createUser({
            email: template.find('#signup-email').value,
            password: template.find('#signup-password').value,
            profile: {
                name: template.find('#signup-name').value,
                country: template.find('#signup-country').value
            }
        },function(err){
            if(err){
                alert("account is not created");
            }
        });
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

        console.log(template.find('#login-email'));
        console.log(template.find('#login-password'));
        var email = template.find('#login-email').value;

        console.log(email);
        var password = template.find("#login-password").value;
        console.log(password);



        Meteor.loginWithPassword(email,password,function(err){
            if(err){
                alert("Wrong Credentials");
            }
        });
    }
});