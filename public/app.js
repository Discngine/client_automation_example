var spotfireDocument = null;

document.addEventListener('DOMContentLoaded', function() {
  onDocumentReady();
});

function onDocumentReady() {
  if(SpotfireDocument.isAnalyst()) {
    document.getElementById('app-root').style.width = '100%';

    var spotfireContainer = document.getElementById('spotfire-container')
    spotfireContainer.parentElement.removeChild(spotfireContainer);
  }

  // Instanciate SpotfireDocument (https://connector.discngine.com/SpotfireDocument.html)
  spotfireDocument = window
    .instanciateSpotfireDocumentAsync(
      'https://vmsolspotts04.discngine.com/spotfire/wp', // Your spotfire server url
      '/Discngine/Client Automation/empty', // The document you want to open by default in Web Player (required for Web Player)
      function(err) {
        if (err) {
          console.log('Error when loading Discngine Client Automation API', err);
        }
      }
    )
    .then(function(spotfireDoc) {
      spotfireDocument = spotfireDoc;
    });

  document.getElementById('load-data').addEventListener('click', loadDataTable);
}

function loadDataTable() {
  if (!spotfireDocument) {
    console.warn('Spotfire Document not yet initialized.')
    return;
  }

  spotfireDocument.editor
    .loadDataTableFromUrl(
      'Demo',
      'https://connector.discngine.com/assets/ChEMBL-ibuprofen.csv'
    )
    .addTable()
    .applyState();
}
