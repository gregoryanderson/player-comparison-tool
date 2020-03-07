import $ from "jquery";
import Chart from "chart.js";
import "./css/base.scss";

$("#players__div").hide();
$("#radar__div").hide();

$("#submit-button").on("click", function(e) {
  e.preventDefault();
  console.log("click");

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

  setTimeout(function() {
    displayPlayers(playerData);
  }, 1000);
});

const displayPlayers = playerData => {
  console.log(playerData);
  $("#form").hide();
  $("#players__div").show();
  $("#radar__div").show();

  $("#players--name-one").text(playerData.playerOne.name);
  $("#players--name-two").text(playerData.playerTwo.name);
  $("#players--team-one").text(playerData.playerOne.team_name);
  $("#players--team-two").text(playerData.playerTwo.team_name);

  var ctx1 = $("#players--p1-bar");
  var ctx2 = $("#players--p2-bar");
  var ctx3 = $("#players--p1-pie");
  var ctx4 = $("#players--p2-pie");
  var ctx5 = $("#radar");

  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Points", "Assists", "Rebounds", "Steals", "Blocks"],
      datasets: [
        {
          label: playerData.playerOne.name,
          backgroundColor: "rgba(200,0,0,0.2)",
          data: [
            playerData.playerOne.points_per_game,
            playerData.playerOne.rebounds_per_game,
            playerData.playerOne.assists_per_game,
            playerData.playerOne.steals_per_game,
            playerData.playerOne.blocks_per_game
          ]
        },
        {
          label: "League Average",
          backgroundColor: "rgba(0,0,200,0.2)",
          data: [10, 6, 3, 1, 1]
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              suggestedMax: 30
            }
          }
        ]
      }
    }
  });

  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["Points", "Assists", "Rebounds", "Steals", "Blocks"],
      datasets: [
        {
          label: playerData.playerTwo.name,
          backgroundColor: "rgba(200,0,0,0.2)",
          data: [
            playerData.playerTwo.points_per_game,
            playerData.playerTwo.rebounds_per_game,
            playerData.playerTwo.assists_per_game,
            playerData.playerTwo.steals_per_game,
            playerData.playerTwo.blocks_per_game
          ]
        },
        {
          label: "League Average",
          backgroundColor: "rgba(0,0,200,0.2)",
          data: [10, 6, 3, 1, 1]
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              suggestedMax: 30
            }
          }
        ]
      }
    }
  });

  var gamesSatP1 = 60 - parseInt(playerData.playerOne.games_played);
  var gamesSatP2 = 60 - parseInt(playerData.playerTwo.games_played);

  new Chart(ctx3, {
    type: "pie",
    data: {
      labels: ["Games Played", "Games Sat"],
      datasets: [
        {
          data: [playerData.playerOne.games_played, gamesSatP1],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)"
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1
        }
      ]
    },
    options: {}
  });

  new Chart(ctx4, {
    type: "pie",
    data: {
      labels: ["Games Played", "Games Sat"],
      datasets: [
        {
          data: [playerData.playerTwo.games_played, gamesSatP2],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)"
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1
        }
      ]
    },
    options: {}
  });

  new Chart(ctx5, {
    type: "radar",
    data: {
      labels: ["Points", "Assists", "Rebounds", "Steals", "Blocks"],
      datasets: [
        {
          label: playerData.playerOne.name,
          backgroundColor: "rgba(200,0,0,0.2)",
          data: [
            playerData.playerOne.points_per_game,
            playerData.playerOne.rebounds_per_game,
            playerData.playerOne.assists_per_game,
            playerData.playerOne.steals_per_game,
            playerData.playerOne.blocks_per_game
          ]
        },
        {
          label: playerData.playerTwo.name,
          backgroundColor: "rgba(0,0,200,0.2)",
          data: [
            playerData.playerTwo.points_per_game,
            playerData.playerTwo.rebounds_per_game,
            playerData.playerTwo.assists_per_game,
            playerData.playerTwo.steals_per_game,
            playerData.playerTwo.blocks_per_game
          ]
        }
      ]
    }
  });
};
