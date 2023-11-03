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
    h4 = document.createElement('h4');
    img = document.createElement('img');
    p = document.createElement('p');

    h4.className = "user"
    h4.textContent = `${userData.login}`;
    img.src = userData.avatar_url;
    img.alt = `${userData.login} image not found`;
    img.style.height = "auto";
    img.style.width = "20%";
    p.textContent = `${userData.url}`;

    userList.appendChild(h4);
    userList.appendChild(img);
    userList.appendChild(p);
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('submit', (event)=> {
        event.preventDefault();
        userName = event.target.search.value;
        const getUserUrl = `https://api.github.com/search/users?q=${userName}`;

        fetch(getUserUrl, GETconfig) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for(index in data.items) {
                buildCard(data.items[index]);    
            };
        });

    });

    document.addEventListener('click', (event) => {
        if (event.target.className == "user") {
            const reposUserName = event.target.textContent;
            const getReposUrl = `https://api.github.com/users/${reposUserName}/repos`;

            const ul = document.createElement('ul');
            event.target.appendChild(ul);

            fetch(getReposUrl, GETconfig)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                console.log(response);
                for (repo in response) {
                    const li = document.createElement('li');
                    li.textContent = response[repo].name;
                    li.href = response[repo].url;
                    ul.appendChild(li);
                }
            });

        };
    });
});