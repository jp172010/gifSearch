var topics = ["Dragon Ball Z", "My Hero Academia", "Naruto", "Attack On Titan", "Full Metal Alchemist"];

function makeButtons(top){
    return `<button class="gif" data-topic="${top}">${top}</button>`;
};


function renderButtons(){
    $("#buttons").append(topics.map(makeButtons));
}

$(document).on("click", ".gif", function(){
    var topic = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ITKT2ZPBlvxIhakweZO1QAzVLoSWYQfF&q=" + topic + "&limit=10&offset=0&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-alt", results[i].images.fixed_height.url)
            topicImage.attr("data-state", "still");
            topicImage.on("click", function(){
                var state = $(this).attr("data-state");
                var still = $(this).attr("src")
                var animate = $(this).attr("data-alt");
                if(state === "still"){
                    $(this).attr("src", animate);
                    $(this).attr("data-state", "animate");
                }else{
                    $(this).attr("src", still);
                    $(this).attr("data-state", "still");
                }
            });
            gifDiv.prepend(p);
            gifDiv.prepend(topicImage);
            $("#gifArea").prepend(gifDiv);
        }
    });
});

$("#searchBtn").on("click", function(event){
    event.preventDefault();
    var text = $("#searchForm").val();
    topics.push(text);
    $("#buttons").html("");
    renderButtons();
    $("#searchForm").val("");
});

renderButtons();