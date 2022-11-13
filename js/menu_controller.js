function start_game(){
    user = document.getElementById("name").value;
	sessionStorage.setItem("username", user);
	loadPage("./html/game.html");
    console.log(sessionStorage.getItem("username"));
}

function exit (){
    user = sessionStorage.getItem("username")
	if (user != "") {
		alert("Leaving " + user + "'s game");
	}
	user = "";
	loadPage("../");
}