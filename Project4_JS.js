$(document).ready(function() {
    loading();
    var URL = 'https://gnews.io/api/v4/top-headlines?&token=b116f7dac75083d3d718c8132d28dfc9&lang=en';
    sendRequest(URL);

    $("#search").click(() => {
        var keywords = $("#keywords");
        var key = keywords.val();
        keywords.val("");
        var filterFrom = $("#filterFrom").val();
        var filterTo = $("#filterTo").val();
        var filterFromStr = filterFrom + "T00:00:00Z";
        var filterToStr = filterTo + "T24:00:00Z";

        // var date = new Date();
        // var year = date.getFullYear();
        // var month = date.getMonth();
        // var day = date.getDate();
        // var hour = date.getHours();
        // var minute = date.getMinutes();
        // var second = date.getSeconds();
        // console.log(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);

        loading();
        var URL = 'https://gnews.io/api/v4/search?q=' + key + '&from=' + filterFromStr + '&to=' + filterToStr + '&country=us&token=b116f7dac75083d3d718c8132d28dfc9&lang=en';
        sendRequest(URL);
    });

    function loading() {
        var html = "";
        html += "<div class='loading text-center'>";
        html += "<div class='spinner-border spinner-border-md'></div>";
        html += " Loading..</div>";
        $("#main").html(html);
    }

    function sendRequest(url) {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                display(data);
            });
    }
    
    function display(data) {
        var html = "";
        /*Dung forEach */

        // data.articles.forEach(item => {
        //     var image = item.image;
        //     var url = item.url;
        //     var title = item.title;
        //     var publishedAt = item.publishedAt;
        //     var description = item.description;
            
        //     html += "<div class='row'>";

        //     html += "<div class='col4'>";
        //     html += "<img class='img-fluid' src='" + image + "'>"; 
        //     html += "</div>";
            
        //     html += "<div class='col8'>";
        //     html += "<a href='" + url + "'>" + title + "</a><br>";
        //     html += "<p><time>" + publishedAt + "</time></p>";
        //     html += "<p>" + description + "</p>";
        //     html += "</div>";

        //     html += "</div>";
        // });

        /*Dung map */
        html = data.articles.map(article => {
            return `
                <div class="row">

                <div class="col4">
                    <img class="img-fluid" src="${article.image}">
                </div>

                <div class="col8">
                    <a href="${article.url}">${article.title}</a><br>
                    <p><time>${article.publishedAt}</time></p>
                    <p>${article.description}</p>
                </div>

                </div>
            `;
        });

        $("#main").html(html.join(""));
        $("#main").children(".row").addClass("shadow mb-3");
        $(".col4").addClass("col-sm-12 col-md-4 pt-3 pb-3");
        $(".col8").addClass("col-sm-12 col-md-8 pt-3 pb-3");
        $("a").addClass("font-weight-bold text-justify");
        $("time").addClass("font-italic");
        $("p").addClass("text-justify mt-2");
        $("a").click(function() {
            $(this).attr("target", "_blank");
        });
    }
});