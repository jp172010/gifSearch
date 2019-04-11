var topics = ["Dragon Ball Z", "My Hero Academia", "Naruto", "Attack On Titan"]

function buttons(top){
    var btn = `<input type="button" value="${top}">`;
    $("#buttons").append(btn);
};

topics.map(buttons);