
let searchInput = document.querySelector('.container input')
let getButton = document.querySelector('.get-button')
let reposData = document.querySelector('.data')
let userName = 'ibrah-salama'
let mainDiv = document.querySelector('.github-cards')

getButton.onclick = ()=>{
    fetchData()
}

function fetchData(){
    reposData.innerHTML = ""
    if(searchInput.value == ""){
        reposData.innerHTML = "<span style='color:red'>Please Enter User Name </span>"
    }else{
        fetch(`https://api.github.com/users/${searchInput.value}/repos`)
            .then(response => response.json())
            .then(data => gitHupReos(data))
            .catch((err) => console.log(err)  )
    }
}
function gitHupReos(repos){
    repos.forEach(repo => {
        let cardContainer = document.createElement('a')
        cardContainer.href= `https://github.com/${searchInput.value}/${repo.name}`
        cardContainer.setAttribute('class','github-card')
        cardContainer.setAttribute('target','_blanc')
        let repoName = document.createTextNode(repo.name)
        let repoNameTag = document.createElement('h3')
        let description = document.createElement('p')
        let descriptionText = document.createTextNode(repo.description)
        description.appendChild(descriptionText)
        repoNameTag.appendChild(repoName)
        cardContainer.appendChild(repoNameTag)
        cardContainer.appendChild(description)
        
        let language = document.createElement('span')
        language.setAttribute('class','github-card__meta')
        let languageStyle = document.createElement('span')
        languageStyle.setAttribute('class','github-card__language-icon')
        languageStyle.setAttribute('class','color:#7A0410')
        let languageStyleText = document.createTextNode('●')
        languageStyle.appendChild(languageStyleText)
        language.appendChild(languageStyle)
        let langName = document.createTextNode(repo.language)
        language.appendChild(langName)
        cardContainer.appendChild(language)
        
        let repoStars = document.createElement('span')
        repoStars.setAttribute('class','github-card__meta')
        let starIcon =document.createElement('i')
        starIcon.setAttribute('class','fa fa-star')
        let spinnerContainer = document.createElement('span')
        let spannerIcon = document.createElement('i')
        let starsData = document.createTextNode(repo.stargazers_count)
        // spannerIcon.setAttribute('class','fa fa-spinner')
        // spinnerContainer.appendChild(spannerIcon)
        repoStars.appendChild(starIcon)
        repoStars.appendChild(starsData)
        // repoStars.appendChild(spinnerContainer)
        cardContainer.appendChild(repoStars)

        let repoForks = document.createElement('span')
        repoForks.setAttribute('class','github-card__meta')
        let forksIcon =document.createElement('i')
        forksIcon.setAttribute('class','fa fa-code-fork')
        let forksData = document.createTextNode(repo.forks)
        repoForks.appendChild(forksIcon)
        repoForks.appendChild(forksData)
        // repoForks.appendChild(spinnerContainer)
        cardContainer.appendChild(repoForks)




        mainDiv.appendChild(cardContainer)
    });
}