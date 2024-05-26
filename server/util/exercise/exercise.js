
function generateHTML(data) {
    if (!data || data.length === 0) {
        return ''; // Return empty string if data is empty
    }

    // Extract keys from the first object in the array
    const keys = Object.keys(data[0]);

    let html = '<table>';

    // Add table header based on keys
    html += '<tr>';
    keys.forEach(key => {
        html += `<th>${key}</th>`;
    });
    html += '</tr>';

    // Add table rows for each object
    data.forEach(obj => {
        html += '<tr>';
        keys.forEach(key => {
            html += `<td>${obj[key]}</td>`;
        });
        html += '</tr>';
    });

    html += '</table>';
    return html;
}

module.exports = {generateHTML}