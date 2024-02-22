const dogimg = document.getElementById("dogimg");
const buttonsdiv = document.getElementById("buttons");
const likebtn = document.getElementById("liked");
const dislikebtn = document.getElementById("disliked");
const likecntr = document.getElementById("likecount");
const dislikecntr = document.getElementById("dislikecount");

function startRater() {
    if (Number.isNaN(parseInt(localStorage.getItem("likes")))) {
        localStorage.setItem('likes', '0');
        likecntr.innerText = `U liked 0 pictures`;
    } else {
        likecntr.innerText = `U liked: ${parseInt(localStorage.getItem("likes"))} pictures`;
    }

    if (Number.isNaN(parseInt(localStorage.getItem("dislikes")))) {
        localStorage.setItem('dislikes', '0');
        dislikecntr.innerText = `U disliked 0 pictures`;
    } else {
        dislikecntr.innerText = `U disliked: ${parseInt(localStorage.getItem("dislikes"))} pictures`;
    }
}

async function fetchdog() {
    const requestUrl = "https://dog.ceo/api/breeds/image/random";

    fetch(requestUrl).then(async (response) => {
        let x = await response.json();
        dogimg.src = x.message;
    });
}

function like() {
    if (parseInt(localStorage.getItem("likes")) > 0) {
        let y = parseInt(localStorage.getItem("likes")) + 1;
        localStorage.setItem('likes', y);
        likecntr.innerText = `U liked: ${parseInt(localStorage.getItem("likes"))} pictures`;
    } else {
        localStorage.setItem('likes', 1);
        console.log(`Like localstorage set to 1`);
        likecntr.innerText = `U liked: 1 picture`;
    }
}

function dislike() {
    if (parseInt(localStorage.getItem("dislikes")) > 0) {
        let y = parseInt(localStorage.getItem("dislikes")) + 1;
        localStorage.setItem('dislikes', y);
        dislikecntr.innerText = `U disliked: ${parseInt(localStorage.getItem("dislikes"))} pictures`;
    } else {
        localStorage.setItem('dislikes', 1);
        console.log(`Dislike localstorage set to 1`);
        dislikecntr.innerText = `U disliked: 1 picture`;
    }
}

window.addEventListener("load", startRater);
fetchdog();
buttonsdiv.addEventListener("click", fetchdog);
likebtn.addEventListener("click", like);
dislikebtn.addEventListener("click", dislike);