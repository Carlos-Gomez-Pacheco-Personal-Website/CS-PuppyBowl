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

const {teams} = response.data;
//teams = [{},{},{}]

const {id,name,players} = teams

id -> teamid
name -> team name
players -> [{}]

the IDs “team-a-button” and “team-b-button” in your HTML for this to work. Also, make sure to replace "teams-container" with the actual ID of the container on HTML
