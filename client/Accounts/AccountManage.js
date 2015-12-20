/**
 * Created by Jeff on 2015-12-20.
 */
Template.signupForm.events({
    'submit #signup-form': function(event, template){
        event.preventDefault();

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