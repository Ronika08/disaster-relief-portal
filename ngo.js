// Load on page load
document.addEventListener('DOMContentLoaded', function() {
    loadRequests();
    loadAnnouncements();
    loadVolunteers();
    initMap();
    updateStats();
});

// Handle announcement form
document.getElementById('announcementForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const announcement = {
        id: Date.now(),
        text: document.getElementById('announcement').value,
        timestamp: new Date().toISOString()
    };
    saveAnnouncement(announcement);
    this.reset();
    loadAnnouncements();
    alert('Emergency alert broadcasted to all users!');
});

function saveAnnouncement(announcement) {
    announcement.type = document.getElementById('announcement-type').value;
    let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    announcements.push(announcement);
    localStorage.setItem('announcements', JSON.stringify(announcements));
}

function loadAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    const list = document.getElementById('announcementsList');
    list.innerHTML = '';
    if (announcements.length === 0) {
        list.innerHTML = '<p>No recent announcements.</p>';
    }
    announcements.slice(-5).forEach(ann => { // Show last 5
        const div = document.createElement('div');
        div.className = `announcement-item announcement-${ann.type || 'info'}`;
        div.onclick = function() { window.location.href = `announcement.html?id=${ann.id}`; };
        const tagText = ann.type ? ann.type.charAt(0).toUpperCase() + ann.type.slice(1) : 'Info';
        div.innerHTML = `
            <div class="announcement-tag">${tagText}</div>
            <p>${ann.text}</p>
            <small>Broadcast: ${new Date(ann.timestamp).toLocaleString()}</small>
        `;
        list.appendChild(div);
    });
}

function loadRequests() {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    const volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
    const availableVolunteers = volunteers.filter(v => v.available);
    const list = document.getElementById('requestsList');
    list.innerHTML = '';
    if (requests.length === 0) {
        list.innerHTML = '<p>No requests in the system yet.</p>';
    }
    requests.forEach(req => {
        const div = document.createElement('div');
        div.className = `request-item urgency-${req.urgency}`;
        div.onclick = function() { window.location.href = `request.html?id=${req.id}`; };
        const assignedVol = req.assignedVolunteer ? volunteers.find(v => v.id == req.assignedVolunteer) : null;
        div.innerHTML = `
            <h3>📋 ${req.type.charAt(0).toUpperCase() + req.type.slice(1)} - ${req.urgency.charAt(0).toUpperCase() + req.urgency.slice(1)} Priority</h3>
            <p><strong>👤 Victim:</strong> ${req.name}</p>
            <p><strong>📍 Location:</strong> ${req.location}</p>
            <p><strong>📝 Details:</strong> ${req.description}</p>
            <p><strong>📊 Status:</strong> <select onchange="updateStatus(${req.id}, this.value)">
                <option value="Pending" ${req.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="In Progress" ${req.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Resolved" ${req.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
            </select></p>
            <p><strong>🤝 Assigned Volunteer:</strong> ${assignedVol ? `${assignedVol.name} (${assignedVol.skills})` : 'Unassigned'}</p>
            <div class="form-group">
                <label><strong>Assign Team Member:</strong></label>
                <select onchange="assignVolunteer(${req.id}, this.value)">
                    <option value="">Select volunteer...</option>
                    ${availableVolunteers.map(v => `<option value="${v.id}" ${req.assignedVolunteer == v.id ? 'selected' : ''}>${v.name} - ${v.skills}</option>`).join('')}
                </select>
            </div>
        `;
        list.appendChild(div);
    });
}

function updateStats() {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    document.getElementById('totalRequests').textContent = requests.length;
    document.getElementById('pendingRequests').textContent = requests.filter(r => r.status === 'Pending').length;
    document.getElementById('inProgressRequests').textContent = requests.filter(r => r.status === 'In Progress').length;
    document.getElementById('resolvedRequests').textContent = requests.filter(r => r.status === 'Resolved').length;
}

function updateStatus(requestId, status) {
    let requests = JSON.parse(localStorage.getItem('requests')) || [];
    const req = requests.find(r => r.id == requestId);
    if (req) {
        req.status = status;
        if (status === 'In Progress' && !req.assignedAt) req.assignedAt = new Date().toISOString();
        if (status === 'Resolved' && !req.resolvedAt) req.resolvedAt = new Date().toISOString();
        localStorage.setItem('requests', JSON.stringify(requests));
        updateStats();
        alert('Request status updated successfully!');
    }
}

function assignVolunteer(requestId, volunteerId) {
    let requests = JSON.parse(localStorage.getItem('requests')) || [];
    const req = requests.find(r => r.id == requestId);
    if (req) {
        req.assignedVolunteer = volunteerId || null;
        if (volunteerId) {
            req.status = 'In Progress';
            req.assignedAt = new Date().toISOString();
        }
        localStorage.setItem('requests', JSON.stringify(requests));
        loadRequests();
        updateStats();
        alert('Volunteer assigned to request!');
    }
}

function initMap() {
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for requests (dummy locations for demo)
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    requests.forEach(req => {
        // For demo, use random coords around India
        const lat = 20 + Math.random() * 10;
        const lng = 75 + Math.random() * 10;
        let markerColor = 'blue';
        if (req.urgency === 'high') markerColor = 'red';
        else if (req.urgency === 'medium') markerColor = 'orange';

        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`
            <strong>${req.type.toUpperCase()} REQUEST</strong><br>
            Victim: ${req.name}<br>
            Location: ${req.location}<br>
            Status: ${req.status}<br>
            Urgency: ${req.urgency}
        `);
    });
}

function loadVolunteers() {
    const volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
    const list = document.getElementById('volunteersList');
    list.innerHTML = '';
    if (volunteers.length === 0) {
        list.innerHTML = '<p>No volunteers registered yet.</p>';
    }
    volunteers.forEach(vol => {
        const div = document.createElement('div');
        div.className = 'volunteer-item';
        div.innerHTML = `
            <div class="volunteer-info">
                <h3>${vol.name}</h3>
                <p>Skills: ${vol.skills} | Email: ${vol.email}</p>
            </div>
            <div class="volunteer-status status-${vol.available ? 'available' : 'busy'}">
                ${vol.available ? 'Available' : 'Busy'}
            </div>
        `;
        list.appendChild(div);
    });
}

function goBack() {
    window.location.href = 'index.html';
}

function emergencySOS() {
    alert('EMERGENCY SOS ACTIVATED!\n\nImmediate assistance requested.\nLocation sharing enabled.\nEmergency services notified.');
}