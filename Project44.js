$(document).ready(function () {
    const req = new XMLHttpRequest();
    req.onload = function () {
        var json = JSON.parse(req.responseText);
        var html = "";
        for (var i = 0; i < json.articles.length; i++) {
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
    req.open("GET", "https://gnews.io/api/v4/top-headlines?token=803159f1f76a1d808f3af38c3033d4be&lang=en", true)
    req.send();

    $(".kinh_lup").click(function () {
        $("#box").show()
        $("#main").addClass("opacity")
    });
    $(".close").click(function () {
        $("#box").hide()
    });
    $("#btnTim").click(function () {
        const search = new XMLHttpRequest();
        var keywords = $("#noi_dung_tim").val();
        $("#box").hide();
        $("#main").removeClass("opacity")
        search.onload = function () {
            const json = JSON.parse(search.responseText);
            var html = "";
            for (var i = 0; i < json.articles.length; i++) {
                var image = json.articles[i].image;
                var url = json.articles[i].url;
                var title = json.articles[i].title;
                var description = json.articles[i].description;
                var publishedAt = json.articles[i].publishedAt;
                html += '<div>' + '<img src="' + image + '">' + '<div>' + '<a href="' + url + '">' + title + '</a>' + '<br>' + '<i>' + publishedAt + '</i>' + '<p>' + description + '</p>' + '</div>' + '</div>'
                document.getElementById("main").innerHTML = html;
                $("#main > div").addClass("content");
            }
        }
        console.log("https://gnews.io/api/v4/search?q=example&token=803159f1f76a1d808f3af38c3033d4be&lang=en")
        search.open("GET", "https://gnews.io/api/v4/search?q=example&token=803159f1f76a1d808f3af38c3033d4be&lang=en", true)
        search.send();
    });
});
