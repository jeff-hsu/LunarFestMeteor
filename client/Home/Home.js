/**
 * Created by Jeff on 2016-01-01.
 */

var doneCallback;

Accounts.onEmailVerificationLink(function (token, done) {
    Accounts.verifyEmail(token, function (err) {
        if (err != null) {
            if (err.message = 'Verify email link expired [403]') {
                toastr.error(
                    "Sorry this verification link has expired.",
                    "Verification Failed",
                    {
                        "closeButton": true,
                        "positionClass": "toast-top-center",
                        "timeOut": "0",
                        "extendedTimeOut": "0",
                    })

            }
        } else {
            toastr.success(
                "Congratulation, you're account has been activated",
                "Verification Succeeded",
                {
                    "closeButton": true,
                    "positionClass": "toast-top-center",
                    "timeOut": "0",
                    "extendedTimeOut": "0",
                })

        }
    });

    done();
});


Accounts.onResetPasswordLink(function (token, done) {
    Session.set('resetPasswordToken', token);
    Session.set('gotResetPasswordLink', true);
    doneCallback = done();
    FlowRouter.go("/reset-password");

});