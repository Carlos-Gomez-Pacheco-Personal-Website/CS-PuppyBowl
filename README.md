# CS-PuppyBowl

// ... rest of your code ...

// Split players into two teams
const splitPlayersIntoTeams = (players) => {
const teamA = [];
const teamB = [];
players.forEach((player, index) => {
if (index % 2 === 0) {
teamA.push(player);
} else {
teamB.push(player);
}
});
return { teamA, teamB };
};

// Render teams
const renderTeams = (teams) => {
const teamContainer = document.getElementById("teams-container");
teamContainer.innerHTML = "";
Object.keys(teams).forEach((team) => {
const teamElement = document.createElement("div");
teamElement.innerHTML = `<h2>${team.toUpperCase()}</h2>`;
teams[team].forEach((player) => {
const playerElement = document.createElement("p");
playerElement.textContent = `Player ID: ${player.id}, Player Name: ${player.name}`;
teamElement.appendChild(playerElement);
});
teamContainer.appendChild(teamElement);
});
};

// Add event listeners to buttons
document.getElementById("team-a-button").addEventListener("click", () => {
fetchAllPlayers().then((players) => {
const teams = splitPlayersIntoTeams(players);
renderTeams({ teamA: teams.teamA });
});
});

document.getElementById("team-b-button").addEventListener("click", () => {
fetchAllPlayers().then((players) => {
const teams = splitPlayersIntoTeams(players);
renderTeams({ teamB: teams.teamB });
});
});

// ... rest of your code ...

In this code, the splitPlayersIntoTeams function splits the players into two teams. The renderTeams function takes the teams and creates a new div for each team, which includes a list of players in that team. The event listeners for the “Team A” and “Team B” buttons fetch all players, split them into teams, and render the respective team when clicked.

Please note that you’ll need to have two buttons with the IDs “team-a-button” and “team-b-button” in your HTML for this to work. Also, make sure to replace "teams-container" with the actual ID of the container where you want to render the teams. If you have any questions or need further assistance, feel free to ask! 😊
