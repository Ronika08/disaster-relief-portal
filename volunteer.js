// Current volunteer ID
let currentVolunteerId = localStorage.getItem('currentVolunteerId') || null;

// Load on page load
document.addEventListener('DOMContentLoaded', function() {
    loadVolunteerProfile();
    loadAvailableRequests();
    loadMyTasks();
    updateStats();
});

// Handle form submission
document.getElementById('volunteerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const volunteer = {
        id: currentVolunteerId || Date.now(),
        name: document.getElementById('vol-name').value,
        email: document.getElementById('email').value,
        skills: document.getElementById('skills').value,
        available: document.getElementById('available').checked
    };
    saveVolunteer(volunteer);
    currentVolunteerId = volunteer.id;
    localStorage.setItem('currentVolunteerId', currentVolunteerId);
    alert('Profile updated! You are now active and ready to help.');
    loadAvailableRequests();
    loadMyTasks();
    updateStats();
});

function saveVolunteer(volunteer) {
    let volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
    const index = volunteers.findIndex(v => v.id == volunteer.id);
    if (index > -1) {
        volunteers[index] = volunteer;
    } else {
        volunteers.push(volunteer);
    }
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
}

function loadVolunteerProfile() {
    if (currentVolunteerId) {
        const volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
        const vol = volunteers.find(v => v.id == currentVolunteerId);
        if (vol) {
            document.getElementById('vol-name').value = vol.name;
            document.getElementById('email').value = vol.email;
            document.getElementById('skills').value = vol.skills;
            document.getElementById('available').checked = vol.available;
        }
    }
}

function loadAvailableRequests() {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    const available = requests.filter(r => r.status === 'Pending' && !r.assignedVolunteer);
    const list = document.getElementById('availableRequests');
    list.innerHTML = '';
    if (available.length === 0) {
        list.innerHTML = '<p>No urgent requests available at this time. Stay ready!</p>';
    }
    available.forEach(req => {
        const div = document.createElement('div');
        div.className = `request-item urgency-${req.urgency}`;
        div.innerHTML = `
            <h3>🚨 ${req.type.charAt(0).toUpperCase() + req.type.slice(1)} - ${req.urgency.charAt(0).toUpperCase() + req.urgency.slice(1)} Priority</h3>
            <p><strong>📍 Location:</strong> ${req.location}</p>
            <p><strong>👤 Victim:</strong> ${req.name}</p>
            <p><strong>📝 Details:</strong> ${req.description}</p>
            <button onclick="acceptRequest(${req.id})" class="btn-secondary">Accept This Task</button>
        `;
        list.appendChild(div);
    });
}

function loadMyTasks() {
    if (!currentVolunteerId) return;
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    const myTasks = requests.filter(r => r.assignedVolunteer == currentVolunteerId);
    const list = document.getElementById('myTasks');
    list.innerHTML = '';
    if (myTasks.length === 0) {
        list.innerHTML = '<p>No assigned tasks yet. Check available requests above.</p>';
    }
    myTasks.forEach(req => {
        const div = document.createElement('div');
        div.className = `request-item urgency-${req.urgency}`;
        div.innerHTML = `
            <h3>${req.type.charAt(0).toUpperCase() + req.type.slice(1)} - ${req.urgency.charAt(0).toUpperCase() + req.urgency.slice(1)} Priority</h3>
            <p><strong>📍 Location:</strong> ${req.location}</p>
            <p><strong>👤 Victim:</strong> ${req.name}</p>
            <p><strong>📝 Details:</strong> ${req.description}</p>
            <p><strong>📊 Status:</strong> <span class="status ${req.status.toLowerCase().replace(' ', '-')}">${req.status}</span></p>
            <button onclick="completeTask(${req.id})" ${req.status === 'Resolved' ? 'disabled' : ''}>Mark Task Complete</button>
        `;
        list.appendChild(div);
    });
}

function updateStats() {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    const available = requests.filter(r => r.status === 'Pending' && !r.assignedVolunteer);
    const myTasks = requests.filter(r => r.assignedVolunteer == currentVolunteerId);
    const completed = myTasks.filter(r => r.status === 'Resolved');

    document.getElementById('availableRequestsCount').textContent = available.length;
    document.getElementById('myActiveTasks').textContent = myTasks.filter(r => r.status !== 'Resolved').length;
    document.getElementById('completedTasks').textContent = completed.length;
}

function acceptRequest(requestId) {
    let requests = JSON.parse(localStorage.getItem('requests')) || [];
    const req = requests.find(r => r.id == requestId);
    if (req && !req.assignedVolunteer) {
        req.assignedVolunteer = currentVolunteerId;
        req.status = 'In Progress';
        req.assignedAt = new Date().toISOString();
        localStorage.setItem('requests', JSON.stringify(requests));
        loadAvailableRequests();
        loadMyTasks();
        updateStats();
        alert('Task accepted! Please proceed to the location and provide assistance.');
    }
}

function completeTask(requestId) {
    let requests = JSON.parse(localStorage.getItem('requests')) || [];
    const req = requests.find(r => r.id == requestId);
    if (req && req.assignedVolunteer == currentVolunteerId) {
        req.status = 'Resolved';
        req.resolvedAt = new Date().toISOString();
        localStorage.setItem('requests', JSON.stringify(requests));
        loadMyTasks();
        updateStats();
        alert('Task marked as completed! Thank you for your service.');
    }
}

function goBack() {
    window.location.href = 'index.html';
}

function emergencySOS() {
    alert('EMERGENCY SOS ACTIVATED!\n\nImmediate assistance requested.\nLocation sharing enabled.\nEmergency services notified.');
}