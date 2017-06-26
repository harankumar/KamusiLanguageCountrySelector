// TODO: (long run) -- reduce dependencies
// TODO: pull this out into a library form
// TODO: get stuff out of global scope (prior to publication)
// TODO: provide utilities to convert between ISO codes and names
// TODO: divide up functionality into multiple files
// TODO: add color wheels


// avoid duplicate selectors
var userlangSelector

//function loadLangs(prefix){
//    $.ajax("https://kamusi-cls-backend.herokuapp.com/" + prefix, {
//        dataType: "json",
//        success: function(data){
//            console.log(data)
//        }
//    })
//}

$(document).ready(function () {

    // initialize userlang selector
    userlangSelector = $("#kamusi-userlang")
    userlangSelector.select2({
        ajax: {
            url: function (params) {
                return 'https://kamusi-cls-backend.herokuapp.com/userlangs/' + (params.term || "")
            },
            dataType: 'json',
            delay: 20,
            processResults: function (data) {
                var ret = data
                if (data[0] && typeof data[0].text !== "string") {
                    ret = []
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].text.length; j++) {
                            ret.push({text: data[i].text[j], id: data[i].id})
                        }
                    }
                }

                return {results: ret}
            }
        }
    })

    // load with default values


    // TODO: this line won't exist when the program is all finished
    $("#kamusi-country, #kamusi-langname").select2()
})