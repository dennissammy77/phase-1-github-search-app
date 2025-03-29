document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("github-form").addEventListener("submit",(event)=>{
        event.preventDefault();
        const name = document.getElementById("search").value.trim();
        if(name === '') return alert('Missing input');
        fetch(`https://api.github.com/search/users?q=${name}`).then((response)=>response.json()).then((data)=>{
            const userList = document.getElementById("user-list");
            userList.innerHTML=``;

            data.items.map((user)=>{
                const userDetailsContainer = document.createElement('li');
                userDetailsContainer.innerHTML =` 
                    <div style="display: flex; flex-direction: row;align-items: center;width:400px;margin: 10px 0px;background-color:#e3e3e3;border-radius:10px;padding: 10px">
                        <img src='${user.avatar_url}' alt="user picture" width="50px" height="50px" style="border-radius:50px"/>
                        <div style="margin: 0px 20px">
                            <p>${user.login}</p>
                            <a href='${user.html_url}' target="_blank">view profile</a>
                            <p id='profile-${user.id}'>view repo</p>
                        </div>
                    </div>
                `;
                userList.appendChild(userDetailsContainer);
                userDetailsContainer.querySelector(`#profile-${user.id}`).addEventListener("click",()=>{
                    const reposList = document.getElementById("repos-list")
                    fetch(`https://api.github.com/users/${user.login}/repos`).then((response)=>response.json()).then((data)=>{
                        data.map((repo)=>{
                            const reposListDetail = document.createElement('li');
                            reposListDetail.innerHTML =` 
                                <div style="width:400px;margin: 10px 0px;background-color:#e3e3e3;border-radius:10px;padding: 10px">
                                    <p>${repo.name}</p>
                                    <a href='${repo.html_url}' target="_blank">view repo</a>
                                    <p id='profile-${repo.id}'>${repo.private? 'private' : 'public'}</p>
                                </div>
                            `;
                            reposList.appendChild(reposListDetail);
                        })
                    }).catch((err)=>{
                        console.log(err);
                    });
                });
            });
        }).catch((err)=>{
            console.error(err);
        })
    })
})