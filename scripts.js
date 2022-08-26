const getData = async (url) => {
    return await axios.get(url);
};

// Modal fonction
function OpenModal(data) {
    modal.style.display = "block";
    //console.log(data);

    let modalimg = document.getElementById("modalimg");
    modalimg.src = data.image_url;
    let modaltitle = document.getElementById("modaltitle");
    modaltitle.innerHTML = data.title;
    let modalgenre = document.getElementById("modalgenre");
    modalgenre.innerHTML = data.genres;
    let modalyear = document.getElementById("modalyear");
    modalyear.innerHTML = data.year;
    let modalvotes = document.getElementById("modalvotes");
    modalvotes.innerHTML = data.votes;
    let modalimdbscore = document.getElementById("modalimdbscore");
    modalimdbscore.innerHTML = data.imdb_score;
    let modaldirectors = document.getElementById("modaldirectors");
    modaldirectors.innerHTML = data.directors;
    let modalactors = document.getElementById("modalactors");
    modalactors.innerHTML = data.actors;
}

let Drama1 = 'http://localhost:8000/api/v1/titles/?genre=Drama&page=1';
let Drama2 = 'http://localhost:8000/api/v1/titles/?genre=Drama&page=2';

let Adventure1 = 'http://localhost:8000/api/v1/titles/?genre=Adventure';
let Adventure2 = 'http://localhost:8000/api/v1/titles/?genre=Adventure&page=2';

let Mystery1 = 'http://localhost:8000/api/v1/titles/?genre=Mystery';
let Mystery2 = 'http://localhost:8000/api/v1/titles/?genre=Mystery&page=2';

let History1 = 'http://localhost:8000/api/v1/titles/?genre=History';
let History2 = 'http://localhost:8000/api/v1/titles/?genre=History&page=2';


let srcthebestfilm = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
let srcthebestfilm2 = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2';

async function changeImages(divname, position, categorie) {
    let divFilms = document.getElementById(divname);
    let listImg = divFilms.getElementsByTagName('img');

    let response1 = '';
    let response2 = '';

    if (categorie == 'bestfilms') {
        response1 = await getData(srcthebestfilm);
        response2 = await getData(srcthebestfilm2);
    }

    if (categorie == 'Adventure') {
        response1 = await getData(Adventure1);
        response2 = await getData(Adventure2);
    }

    if (categorie == 'Mystery') {
        response1 = await getData(Mystery1);
        response2 = await getData(Mystery2);
    }
    
    if (categorie == 'History') {
        response1 = await getData(History1);
        response2 = await getData(History2);
    }

    if (divname == 'thebestfilm') {
        response1 = await getData(srcthebestfilm);
        response2 = await getData(srcthebestfilm);
    }

    let tableau1 = response1.data.results;
    let tableau2 = response2.data.results;

    let tableau = tableau1;
    if (position == 'Next') {
        tableau = tableau2;
    }

    //Charger les images pour les categories
    if (categorie != '') {
        for (var i = 0; i < listImg.length; i++) {
            //alert(listImg[i].src);
            //alert(images_bestfilms2[i]);
            //console.log(tableau1[i].image_url);
            listImg[i].src = tableau[i].image_url;
            let t = tableau[i];
            (function(t){
                listImg[i].addEventListener("click", function() {
                  //console.log(t)
                  OpenModal(t);
                })
              })(t)
            //listImg[i].onclick = function() { OpenModal(tableau[i]); };
        }
    } else {
        listImg[0].src = tableau[0].image_url;
        listImg[0].onclick = function() { OpenModal(tableau[0]); };

    }
    //document.getElementById('bestfilms').innerHTML = "You pressed " + value;
}



changeImages('thebestfilm',this.value,'');
changeImages('bestfilms',this.value,'bestfilms');
changeImages('categorie1',this.value,'Adventure');
changeImages('categorie2',this.value,'Mystery');
changeImages('categorie3',this.value,'History');


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
//btn.onclick = function() {
//  modal.style.display = "block";
//}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}