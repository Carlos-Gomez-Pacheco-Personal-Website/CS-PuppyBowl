const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2308-ACC-PT-WEB-PT-A";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const state = {
  players: [],
};

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL + "/players");
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
    const response = await fetch(APIURL + "/players/player-ID");
    const json = await response.json();
    const playerId = json.data.players;
    return playerId;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

// Add a new Puppy to the game //
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(APIURL + "/players/", {
      method: "POST",
      headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify(playerObj),
    });
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    init();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};
document.querySelector("div").addEventListener("submit", (event) => {
  const playerEL = event.target;
  event.preventDefault();
});

// Detele a Puppy from the game //
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const json = response.json();
    const puppies = json.data;
    if (json.error) {
      throw new Error(json.error);
    }
    state.players = puppies;
    init();
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
const renderAllPlayers = async (playerList) => {
  const table = document.getElementById("all-player-table");
  table.innerHTML;
  try {
    const response = await fetch(APIURL);
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

const showPlayers = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
};

init();
