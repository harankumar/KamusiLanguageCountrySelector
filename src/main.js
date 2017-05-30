// TODO: (long run) -- reduce dependencies
// TODO: pull this out into a library form
// TODO: get stuff out of global scope (prior to publication)
// TODO: provide utilities to convert between ISO codes and names
// TODO: divide up functionality into multiple files
// TODO: make sure userlangs.json was scraped properly -- check trimming
// TODO: add color wheels


// avoid duplicate selectors
var userlangSelector;

// sets langs[0] as the default language if user hasn't done anything yet
// langs are ISO 693-3 codes, in order of preference (first is preferred)
function setDefaultUserLangs(langs) {
    var el;
    // Put all the langs in the selector, in the user's order of preference
    for (var i = langs.length - 1; i >= 0; i--){
        el = $("select#kamusi-userlang option[value='" + langs[i] + "']")
            .detach();
        userlangSelector.prepend(el);
    }
    // Set preferred language as default
    el.filter(":first-child").attr("selected", "selected")
}

// guess userlang based on:
//     1. HTTP Accept-Language Header
//     2. Fallback to navigator.language
// then call setDefault()
// TODO: set a 3rd party cookie so that user's pref is the default
function guessUserLang() {
    // I wrote this microservice for this project
    // You can view the source here: glitch.com/edit/#!/kamusi-cls-backend
    $.ajax("https://kamusi-cls-backend.glitch.me/", {
        dataType: 'json',
        success: function (resp) {
            // resp gives a list of languages based on HTTP header
            setDefaultUserLangs(resp['langs']);
        },
        error: function(){
            // Use browser language if all else fails
            // Note that this requires conversion between ISO Standards
            setDefaultUserLangs([isoLanguageConverter(navigator.language, {from: 1, to: 3})]);
        }
    })
}

// Load userlangs from the file, place them in the selector
function loadUserLangs() {
    $.ajax("data/userlangs/userlangs.json", {
        success: function (resp) {
            // Place each of the userlangs as an option in the selector
            for (var i = 0; i < resp.length; i++) {
                //console.log(resp[i]);
                userlangSelector.append("<option value='" +
                    resp[i].code +
                    "'>" +
                    resp[i].name +
                    "</option>");
            }
            guessUserLang();
            userlangSelector.select2();
        }
        // TODO: add any other options that are needed
        // TODO: handle errors
    });
}

$(document).ready(function () {
    userlangSelector = $("#kamusi-userlang");
    loadUserLangs();

    // TODO: this line won't exist when the program is all finished
    $("#kamusi-country, #kamusi-langname").select2();
});