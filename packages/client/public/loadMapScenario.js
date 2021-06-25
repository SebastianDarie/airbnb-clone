function loadMapScenario() {
  Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
    callback: onLoad,
    errorCallback: onError,
  });
  function onLoad() {
    const options = { maxResults: 5 };
    const manager = new Microsoft.Maps.AutosuggestManager(options);
    manager.attachAutosuggest('#location', '#location_box', selectedSuggestion);
  }
  function onError(message) {
    //document.getElementById('printoutPanel').innerHTML = message;
    console.log(message);
  }
  function selectedSuggestion(suggestionResult) {
    // document.getElementById('printoutPanel').innerHTML =
    //   'Suggestion: ' +
    //   suggestionResult.formattedSuggestion +
    //   '<br> Lat: ' +
    //   suggestionResult.location.latitude +
    //   '<br> Lon: ' +
    //   suggestionResult.location.longitude;
    console.log(suggestionResult);
  }
}
