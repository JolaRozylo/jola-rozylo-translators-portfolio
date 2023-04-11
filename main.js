// array to be populated by existing publications
const myPublications = [];
// array to be populated by items saves in localStorage ('bookmarked')
let bookmarked = [];
// array for liked objects
let comments = [];
// array for liked obejcts
let liked = [];

// constructor function to create book objects
function Publication(title, author, publishedIn, url, id) {
  this.title = title;
  this.author = author;
  this.publishedIn = publishedIn;
  this.url = url;
  this.id = id;
}

// contructor function to create comment objects
function Comment(id, comment) {
  this.id = id;
  this.comment = comment;
}
// existing publication objects
let terminating = new Publication("Terminating", "Tony Kushner", "Chidusz 8/2021", "https://chidusz.com/tony-kushner-terminating-and-the-heritage-of-the-polish-jews/", "terminating");
let trick = new Publication("Trick", "Chris Kraus", "Chidusz 4/2021", "https://chidusz.com/i-love-dick-trick-chris-kraus-michal-wojcik-jewish-uprisings-jewish-historical-institute-jhi/", "trick");
let reversedTranscription = new Publication("Reversed Transcription", "Tony Kushner", "Chidusz 9/2021", "https://chidusz.com/chidusz-920221-tony-kushners-reverse-transcription-and-the-final-episode-of-dinezons-the-dark-young-man/", "rev-transcription");
let comingOfLilith = new Publication("The Coming of Lilith", "Judith Plaskow", "Chidusz 5/2022", "https://chidusz.com/chidusz-52022-lilith-eve-and-judith-plasows-jewish-feminist-theology/", "lilith");
let queerAndPleasant = new Publication("A Queer and Pleasant Danger", "Kate Bornstein", "Chidusz 7/2021", "https://chidusz.com/chidusz-72021-a-queer-and-pleasant-danger-a-serial-memoire/", "queer-pleasant");
let ettaBessie = new Publication("Etta, Bessie, Dora or Rose", "Elisa Albert", "Chidusz 1/2021", "https://chidusz.com/chidusz-12021-israel-singers-pearls-and-a-bold-letter-to-philip-roth/", "etta-bessie");

//populate array with publication objects
myPublications.push(terminating, trick, reversedTranscription, comingOfLilith, queerAndPleasant, ettaBessie);

// function to add a bookmark
const bookmark = (clickedID) => {
  // for Each function to check if the clicked button id matches the object id
  myPublications.forEach((item) => {
    // if matched and storage is empty, add to empty bookmarked array and store in local storage
    if (clickedID === item.id && JSON.parse(localStorage.getItem("saved")) === null) {
      bookmarked.push(item);
      localStorage.setItem("saved", JSON.stringify(bookmarked));
      alert("There is currently 1 item saved.");
      // else, if matched and storage in not empty, populate the empty array with items from local storage
    } else if (clickedID === item.id && JSON.parse(localStorage.getItem("saved")) !== null) {
      bookmarked = JSON.parse(localStorage.getItem("saved"));
      const checkIfMarked = (element) => element.id === item.id; // to prevent adding the same item twice -- .some() method to check if item with this id is in the array
      if (bookmarked.some(checkIfMarked) === false) {
        // if not, add to the array and store in localStorage
        bookmarked.push(item);
        localStorage.setItem("saved", JSON.stringify(bookmarked));
        alert(`There are currently ${bookmarked.length} items saved.`); // alert user about number of stored items
      } else {
        alert(`You have already bookmarked this item.\nThere are currently ${bookmarked.length} items saved.`); // if the item was already saved, notify user and alert about the number of saved items
      }
    }
  });
};

// funtion to display bookmarked items on bookmarked page -->
const displayBookmarked = () => {
  let htmlTable = document.getElementById("table");
  bookmarked = JSON.parse(localStorage.getItem("saved"));
  bookmarked.forEach((bookmarkedItem) => {
    let newRow = document.createElement("tr");
    newRow.setAttribute(`id`, `row-${bookmarkedItem.title}`);
    let titleCell = document.createElement("td");
    titleCell.setAttribute(`id`, `${bookmarkedItem.title}-title`);
    titleCell.innerHTML = bookmarkedItem.title;
    let authorCell = document.createElement("td");
    authorCell.setAttribute(`id`, `${bookmarkedItem.title}-author`);
    authorCell.innerHTML = bookmarkedItem.author;
    let publishedIn = document.createElement("td");
    publishedIn.setAttribute(`id`, `${bookmarkedItem.title}-published`);
    let a = document.createElement("a");
    let link = document.createTextNode(bookmarkedItem.publishedIn);
    a.title = bookmarkedItem.publishedIn;
    a.href = bookmarkedItem.url;

    htmlTable.appendChild(newRow);
    newRow.appendChild(titleCell);
    newRow.appendChild(authorCell);
    newRow.appendChild(publishedIn);
    publishedIn.appendChild(a);
    a.appendChild(link);
  });

  // --> display heart icon if the item was likes -->
  liked = JSON.parse(localStorage.getItem("likedItems"));
  liked.forEach((item) => {
    if (item.isLiked === true) {
      let row = document.getElementById(`row-${item.title}`);
      let liked = document.createElement("td");
      let heart = document.createElement("i");
      heart.setAttribute("class", "fa-regular fa-heart");
      row.appendChild(liked);
      liked.appendChild(heart);
    }
  });
  // --> display comments
  comments = JSON.parse(localStorage.getItem("new-comments"));
  console.log(comments);
  comments.forEach((item) => {
    let id = item.id;
    let uppercase = id.charAt(0).toUpperCase() + id.slice(1);
    let commentRow = document.createElement("tr");
    let newPrgf = document.createElement("p");
    newPrgf.setAttribute("class", "commentPrgrf");
    commentRow.appendChild(newPrgf);
    newPrgf.innerHTML = `You commented on "${uppercase}":\n${item.comment}`;
    htmlTable.appendChild(commentRow);
  });
};
// fucntion to give an item a "like"
const like = (clickedID) => {
  myPublications.forEach((item) => {
    // forEach item in the existing publications, check if the clicked button id matches any of the publications
    let wantToLike = document.getElementById(clickedID);
    if (clickedID === item.id && JSON.parse(localStorage.getItem("likedItems")) === null) {
      // if there is a match and array of liked objects is empty, add to the array and store in localStorage
      wantToLike.setAttribute("class", "fa-bounce"); // change icon to a bouncing heart to indicate that the item was liked
      item.isLiked = true;
      liked.push(item);
      localStorage.setItem("likedItems", JSON.stringify(liked));
    } else if (clickedID === item.id && JSON.parse(localStorage.getItem("likedItems")) !== null) {
      liked = JSON.parse(localStorage.getItem("likedItems"));
      const checkIfLiked = (element) => element.id === item.id; // .some() method to check if item with this id is in the array
      if (liked.some(checkIfLiked) === false) {
        // if not, add to the array and store in localStorage
        item.isLiked = true;
        liked.push(item);
        localStorage.setItem("likedItems", JSON.stringify(liked)); // store items
      }
    }
  });
};
// funtion to comment on a publication
// pass the clicked "add comment" button's id as an argument
const comment = (clickedID) => {
  let addComment = prompt("Comment on this publication:"); // get user's comment
  let newComment = new Comment(clickedID, addComment); // create a new comment object with 2 properties: the button's id and the comment
  if (JSON.parse(localStorage.getItem("addedComments")) === null) {
    // if the storage is empty, add comment
    comments.push(newComment); // add comment object to the comment array
    localStorage.setItem("new-comments", JSON.stringify(comments)); // store comments in
  } else {
    // else, add to existing comments
    comments = JSON.parse(localStorage.getItem("new-comments"));
    comments.push(newComment);
  }
};
