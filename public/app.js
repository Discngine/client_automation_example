var spotfireDocument = null;

document.addEventListener('DOMContentLoaded', onDocumentReady);

function onDocumentReady() {
  if(SpotfireDocument.isAnalyst()) {
    document.getElementById('app-root').style.width = '100%';

    var spotfireContainer = document.getElementById('spotfire-container')
    spotfireContainer.parentElement.removeChild(spotfireContainer);
  }

  // Instanciate SpotfireDocument (https://connector.discngine.com/SpotfireDocument.html)
  window
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
      spotfireDocument = spotfireDoc; // Save reference for future use
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
    .applyStateAsync()
    .then(function() {
      spotfireDocument.onMarkingChanged('Marking', 'Demo', updateStatistics)
    });
}

function updateStatistics(selectedRows) {
  // `selectedRows` is an object with keys being the name of columns and values being an array of selected rows values

  // Display default message if no rows selected
  if (Object.values(selectedRows)[0].length === 0){
    document.getElementById('statistics-output').innerHTML = "Select rows to view statistics"
  }

  var outputContent = '<table>';

  Object.entries(selectedRows).forEach(function(entry) {
    var colName = entry[0]; // string, name of column
    var selectedValues = entry[1] // Array of values

    // Only treat columns which contains numerical values
    if (!Number.isNaN(parseFloat(selectedValues[0]))) {
      var numValues = 0;
      var total = selectedValues.reduce(function(acc, value) {
        var numericalValue = parseFloat(value);

        if (!Number.isNaN(numericalValue)) {
          numValues += 1;
          return acc + numericalValue
        }

        return acc;
      }, 0);

      outputContent += '<tr>';
      outputContent += '<td>' + colName + '</td>';
      outputContent += '<td>' + (numValues> 0 ? (total / numValues).toFixed(2) : 'N/A') + '</td>';
      outputContent += '<td>' + numValues + ' values' + '</td>';
      outputContent += '</tr>';
    }
  })

  outputContent += '</table>';
  document.getElementById('statistics-output').innerHTML = outputContent
}
