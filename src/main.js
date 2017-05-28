// TODO: (long run) -- reduce dependencies
// TODO: pull this out into a library form
// TODO: get stuff out of global scope (prior to publication)
// TODO: provide utilities to convert between ISO codes and names


// avoid duplicate selector
var userlangSelector;

function loadUserLangs() {
    // Load userlangs from the file, place them in the selector
    $.ajax("data/userlangs/userlangs.json", {
        success: function (resp) {
            // Place each of the userlangs as an option in the selector
            for (var i = 0; i < resp.length; i++) {
                console.log(resp[i]);
                userlangSelector.append("<option value='" +
                    resp[i].code +
                    "'>" +
                    resp[i].name +
                    "</option>");
            }
            userlangSelector.select2();
            // TODO: select a default (a guess)
            // TODO: provide some order
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