// Load alert details on page load
document.addEventListener('DOMContentLoaded', loadAlertDetails);

function loadAlertDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const alertType = urlParams.get('type');

    if (!alertType) {
        document.getElementById('alert-type').textContent = 'Alert Not Found';
        return;
    }

    // Mock alert data based on type
    const alertData = getAlertData(alertType);

    // Populate the page
    document.getElementById('alert-icon').textContent = alertData.icon;
    document.getElementById('alert-type').textContent = alertData.title;
    document.getElementById('alert-timestamp').textContent = `Posted: ${alertData.timestamp}`;
    document.getElementById('affected-area').textContent = alertData.area;
    document.getElementById('alert-message').innerHTML = alertData.message;
}

function getAlertData(type) {
    const alerts = {
        'flood': {
            icon: '🌊',
            title: 'FLOOD ALERT',
            timestamp: '2 hours ago',
            area: 'Riverside districts of Chennai and surrounding areas',
            message: `
                <p><strong>IMMEDIATE EVACUATION REQUIRED</strong></p>
                <p>River levels have exceeded critical thresholds. Low-lying areas are at immediate risk of flooding.</p>
                <p>Water levels expected to rise 2-3 meters within the next 6 hours.</p>
            `
        },
        'cyclone': {
            icon: '🌀',
            title: 'CYCLONE WARNING',
            timestamp: '4 hours ago',
            area: 'Coastal regions of Kerala and Tamil Nadu',
            message: `
                <p><strong>CYCLONE APPROACHING</strong></p>
                <p>Severe cyclonic storm expected to make landfall within 24 hours.</p>
                <p>Winds up to 120 km/h expected with heavy rainfall.</p>
            `
        },
        'heatwave': {
            icon: '☀️',
            title: 'EXTREME HEAT ALERT',
            timestamp: '6 hours ago',
            area: 'Northern and central districts',
            message: `
                <p><strong>EXTREME HEAT CONDITIONS</strong></p>
                <p>Temperatures exceeding 45°C expected for the next 48 hours.</p>
                <p>Health risk is severe, especially for elderly and children.</p>
            `
        }
    };

    return alerts[type] || {
        icon: '🚨',
        title: 'GENERAL ALERT',
        timestamp: 'Unknown',
        area: 'Multiple areas',
        message: '<p>Emergency alert details unavailable.</p>'
    };
}

function viewMap() {
    // Navigate back to map view
    window.location.href = 'index.html';
}

function getDirections() {
    alert('Safe route directions would be shown here.\n\nIn a real system, this would integrate with mapping services to show evacuation routes.');
}

function imSafe() {
    alert('Safety confirmation noted.\n\nYour status has been recorded. Emergency services have been informed.');
}

function goBack() {
    window.history.back();
}