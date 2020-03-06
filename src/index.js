import $ from "jquery";
import Chart from "chart.js";
import "./css/base.scss";

$("#players__div").hide();

$("#submit-button").on("click", function(e) {
  e.preventDefault();
  console.log("click");

  var playerOneFirstName = $("#left__first-name").val();
  var playerOneLastName = $("#left__last-name").val();
  var playerTwoFirstName = $("#right__first-name").val();
  var playerTwoLastName = $("#right__last-name").val();

  var playerOneStats = fetch(
    `https://nba-players.herokuapp.com/players-stats/harden/james`
  ).then(function(response) {
    return response.json();
  });

  var playerTwoStats = fetch(
    `https://nba-players.herokuapp.com/players-stats/westbrook/russell`
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
  $("#players--name-one").text(playerData.playerOne.name);
  $("#players--name-two").text(playerData.playerTwo.name);
  $("#players--team-one").text(playerData.playerOne.team_name);
  $("#players--team-two").text(playerData.playerTwo.team_name);

  var ctx1 = $("#players--chart-one");
  var ctx2 = $("#players--chart-two");

  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Points", "Rebounds", "Assists", "Steals", "Blocks"],
      datasets: [
        {
          label: "# of Votes",
          data: [
            playerData.playerOne.points_per_game,
            playerData.playerOne.rebounds_per_game,
            playerData.playerOne.assists_per_game,
            playerData.playerOne.steals_per_game,
            playerData.playerOne.blocks_per_game
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1
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
      labels: ["Points", "Rebounds", "Assists", "Steals", "Blocks"],
      datasets: [
        {
          label: "# of Votes",
          data: [
            playerData.playerTwo.points_per_game,
            playerData.playerTwo.rebounds_per_game,
            playerData.playerTwo.assists_per_game,
            playerData.playerTwo.steals_per_game,
            playerData.playerTwo.blocks_per_game
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1
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
};
