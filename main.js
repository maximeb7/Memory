document.addEventListener("DOMContentLoaded", () => {
    // Initialise la constante qui contient l'image de la carte face retournée 
    const blankCard = [
        {
            name: "blank",
            img: "images/blank.png",
        },
    ];

    //Initialise la constante avec l'ensemble des cartes de fruits disponibles 
    const cardsArray = [
        {
            name: "fruit_1",
            img: "images/fruit_1.png",
        },
        {
            name: "fruit_2",
            img: "images/fruit_2.png",
        },
        {
            name: "fruit_3",
            img: "images/fruit_3.png",
        },
        {
            name: "fruit_3",
            img: "images/fruit_3.png",
        },
        {
            name: "fruit_4",
            img: "images/fruit_4.png",
        },
        {
            name: "fruit_5",
            img: "images/fruit_5.png",
        },
        {
            name: "fruit_6",
            img: "images/fruit_6.png",
        },
        {
            name: "fruit_7",
            img: "images/fruit_7.png",
        },
        {
            name: "fruit_8",
            img: "images/fruit_8.png",
        },
        {
            name: "fruit_9",
            img: "images/fruit_9.png",
        },
        {
            name: "fruit_10",
            img: "images/fruit_10.png",
        },
        {
            name: "fruit_11",
            img: "images/fruit_11.png",
        },
        {
            name: "fruit_12",
            img: "images/fruit_12.png",
        },
        {
            name: "fruit_13",
            img: "images/fruit_13.png",
        },
        {
            name: "fruit_14",
            img: "images/fruit_14.png",
        },
        {
            name: "fruit_15",
            img: "images/fruit_15.png",
        },
        {
            name: "fruit_16",
            img: "images/fruit_16.png",
        },
        {
            name: "fruit_17",
            img: "images/fruit_17.png",
        },
        {
            name: "fruit_18",
            img: "images/fruit_18.png",
        },
    ];

    //sélection des cartes et création du tableau pour la partie
    //on appelle une méthode qui va nous permettre de sélectionner les cartes de façon aléatoire, de définir des paires et
    //de mélanger le tableau final de façon aléatoire également pour que les cartes soit triées dans un ordre différent à chaque rechargement de page
    const fruitArray = getRandomCardsValues(cardsArray);

    // constante pour le grid
    //on utilise querySelector pour récupérer l'élément d'index.html qui a la classe grid
    const grid = document.querySelector(".grid");
    //on en fait de même pour l'élément qui va afficher le temps
    const timeSpan = document.querySelector(".time");
    //et la même chose pour la progress bar
    const progressBar = document.querySelector(".progress-inner");

    //initialisation de tableaux vides pour le nom des cartes choisies, leurs id, et les combinaisons de paires trouvées
    var cardsChosenName = [];
    var cardsChosenId = [];
    var cardsWon = [];

    //1. Méthode pour la creation du grid
    createGrid();

    //2. Récupère les meilleurs temps de partie en base de données
    getBestResults();

    /*
     *Progress bar
     */
    //on définit un interval pour la durée maximum d'une partie
    let interval = 180;
    //on initialise un décompte qui va nous permettre de gérer dynamiquement la largeur
    // de la progress bar
    var countDown = setInterval(() => {
        interval--;
        let progressWidth = (interval / 60) * 100;
        //si interval > 0 on mets à jour la taille de la progress bar et on affiche le temps restant
        //sinon si le temps est dépassé, on indique au joueur qu'il a perdu
        if (interval > 0) {
            //on gère ici dynamiquement la largeur de la progress bar en fonction de la variable progressWidth
            progressBar.style.width = progressWidth + "px";
            timeSpan.innerHTML = interval + "s";
        } else {
            clearInterval(countDown);
            progressBar.style.width = "0%";
            alert("Tu as perdu");
            //on recharge la page
            window.location.reload();
        }
    }, 1000);

    // }

    /**
     * Génère un tableau de paire de cartes de façon random avec un tri random
     * @param {*} array
     * @returns
     */
    function getRandomCardsValues(array) {
        //on initialise un tableau vide dans lequel sera poussé les cartes choisies
        var randomSelectedCards = [];
        //tant que la longueur est différente de 14 (cela corresponds à 7 colonnes multiplié par 4 lignes comme sur le grid) on execute le code
        do {
            //génère un index random basé sur la taille du tableau d'entrée
            var random = Math.floor(Math.random() * array.length);
            //si la valeur trouvée dans le tableau passé en paramètre de la fonction grace à l'index
            // n'existe pas dans le tableau finals alors on l'insère
            //si elle existe on continue de générer un index aléatoire jusqu'à ce que cette valeur n'existe pas dans le tableau final
            // cela permet d'éviter qu'il y ai deux paires de cartes identiques dans le grid
            if (randomSelectedCards.some((final) => final.name === array[random].name)) {
                continue;
            }
            // on pousse la carte dans le tableau
            randomSelectedCards.push(array[random]);
        } while (randomSelectedCards.length != 14);

        arrayFinal = [];
        // il y a 14 cartes uniques dans randomSelectedCards / On duplique ces cartes pour générer des paires
        for (var i = 0; i < randomSelectedCards.length; ++i) {
            arrayFinal.push(randomSelectedCards[i]);
            arrayFinal.push(randomSelectedCards[i]);
        }
        //enfin on mélange les cartes dans le tableau pour que l'ordre d'affichage sur le grid soit aléatoire
        arrayFinal = arrayFinal.sort(() => Math.random() - 0.5);
        return arrayFinal;
    }
    /**
     * Création du grid initial
     */
    function createGrid() {
        //on boucle sur le tableau de cartes des fruits généré précedemment avec la méthode getRandomCardsValue
        for (let i = 0; i < fruitArray.length; i++) {
            //pour chaque carte du grid on affiche la face caché lors de l'initialisation de la partie
            var card = document.createElement("img");
            card.setAttribute("src", "images/blank.png");
            card.setAttribute("data-id", i);
            //on ajoute un listener pour détecter les click et on appelle la méthode flipcard en conséquence
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    }

    /**
     * Analyse si deux cartes sélectionnées sont identiques
     */
    function checkForMatch() {
        var cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        // si le temps restant est supérieur à 0
        if (interval > 0) {
            //si les deux cartes choisies sont identiques. on laisse les cartes affichées
            //et on les ajoute toutes les deux dans le tableau des cartes trouvées
            if (cardsChosenName[0] === cardsChosenName[1]) {
                cards[optionOneId].setAttribute(
                    "src",
                    "images/" + cardsChosenName[0] + ".png"
                );
                cards[optionTwoId].setAttribute(
                    "src",
                    "images/" + cardsChosenName[0] + ".png"
                );
                cardsWon.push(cardsChosenName[0]);
                cardsWon.push(cardsChosenName[1]);
            } else {
                //sinon on retourne les cartes
                cards[optionOneId].setAttribute("src", "images/blank.png");
                cards[optionTwoId].setAttribute("src", "images/blank.png");
            }
            //on réinitialise les deux tableaux 
            cardsChosenName = [];
            cardsChosenId = [];
            //quand la taille du tableau des cartes trouvées est égale à celle du tableau initial
            //l'utilisateur a gagné
            if (cardsWon.length === fruitArray.length) {
            // on appelle la méthode saveTimeResult pour enregistrer ce nouveau temps en base de données
                var userTime = 180 - interval
                saveTimeResult(userTime)
                //on affiche le temps de la partie à l'utilisateur et on recharge la page
                alert("tu as gagné en : "+userTime+" secondes");
                window.location.reload();
            }
        }
    }

    /**
     * traitement lorsque un utilisateur clique sur une carte
     */
    function flipCard() {
        //récupère l'id de la carte cliqué
        var cardId = this.getAttribute("data-id");
        //on la pousse dans les deux tableaux
        cardsChosenName.push(fruitArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute("src", fruitArray[cardId].img);
    
        if (cardsChosenName.length === 2) {
            //on vérifie si l'utilisateur n'as pas cliqué deux fois la même carte
            //si c'est le cas on retourne la carte selectionné
            if (cardsChosenId[0] !== cardsChosenId[1]) {
                setTimeout(checkForMatch, 500);
            } else {
                var cards = document.querySelectorAll("img");
                cards[cardsChosenId[0]].setAttribute("src", "images/blank.png");
                cardsChosenName = [];
                cardsChosenId = [];
            }
        }
    }

    /**
     * Récupère les meilleurs résultats enregistrés
     */
    function getBestResults() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        // on appelle le endpoint et le fichier php pour récupérer les 5 meilleurs temps de parties enregistrés
        xmlhttp.open("GET", "http://localhost:8888/gettime.php", true);
        xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
        xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                //on appelle une méthode pour formater l'affichage des résultats dans la fenêtre d'alerte
                displayBestResults(xmlhttp.response)
            }
        };
        xmlhttp.send();
    }

    /**
     * Formate les résultats de temps reçus et les affiche dans une popup d'alerte
     * @param {*} xmlHttpResponse 
     */
    function displayBestResults(xmlHttpResponse) {
        var responseBestResults = JSON.parse(xmlHttpResponse);
        var best_times = "Bienvenue ! Voici les meilleurs temps de partie enregistrés: \n \n";
            for (var i = 0; i < responseBestResults.length; i++) {
                best_times += "===> " + responseBestResults[i] + " secondes \n";
            }
        alert(best_times);
    }

    /**
     * Sauvegarde en base de données le temps de la partie terminée
     * @param {*} time 
     */
    function saveTimeResult(time)
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        //on définit le paramètre de temps pour l'envoyer avec la méthode post
        var data = {'time': time}

        xmlhttp.open("POST", "http://localhost:8888/savetime.php", true);
        xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
        xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xmlhttp.setRequestHeader('Content-Type', 'application/form-data');
        
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 ) {
                console.log(xmlhttp.response)
            }
        };
        xmlhttp.send(JSON.stringify(data));
    }

    
});
