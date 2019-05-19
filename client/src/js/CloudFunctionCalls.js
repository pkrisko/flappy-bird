const Http = new XMLHttpRequest(),
    baseURL = 'https://us-central1-flappy-server.cloudfunctions.net/',
    addGenerationStatsUrl=`${baseURL}add-generation-stats`,
    addKeyVariableStatsUrl=`${baseURL}add-key-variable-stats`;

Http.onreadystatechange= () => console.log(Http.responseText);

export function addGenerationStats(interaction, epochNumber, epochScore) {
    const postData = { interaction, epochNumber, epochScore };
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