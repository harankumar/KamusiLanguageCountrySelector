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
            url: function(params){
                return 'https://kamusi-cls-backend.herokuapp.com/userlangs/' + (params.term || "")
            },
            dataType: 'json',
            delay: 20,
            processResults: function (data) {
                var ret
                if (typeof data[0]["name"] !== "string"){
                    ret = []
                    for (var i = 0; i < data.length; i++){
                        for (var j = 0; j < data[i]["name"].length; j++){
                            ret.push({text: data[i]["name"][j], id: data[i].code})
                        }
                    }
                } else
                    ret = data.map(function(x){
                        return {id: x.code, text: x.name}
                    })

                return {results: ret}
            //    return {
            //        results: data.items
            //    };
            }
        }
    })

    // load with default values


    // TODO: this line won't exist when the program is all finished
    $("#kamusi-country, #kamusi-langname").select2()
})