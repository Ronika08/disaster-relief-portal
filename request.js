// Load request details on page load
document.addEventListener('DOMContentLoaded', loadRequestDetails);

function loadRequestDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestId = urlParams.get('id');

    if (!requestId) {
        document.getElementById('request-title').textContent = 'Request Not Found';
        return;
    }

    // Find request in localStorage
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    const request = requests.find(r => r.id == requestId);

    if (!request) {
        document.getElementById('request-title').textContent = 'Request Not Found';
        return;
    }

    // Get volunteer info if assigned
    let assignedVolunteer = 'Not assigned';
    if (request.assignedVolunteer) {
        const volunteers = JSON.parse(localStorage.getItem('volunteers')) || [];
        const volunteer = volunteers.find(v => v.id == request.assignedVolunteer);
        if (volunteer) {
            assignedVolunteer = `${volunteer.name} (${volunteer.skills})`;
        }
    }

    // Populate the page
    document.getElementById('request-title').textContent = `${request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request Details`;
    document.getElementById('request-priority').innerHTML = `<span class="priority-badge ${request.urgency}">${request.urgency.toUpperCase()}</span>`;
    document.getElementById('request-status').innerHTML = `<span class="status ${request.status.toLowerCase().replace(' ', '-')}">${request.status}</span>`;

    document.getElementById('request-type').textContent = request.type.charAt(0).toUpperCase() + request.type.slice(1);
    document.getElementById('request-location').textContent = request.location;
    document.getElementById('request-timestamp').textContent = new Date(request.timestamp).toLocaleString();

    document.getElementById('victim-name').textContent = request.name;
    document.getElementById('request-description').textContent = request.description;

    document.getElementById('assigned-volunteer').textContent = assignedVolunteer;
    document.getElementById('assigned-at').textContent = request.assignedAt ? new Date(request.assignedAt).toLocaleString() : 'Not assigned';
    document.getElementById('completed-at').textContent = request.resolvedAt ? new Date(request.resolvedAt).toLocaleString() : 'Not completed';

    // Build timeline
    const timeline = document.getElementById('request-timeline');
    timeline.innerHTML = `
        <div class="timeline-item">📅 <strong>Submitted:</strong> ${new Date(request.timestamp).toLocaleString()}</div>
        ${request.assignedAt ? `<div class="timeline-item">👥 <strong>Assigned:</strong> ${new Date(request.assignedAt).toLocaleString()}</div>` : ''}
        ${request.resolvedAt ? `<div class="timeline-item">✅ <strong>Resolved:</strong> ${new Date(request.resolvedAt).toLocaleString()}</div>` : ''}
    `;
}

function goBack() {
    window.history.back();
}