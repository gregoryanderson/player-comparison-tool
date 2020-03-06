import $ from "jquery";
import "./css/base.scss";

$("#players__div").hide()


$("#submit-button").on("click", function(e) {
  e.preventDefault();
  console.log("click");

  var playerOneFirstName = $("#left__first-name").val();
  var playerOneLastName = $("#left__last-name").val();
  var playerTwoFirstName = $("#right__first-name").val();
  var playerTwoLastName = $("#right__last-name").val();

  var playerOneStats = fetch(
    `https://nba-players.herokuapp.com/players-stats/brown/jaylen`
  ).then(function(response) {
    return response.json();
  });

  var playerTwoStats = fetch(
    `https://nba-players.herokuapp.com/players-stats/ball/lonzo`
  ).then(function(response) {
    return response.json();
  });

  let playerData = { playerOne: {}, playerTwo: {} };

  Promise.all([playerOneStats, playerTwoStats])
    .then(function(values) {
      playerData["playerOne"] = values[0];
      playerData["playerTwo"] = values[1];
      return playerData;
    })
    .catch(error => console.log(`Error in promises ${error}`));
  
  setTimeout(function() {
    displayPlayers(playerData)
  }, 1000)
});

const displayPlayers = (playerData) => {
  console.log(playerData)
  $("#form").hide()
  $("#players__div").show()
  $("#players--name-one").text(playerData.playerOne.name)
  $("#players--name-two").text(playerData.playerTwo.name)
  $("#players--team-one").text(playerData.playerOne.team_name)
  $("#players--team-two").text(playerData.playerTwo.team_name)
}