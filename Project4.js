$(document).ready(function(){
    $(".kinh_lup").click(function(){
        $("#box").show()
    });
    $(".close").click(function(){
        $("#box").hide()
    });
});
const req = new XMLHttpRequest();
req.onload = function(){
    var json = JSON.parse(req.responseText);
    var html = "";
    for (var i = 0; i < json.articles.length; i++){
        var image = json.articles[i].image;
        var url = json.articles[i].url;
        var title = json.articles[i].title;
        var description = json.articles[i].description;
        var publishedAt = json.articles[i].publishedAt;
    html += '<div>' + '<img src="' + image + '">' + '<div>' + '<a href="' + url + '">' + title + '</a>' + '<br>' + '<i>' + publishedAt + '</i>' + '<p>' + description + '</p>' + '</div>' + '</div>'
    document.getElementById("main").innerHTML = html;
    $("#main > div").addClass("content");
    }
};
req.open("GET", "https://gnews.io/api/v4/top-headlines?token=fdcb2c7257445c90df16650e1c03e22b&lang=en", true)
req.send();
