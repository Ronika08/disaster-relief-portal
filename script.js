// ===============================
// Map Initialization (Leaflet)
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const map = L.map("map").setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    // ===============================
    // Preloaded Areas (Offline Data)
    // ===============================
    const areas = [
        { name: "Chennai", lat: 13.0827, lng: 80.2707 },
        { name: "Kerala", lat: 10.8505, lng: 76.2711 },
        { name: "Assam", lat: 26.2006, lng: 92.9376 },
        { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
        { name: "Delhi", lat: 28.6139, lng: 77.2090 }
    ];

    const searchInput = document.getElementById("locationSearch");
    const suggestions = document.getElementById("suggestions");

    let activeMarker = null;

    if (searchInput && suggestions) {
        searchInput.addEventListener("input", () => {
            const value = searchInput.value.toLowerCase();
            suggestions.innerHTML = "";

            if (value.length === 0) return;

            const matches = areas.filter(area =>
                area.name.toLowerCase().startsWith(value)
            );

            matches.forEach(area => {
                const li = document.createElement("li");
                li.textContent = area.name;

                li.addEventListener("click", () => {
                    searchInput.value = area.name;
                    suggestions.innerHTML = "";

                    if (activeMarker) {
                        map.removeLayer(activeMarker);
                    }

                    activeMarker = L.marker([area.lat, area.lng], {
                        icon: L.icon({
                            iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
                            iconSize: [32, 32],
                            iconAnchor: [16, 32]
                        })
                    }).addTo(map);

                    // Add click handler to navigate to location details
                    activeMarker.on('click', function() {
                        window.location.href = `location.html?name=${encodeURIComponent(area.name)}&type=emergency`;
                    });

                    map.setView([area.lat, area.lng], 10);
                });

                suggestions.appendChild(li);
            });
        });
    }

});

// ===============================
// Role Selection (UNCHANGED)
// ===============================
function selectRole(role) {
    localStorage.setItem("userRole", role);

    if (role === "victim") {
        window.location.href = "victim.html";
    } else if (role === "volunteer") {
        window.location.href = "volunteer.html";
    } else if (role === "ngo") {
        window.location.href = "ngo.html";
    }
}

// ===============================
// Update Public Transparency Stats
// ===============================
function updatePublicStats() {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

    const totalRequests = document.getElementById("public-total-requests");
    const resolvedRequests = document.getElementById("public-resolved-requests");
    const activeVolunteers = document.getElementById("public-active-volunteers");

    if (totalRequests) totalRequests.textContent = requests.length;
    if (resolvedRequests) resolvedRequests.textContent = requests.filter(r => r.status === "Resolved").length;
    if (activeVolunteers) activeVolunteers.textContent = volunteers.filter(v => v.available).length;
}

// Initialize public stats on page load
document.addEventListener("DOMContentLoaded", () => {
    updatePublicStats();
});

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
