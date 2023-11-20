const playerContainer = document.getElementById("all-players-container");
const teamContainer = document.getElementById("all-teams-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2308-ACC-PT-WEB-PT-A";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

const state = {
  players: [],
};

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL + "players");
    const json = await response.json();
    const players = json.data.players;
    if (json.error) {
      throw new Error(json.error);
    }
    return players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(APIURL + "players/" + playerId);
    const json = await response.json();
    const player = json.data.player;
    if (json.error) {
      throw new Error(json.error);
    }
    displayPlayerDetails(player);
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

// Add a new Puppy to the game //
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(APIURL + "players/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerObj),
    });
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

// Detele a Puppy from the game //
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}players/${playerId}`, {
      method: "DELETE",
    });
    const json = response.json();
    const puppies = json.data;
    if (json.error) {
      throw new Error(json.error);
    }
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */

const renderAllPlayers = (playerList) => {
  try {
    const playerIs = playerList.map((player) => {
      const playerI = document.createElement("ul");
      playerI.classList.add("Player");
      playerI.innerHTML = `<ul class = "blocks">
      <ul><img class= "picture" src= "${player.imageUrl}" alt="${player.name}" /></ul>
      <ul><h2>${player.name}</h2></ul>
      <ul><h3>${player.teamId}</h3></ul>
      <ul><button class = "see-details">See Details</button></ul>
      <ul><button class = "remove">Remove from Roster</button></ul>
      </ul>`;
      const seeDetails = playerI.querySelector(".see-details");
      seeDetails.addEventListener("click", () => {
        fetchSinglePlayer(player.id).then(displayPlayerDetails);
      });

      const remove = playerI.querySelector(".remove");
      remove.addEventListener("click", () => {
        removePlayer(player.id);
      });
      return playerI;
    });
    playerContainer.replaceChildren(...playerIs);
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};
const displayPlayerDetails = (player) => {
  const playerDetailsSection = document.createElement("div");
  playerDetailsSection.innerHTML = `<ul class="player-details">
    <h2>Name: ${player.name}</h2>
    <img class= "picture" src="${player.imageUrl}" alt="${player.name}" />
    <ul><p>Breed: </p><k class="k">${player.breed}</k><ul>
    <ul><p>Status: </p><k class="k">${player.status}</k><ul>
    <ul><p>Created at: </p><k class="k">${player.createdAt}</k><ul>
    <ul><p>Updated at: </p><k class="k">${player.updatedAt}</k><ul>
    <ul><p>Team ID: </p><k class="k">${player.teamId}</k><ul>
    <ul><p>Cohort ID: </p><k class="k">${player.cohortId}</k><ul>
    </ul>`;
  const existingPlayerDetails = document.querySelector(".player-details");
  if (existingPlayerDetails) {
    existingPlayerDetails.remove();
  }
  document.body.appendChild(playerDetailsSection);
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await addNewPlayer({
        name: event.target.elements.name.value,
        breed: event.target.elements.breed.value,
        status: event.target.elements.status.value,
        imageUrl: event.target.elements.imageUrl.value,
        teamID: Number(event.target.elements.teamID.value),
      });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};
//////////////////////////////////////// Testing for split on teams //////////////////////////////////////////////////
// // Group players by teamID
// const groupPlayersByTeam = (players) => {
//   return players.reduce((groupedPlayers, player) => {
//     const teamKey = player.teamID;
//     if (!groupedPlayers[teamKey]) {
//       groupedPlayers[teamKey] = [];
//     }
//     groupedPlayers[teamKey].push(player);
//     return groupedPlayers;
//   }, {});
// };

// // Render grouped players
// const renderGroupedPlayers = (groupedPlayers) => {
//   for (const team in groupedPlayers) {
//     const teamContainer = document.createElement("div");
//     teamContainer.innerHTML = `<h2>Team ${team}</h2>`;
//     groupedPlayers[team].forEach((player) => {
//       const playerElement = document.createElement("p");
//       playerElement.textContent = `Player ID: ${player.id}, Player Name: ${player.name}`;
//       teamContainer.appendChild(playerElement);
//     });
//     playerContainer.appendChild(teamContainer);
//   }
// };

// const renderTeams = (teamlist) => {
//   try{

//   }
// }
// Testing for split on teams /////////////////////////

// Fetch all players, group them by teamID and render
fetchAllPlayers().then((players) => {
  const groupedPlayers = groupPlayersByTeam(players);
  renderGroupedPlayers(groupedPlayers);
});

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
  renderNewPlayerForm();
};

init();
