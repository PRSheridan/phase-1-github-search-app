let userName = "default";

const GETconfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/vnd.github.v3+json"
  }
};

function buildCard(userData) {
    const userList = document.getElementById('user-list');
    img = document.createElement('img')
    p = document.createElement('p')

    img.src = userData.avatar_url;
    img.alt = `${userData.login} image not found`;
    img.style.height = "40%";
    img.style.width = "40%";
    p.textContent = `${userData.login}: ${userData.url}`;

    userList.appendChild(img)
    userList.appendChild(p)
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('submit', (event)=> {
        event.preventDefault();
        userName = event.target.search.value;
        const getUserUrl = `https://api.github.com/search/users?q=${userName}`;
        const getReposUrl = `https://api.github.com/users/${userName}/repo`;

        fetch(getUserUrl, GETconfig) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for(index in data.items) {
                console.log(data.items[index]);
                buildCard(data.items[index]);    
            }
        })
    })
})