const Http = new XMLHttpRequest();
const addGenerationStatsUrl='https://us-central1-flappy-server.cloudfunctions.net/add-generation-stats';
const addKeyVariableStatsUrl='https://us-central1-flappy-server.cloudfunctions.net/add-key-variable-stats';

Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
}

export function addGenerationStats(interaction, currGeneration, score) {
    const postData = {
        "interaction": interaction,
        "epochNumber": currGeneration,
        "epochScore": score
    }
    Http.open("POST", addGenerationStatsUrl);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.send(JSON.stringify(postData));
}

export function addKeyVariableStats(interaction) {
    const postData = { interaction, learningRate, mutationRateMultiplier, numHiddenLayers };
    Http.open("POST", addKeyVariableStatsUrl);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.send(JSON.stringify(postData));
}