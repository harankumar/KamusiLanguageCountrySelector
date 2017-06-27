var rtlLangs = new Set([
    "heb",
    "fas",
    "mzn",
    "lrc",
    "uig",
    "kas",
    "urd",
    "fa_AF",
    "ara",
    "yid",
    "ckb",
    "pus",
    "ur_IN",
    "ar_EG",
    "ar_LY",
    "ar_SA",
    "uz_Arab",
    "pa_Arab"
])

// avoid duplicate selectors
var userlangSelector, langnameSelector, countrySelector

function loadLangNames(code) {
    $.ajax("https://kamusi-cls-backend.herokuapp.com/langnames/" + code, {
        success: function (response) {
            var langdata = JSON.parse(response)
            langnameSelector
                .html('')
                .select2('data', null)
            if (langdata[0] && langdata[0].id){
                langnameSelector.select2({
                    data: langdata,
                    dir: rtlLangs.has(code) ? "rtl" : "ltr"
                })
                langnameSelector.children('option[value="'+ code +'"]').prop("selected", "selected")
                langnameSelector.trigger('change')
            }
        },
        error: function (data) {
            loadLangNames("eng")
        }
    })
}

function loadCountryNames(code){
    $.ajax("https://kamusi-cls-backend.herokuapp.com/territories/" + code, {
        success: function (response) {
            var countryData = JSON.parse(response)
            countrySelector
                .html('')
                .select2('data', null)
            if (countryData[0] && countryData[0].id){
                countrySelector.select2({
                    data: countryData,
                    dir: rtlLangs.has(code) ? "rtl" : "ltr"
                })
                countrySelector.children('option[value="'+ code +'"]').prop("selected", "selected")
                countrySelector.trigger('change')
            }
        },
        error: function (data) {
            loadCountryNames("eng")
        }
    })
}

$(document).ready(function () {

    // initialize userlang selector
    userlangSelector = $("#kamusi-userlang")
    var userlangAJAX = {
        url: function (params) {
            return 'https://kamusi-cls-backend.herokuapp.com/userlangs/' + (params.term || "")
        },
        dataType: 'json',
        delay: 10,
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
    userlangSelector.select2({
        ajax: userlangAJAX
    })
    userlangSelector.change(function (e) {
        loadLangNames(userlangSelector.val())
        loadCountryNames(userlangSelector.val())
    })
    $.ajax("https://kamusi-cls-backend.herokuapp.com/userlangs/", {
        success: function(data){
            var ret = []
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].text.length; j++) {
                    ret.push({text: data[i].text[j], id: data[i].id})
                }
            }
            userlangSelector.select2({
                data: ret,
                ajax: userlangAJAX,
                dir: rtlLangs.has(data[0].id) ? "rtl" : "ltr"
            })
            userlangSelector.trigger('change')

            userlangSelector.change(function(){
                userlangSelector.select2({dir: rtlLangs.has(userlangSelector.val()) ? "rtl" : "ltr"})
            })
        },
        error: function(err){
            throw err
        }
    })

    // initialize langname selector
    langnameSelector = $('#kamusi-langname')
    langnameSelector.select2()
    //loadLangNames("eng")

    // load with default values


    // initialize country selector
    countrySelector = $("#kamusi-country")
    countrySelector.select2()
})