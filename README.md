# Disaster Relief Coordination Portal

A comprehensive web application for coordinating disaster relief efforts, connecting victims, volunteers, and NGOs.

## Features

### Core Features
- **Role-Based Access**: Separate dashboards for victims, volunteers, and NGO/admin users.
- **Help Request System**: Victims can submit requests for food, shelter, or medical assistance with location and urgency levels.
- **Volunteer Management**: Volunteers can register, view available requests, accept tasks, and mark them complete.
- **NGO/Admin Dashboard**: View all requests, assign volunteers, update statuses, and monitor progress.
- **Location-Based Map View**: Interactive map showing affected areas and request locations using OpenStreetMap and Leaflet.js.

### Intermediate Features
- **Urgency Classification**: Color-coded urgency levels (High 🔴, Medium 🟡, Low 🟢) for requests.
- **Emergency Announcements Board**: NGOs can post alerts, shelter info, and safety instructions.
- **Request Tracking Timeline**: Detailed timeline showing request submission, assignment, and resolution with timestamps.
- **Offline Support**: Basic offline functionality using localStorage for form data and requests.

## How to Use

1. Open `index.html` in a web browser.
2. Select your role: Victim, Volunteer, or NGO/Admin.
3. Follow the respective dashboard to submit requests, manage tasks, or oversee operations.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Leaflet.js for maps
- localStorage for data persistence

## Project Structure

- `index.html`: Role selection page
- `victim.html`: Victim dashboard
- `volunteer.html`: Volunteer dashboard
- `ngo.html`: NGO/Admin dashboard
- `style.css`: Stylesheet
- `script.js`: Main script for role selection
- `victim.js`: Victim dashboard logic
- `volunteer.js`: Volunteer dashboard logic
- `ngo.js`: NGO dashboard logic

## Installation

No installation required. Simply open the HTML files in a modern web browser.

## Contributing

Feel free to fork and contribute to this project.