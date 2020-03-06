import $ from "jquery";
import "./css/base.scss";

$("#submit-button").on("click", function(e) {
  e.preventDefault();
  console.log('click')

  var playerOneFirstName = $("#left__first-name").val();
  var playerOneLastName = $("#left__last-name").val();
  var playerTwoFirstName = $("#right__first-name").val();
  var playerTwoLastName = $("#right__last-name").val();

  var playerOneStats = fetch(
    `https://nba-players.herokuapp.com/players-stats/${playerOneLastName}/${playerOneFirstName}`
  ).then(function(response) {
    return response.json();
  });

  var playerTwoStats = fetch(
    `https://nba-players.herokuapp.com/players-stats/${playerTwoLastName}/${playerTwoFirstName}`
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

  console.log(playerData);
});
