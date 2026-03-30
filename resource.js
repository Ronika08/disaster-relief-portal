// Load resource details on page load
document.addEventListener('DOMContentLoaded', loadResourceDetails);

function loadResourceDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const resourceType = urlParams.get('type');

    if (!resourceType) {
        document.getElementById('resource-name').textContent = 'Resource Not Found';
        return;
    }

    // Mock resource data based on type
    const resourceData = getResourceData(resourceType);

    // Populate the page
    document.getElementById('resource-icon').textContent = resourceData.icon;
    document.getElementById('resource-name').textContent = resourceData.name;
    document.getElementById('resource-availability').innerHTML = `<span class="availability-badge ${resourceData.status}">${resourceData.status}</span>`;

    document.getElementById('resource-capacity').textContent = resourceData.capacity;
    document.getElementById('resource-location').textContent = resourceData.location;

    document.getElementById('resource-facilities').innerHTML = resourceData.facilities;
    document.getElementById('resource-guidelines').innerHTML = resourceData.guidelines;
}

function getResourceData(type) {
    const resources = {
        'food': {
            icon: '🍚',
            name: 'Food Distribution Center',
            status: 'available',
            capacity: '1,250 food packets available (enough for 500 families)',
            location: 'Central Warehouse, Downtown District',
            facilities: `
                <ul>
                    <li>🍽️ Hot meal preparation</li>
                    <li>🥤 Bottled water distribution</li>
                    <li>🥫 Non-perishable food storage</li>
                    <li>🚚 Delivery coordination</li>
                </ul>
            `,
            guidelines: `
                <ul>
                    <li>📋 Register at distribution point</li>
                    <li>👨‍👩‍👧‍👦 One packet per family</li>
                    <li>⏰ Distribution hours: 8 AM - 6 PM</li>
                    <li>♿ Accessibility assistance available</li>
                </ul>
            `
        },
        'shelter': {
            icon: '🏠',
            name: 'Emergency Shelter',
            status: 'available',
            capacity: '85 beds available (23 occupied, 62 free)',
            location: 'Community Center, Riverside Area',
            facilities: `
                <ul>
                    <li>🛏️ Individual and family rooms</li>
                    <li>🚿 Clean water and sanitation</li>
                    <li>🏥 Basic medical assistance</li>
                    <li>👶 Child care services</li>
                </ul>
            `,
            guidelines: `
                <ul>
                    <li>📝 Check-in required with ID</li>
                    <li>👕 Bring essential personal items</li>
                    <li>🏠 Family units prioritized</li>
                    <li>📞 24/7 security and support</li>
                </ul>
            `
        },
        'medical': {
            icon: '💊',
            name: 'Medical Supply Center',
            status: 'available',
            capacity: '320 medical kits available',
            location: 'Regional Hospital, Medical District',
            facilities: `
                <ul>
                    <li>🩹 First aid supplies</li>
                    <li>💉 Emergency medications</li>
                    <li>🏥 Triage and treatment</li>
                    <li>🚑 Ambulance coordination</li>
                </ul>
            `,
            guidelines: `
                <ul>
                    <li>🏥 Seek immediate care for emergencies</li>
                    <li>📋 Medical assessment required</li>
                    <li>💰 Services are free during disaster</li>
                    <li>📞 Call ahead for critical cases</li>
                </ul>
            `
        }
    };

    return resources[type] || {
        icon: '📦',
        name: 'Resource Center',
        status: 'unknown',
        capacity: 'Information unavailable',
        location: 'Location not specified',
        facilities: '<ul><li>Facilities information not available</li></ul>',
        guidelines: '<ul><li>Guidelines not available</li></ul>'
    };
}

function goBack() {
    window.history.back();
}