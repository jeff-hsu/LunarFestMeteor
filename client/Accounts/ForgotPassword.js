/**
 * Created by Jeff on 2016-01-01.
 */
Template.forgotPassword.events({
    'submit #enterEmail':function(event,template){
        event.preventDefault();
        var email = template.find('#enterEmail-email').value;

        Accounts.forgotPassword({email:email},function(error){
            if(error){
                toastr.error(
                    "Error in sending reset link " + error,
                    "Reset Password Link Failed to Send",
                    {
                        "closeButton": true,
                        "positionClass": "toast-top-center",
                        "timeOut": "0",
                        "extendedTimeOut": "0",
                    });
            }else{
                toastr.success(
                    "Please check your email for password reset link",
                    "Reset Password Link Sent",
                    {
                        "closeButton": true,
                        "positionClass": "toast-top-center",
                        "timeOut": "0",
                        "extendedTimeOut": "0",
                    });

            }
        });
    },
    'submit #newPassword':function(event,template){
        event.preventDefault();
        var newPass = template.find('#newPassword-password').value;

        Accounts.resetPassword(Session.get("resetPasswordToken"),newPass,function(error){
            if(error){
                if(error.message = "Token expired [403]"){
                    toastr.error(
                        "Sorry this reset token has expired.",
                        "Password Reset Failed",
                        {
                            "closeButton": true,
                            "positionClass": "toast-top-center",
                            "timeOut": "0",
                            "extendedTimeOut": "0",
                        });
                }else{
                    toastr.error(
                        "Sorry there is an error",
                        "Password Reset Failed",
                        {
                            "closeButton": true,
                            "positionClass": "toast-top-center",
                            "timeOut": "0",
                            "extendedTimeOut": "0",
                        });
                }
            }else{
                toastr.success(
                    "Your password has been reset",
                    "Password Reset Succeded",
                    {
                        "closeButton": true,
                        "positionClass": "toast-top-center",
                        "timeOut": "0",
                        "extendedTimeOut": "0",
                    });
                Session.set('resetPasswordToken', '');
                Session.set('gotResetPasswordLink', false);
                if (doneCallback) {
                    doneCallback();
                }
                FlowRouter.go('/');
            }
        })
    }

});