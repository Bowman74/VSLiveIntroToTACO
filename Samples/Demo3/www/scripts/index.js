// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        $.afui.launch();
        $("#btnCalculate")[0].addEventListener("click", showLargestPrime);

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    $.afui.ready(function () {
        $.afui.useOSThemes = true;
        FastClick.attach(document.body);
    });

    function activeConnection() {
        return navigator.connection && navigator.connection.type != Connection.NONE;
    }

    function showLargestPrime() {
        var textValue = $("#txtMaxPrime")[0].value;
        if (isNumber(textValue)) {
            if (!activeConnection()) {
                $.afui.popup({
                    title: "No connection available",
                    message: "Cannot calculate largest prime",
                    doneText: "OK",
                    cancelOnly: false
                });
                return;
            }
            $.afui.showMask("Calculating");
            $.get("http://calcmaxprimeservice.azurewebsites.net/api/maxprimes/" + textValue, function (data) {
                $.afui.hideMask();
                $.afui.popup({
                    title: "Prime Calculated",
                    message: "Largest Prime found " + data,
                    doneText: "OK",
                    cancelOnly: false
                });
            });

        } else {
            $.afui.popup({
                title: "Prime Calculation Error",
                message: "Must enter a numeric max value: " + textValue,
                doneText: "OK",
                cancelOnly: false
            });
        }
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
} )();