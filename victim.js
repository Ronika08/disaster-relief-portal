// ===============================
// Page Load
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    loadRequests();
    updateStats();

    const form = document.getElementById("requestForm");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
});

// ===============================
// Handle Request Form Submission
// ===============================
function handleFormSubmit(e) {
    e.preventDefault();

    const request = {
        id: Date.now(),
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        type: document.getElementById("requestType").value,
        urgency: document.getElementById("urgency").value,
        description: document.getElementById("description").value,
        status: "Pending",
        timestamp: new Date().toISOString()
    };

    saveRequest(request);
    e.target.reset();

    loadRequests();
    updateStats();

    // Show offline message
    const offlineMsg = document.getElementById("offlineMessage");
    if (offlineMsg) {
        offlineMsg.style.display = "block";
        setTimeout(() => {
            offlineMsg.style.display = "none";
        }, 3000);
    }

    alert("Emergency request submitted! Help is on the way.");
}

// ===============================
// Save Request (LocalStorage)
// ===============================
function saveRequest(request) {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(request);
    localStorage.setItem("requests", JSON.stringify(requests));
}

// ===============================
// Load Requests
// ===============================
function loadRequests() {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const list = document.getElementById("requestsList");

    if (!list) return;

    list.innerHTML = "";

    if (requests.length === 0) {
        list.innerHTML = "<p>No requests submitted yet.</p>";
        return;
    }

    requests.forEach(req => {
        const div = document.createElement("div");
        div.className = `request-item urgency-${req.urgency}`;

        const timeline = `
            <div class="timeline">
                <div class="timeline-item">📅 Submitted: ${new Date(req.timestamp).toLocaleString()}</div>
                ${req.status !== "Pending" ? `
                    <div class="timeline-item">
                        👥 Assigned/In Progress: 
                        ${req.assignedAt ? new Date(req.assignedAt).toLocaleString() : "N/A"}
                    </div>` : ""}
                ${req.status === "Resolved" ? `
                    <div class="timeline-item">
                        ✅ Resolved: 
                        ${req.resolvedAt ? new Date(req.resolvedAt).toLocaleString() : "N/A"}
                    </div>` : ""}
            </div>
        `;

        div.innerHTML = `
            <h3>
                ${capitalize(req.type)} - ${capitalize(req.urgency)} Priority
            </h3>
            <p><strong>📍 Location:</strong> ${req.location}</p>
            <p><strong>📝 Details:</strong> ${req.description}</p>
            <p>
                <strong>📊 Status:</strong>
                <span class="status ${req.status.toLowerCase().replace(" ", "-")}">
                    ${req.status}
                </span>
            </p>
            <h4>Request Timeline</h4>
            ${timeline}
        `;

        list.appendChild(div);
    });
}

// ===============================
// Update Stats
// ===============================
function updateStats() {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    const total = document.getElementById("totalRequests");
    const pending = document.getElementById("pendingRequests");
    const resolved = document.getElementById("resolvedRequests");

    if (total) total.textContent = requests.length;
    if (pending) pending.textContent = requests.filter(r => r.status === "Pending").length;
    if (resolved) resolved.textContent = requests.filter(r => r.status === "Resolved").length;
}

// ===============================
// Utilities
// ===============================
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function goBack() {
    window.location.href = "index.html";
}

// ===============================
// Emergency SOS (UNCHANGED)
// ===============================
function emergencySOS() {
    alert(
        "EMERGENCY SOS ACTIVATED!\n\n" +
        "Immediate assistance requested.\n" +
        "Location sharing enabled.\n" +
        "Emergency services notified."
    );
}
