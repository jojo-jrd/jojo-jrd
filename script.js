document.addEventListener("DOMContentLoaded", async function() {
    const username = "jojo-jrd";
    
    async function fetchGitHubData(url) {
        const response = await fetch(url);
        return response.json();
    }

    async function loadProjects() {
        const repos = await fetchGitHubData(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const projectList = document.getElementById("project-list");
        
        projectList.innerHTML = repos.filter(repo => repo.name != username ).map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join("");
    }

    async function loadCollaborations() {
        const events = await fetchGitHubData(`https://api.github.com/users/${username}/events/public`);
        const collaborationList = document.getElementById("collaboration-list");
        
        const collabs = events
            .filter(event => event.type === "PushEvent")
            .slice(0, 5)
            .map(event => `<p>Commit to <a href="${event.repo.url.replace('api.', '').replace('repos/', '')}" target="_blank">${event.repo.name}</a></p>`)
            .join("");
        
        collaborationList.innerHTML = collabs || "No recent collaborations";
    }
    
    await loadProjects();
    await loadCollaborations();
});
