// TODO: (long run) -- reduce dependencies
// TODO: pull this out into a library form
// TODO: get stuff out of global scope (prior to publication)
// TODO: provide utilities to convert between ISO codes and names
// TODO: divide up functionality into multiple files
// TODO: add color wheels
// TODO: cache data so it's faster
// TODO: dev can choose which langnames to show
// TODO: right align languages e.g. arabic

// avoid duplicate selectors
var userlangSelector, langnameSelector

function loadLangNames(code) {
    $.ajax("https://kamusi-cls-backend.herokuapp.com/langnames/" + code, {
        success: function (response) {
            var langdata = JSON.parse(response)
            console.log(langdata)
            langnameSelector
                .html('')
                .select2('data', null)
            langnameSelector.select2({
                data: langdata
            })
            //langnameSelector.trigger('change')
        },
        error: function (data) {
            // TODO -- move up to macrolang
            loadLangNames("eng")
        }
    })
}

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

    // initialize langname selector
    langnameSelector = $('#kamusi-langname')
    langnameSelector.select2()
    //loadLangNames("eng")
    userlangSelector.change(function (e) {
        loadLangNames(userlangSelector.val())
    })

    // load with default values


    // TODO: this line won't exist when the program is all finished
    $("#kamusi-country").select2()
})