// Load location details on page load
document.addEventListener('DOMContentLoaded', loadLocationDetails);

function loadLocationDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const locationName = urlParams.get('name');
    const locationType = urlParams.get('type');

    if (!locationName || !locationType) {
        document.getElementById('location-name').textContent = 'Location Not Found';
        return;
    }

    // Mock location data - in a real app this would come from a database
    const locationData = {
        name: locationName,
        type: locationType,
        status: getLocationStatus(locationType),
        coords: getMockCoords(locationName),
        instructions: getLocationInstructions(locationType),
        distance: '2.3 km',
        nearestShelter: 'Community Center - 1.5 km away'
    };

    // Populate the page
    document.getElementById('location-name').textContent = locationData.name;
    document.getElementById('location-type').textContent = locationData.type;
    document.getElementById('location-status').textContent = locationData.status;
    document.getElementById('location-coords').textContent = locationData.coords;
    document.getElementById('location-instructions').innerHTML = locationData.instructions;
    document.getElementById('location-distance').textContent = locationData.distance;
    document.getElementById('nearest-shelter').textContent = locationData.nearestShelter;
}

function getLocationStatus(type) {
    switch(type.toLowerCase()) {
        case 'emergency': return 'Active Emergency - High Risk';
        case 'shelter': return 'Open and Operational';
        case 'safe zone': return 'Verified Safe Area';
        default: return 'Status Unknown';
    }
}

function getMockCoords(name) {
    // Mock coordinates based on name
    const coords = {
        'chennai': '13.0827°N, 80.2707°E',
        'kerala': '10.8505°N, 76.2711°E',
        'assam': '26.2006°N, 92.9376°E',
        'mumbai': '19.0760°N, 72.8777°E',
        'delhi': '28.6139°N, 77.2090°E'
    };
    return coords[name.toLowerCase()] || 'Coordinates unavailable';
}

function getLocationInstructions(type) {
    switch(type.toLowerCase()) {
        case 'emergency':
            return `
                <ul>
                    <li>🚫 Do not enter this area</li>
                    <li>📞 Call emergency services if you must approach</li>
                    <li>🗺️ Follow evacuation routes marked on maps</li>
                    <li>📢 Listen for official announcements</li>
                </ul>
            `;
        case 'shelter':
            return `
                <ul>
                    <li>🏠 Open 24/7 during emergency</li>
                    <li>🍽️ Food and water provided</li>
                    <li>🛏️ Limited bedding available</li>
                    <li>📱 Register upon arrival</li>
                </ul>
            `;
        case 'safe zone':
            return `
                <ul>
                    <li>✅ Area verified as safe</li>
                    <li>🏠 Suitable for temporary stay</li>
                    <li>🚶 Follow local guidelines</li>
                    <li>📢 Stay informed via official channels</li>
                </ul>
            `;
        default:
            return '<p>No specific instructions available.</p>';
    }
}

function goBack() {
    window.history.back();
}