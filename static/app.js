var spotfireDocument = null;

document.addEventListener('DOMContentLoaded', function() {
  onDocumentReady();
});

function onDocumentReady() {
  // Instanciate SpotfireDocument (https://connector.discngine.com/SpotfireDocument.html)
  spotfireDocument = window
    .instanciateSpotfireDocumentAsync(
      'https://vmsolspotts04.discngine.com/spotfire/wp', // Your spotfire server url
      '/Discngine/Client Automation/empty', // The document you want to open by default in Web Player (required for Web Player)
      function(err, data) {
        if (err) {
          console.error('Error while instanciating SpotfireDocument');
          console.error(err);
        }
      }
    )
    .then(function(spotfireDocument) {
      window.spotfireDocument = spotfireDocument;
    });

  document.getElementById('load-data').addEventListener('click', loadDataTable);
}

function loadDataTable() {
  spotfireDocument.editor
    .loadDataTableFromUrl(
      'Demo',
      'https://connector.discngine.com/Maybridge-200.sbdf'
    )
    .addTable()
    .applyState();
}
