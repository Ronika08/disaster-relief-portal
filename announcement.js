// Load announcement details on page load
document.addEventListener('DOMContentLoaded', loadAnnouncementDetails);

function loadAnnouncementDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const announcementId = urlParams.get('id');

    if (!announcementId) {
        document.getElementById('announcement-message').textContent = 'Announcement not found.';
        return;
    }

    // Find announcement in localStorage
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    const announcement = announcements.find(a => a.id == announcementId);

    if (!announcement) {
        document.getElementById('announcement-message').textContent = 'Announcement not found.';
        return;
    }

    // Populate the page
    const tagElement = document.getElementById('announcement-tag');
    const tagText = announcement.type ? announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1) : 'Info';
    tagElement.textContent = tagText;
    tagElement.className = `announcement-tag-large announcement-${announcement.type || 'info'}`;

    document.getElementById('announcement-timestamp').textContent = `Posted: ${new Date(announcement.timestamp).toLocaleString()}`;
    document.getElementById('announcement-message').innerHTML = announcement.text;
    document.getElementById('announcement-priority').textContent = getPriorityText(announcement.type);
}

function getPriorityText(type) {
    switch(type) {
        case 'alert': return 'Critical - Immediate Action Required';
        case 'safety': return 'Important - Safety Information';
        case 'info': return 'Information - Stay Informed';
        default: return 'General Information';
    }
}

function goBack() {
    window.history.back();
}