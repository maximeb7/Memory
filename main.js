document.addEventListener('DOMContentLoaded', () => {

    const blankCard = [
        {
            name:'blank',
            img: 'images/blank.png'
        }
    ]

    const cardsArray = [
        {
            name:'fruit_1',
            img: 'images/fruit_1.png'
        },
        {
            name:'fruit_2',
            img: 'images/fruit_2.png'
        },
        {
            name:'fruit_3',
            img: 'images/fruit_3.png'
        },
        {
            name:'fruit_3',
            img: 'images/fruit_3.png'
        },
        {
            name:'fruit_4',
            img: 'images/fruit_4.png'
        },
        {
            name:'fruit_5',
            img: 'images/fruit_5.png'
        },
        {
            name:'fruit_6',
            img: 'images/fruit_6.png'
        },
        {
            name:'fruit_7',
            img: 'images/fruit_7.png'
        },
        {
            name:'fruit_8',
            img: 'images/fruit_8.png'
        },
        {
            name:'fruit_9',
            img: 'images/fruit_9.png'
        },
        {
            name:'fruit_10',
            img: 'images/fruit_10.png'
        },
        {
            name:'fruit_11',
            img: 'images/fruit_11.png'
        },
        {
            name:'fruit_12',
            img: 'images/fruit_12.png'
        },
        {
            name:'fruit_13',
            img: 'images/fruit_13.png'
        },
        {
            name:'fruit_14',
            img: 'images/fruit_14.png'
        },
        {
            name:'fruit_15',
            img: 'images/fruit_15.png'
        },
        {
            name:'fruit_16',
            img: 'images/fruit_16.png'
        },
        {
            name:'fruit_17',
            img: 'images/fruit_17.png'
        },
        {
            name:'fruit_18',
            img: 'images/fruit_18.png'
        },
    ]
    const fruitArray = getRandom(cardsArray,14)



    const grid = document.querySelector('.grid') 
    const resultDisplay = document.querySelector('#result')
    var cardsChosenName = []
    var cardsChosenId = []
    var cardsWon = []

    /**
     * Création du grid initial
     */
    function createGrid() {
        //var fruitRandom = getRandom(fruitArray,14)
        for(let i = 0 ; i < fruitArray.length ; i++ ){
            var card = document.createElement('img')
            card.setAttribute('src','images/blank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click',flipCard)
            grid.appendChild(card)
        }
    }
    
    /**
     * Sélectionne les cartes de façon aléatoire à chaque appelle
     * à partir du tableau fruitArray
     * @param {*} arr 
     * @param {*} n 
     * @returns 
     */
    function getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            //on pousse une autre fois le résultat dans le tableau pour qu'il y ai des paires de cartes
            result.push(result[n])
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }


    function checkForMatch(){
        var cards =document.querySelectorAll('img')
        const optionOneId =  cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if(cardsChosenName[0] === cardsChosenName[1])
        {
            //alert('tu as trouvé une combinaison')
            console.log('images/'+cardsChosenName+'.png')
            cards[optionOneId].setAttribute('src', 'images/'+cardsChosenName[0]+'.png')
            cards[optionTwoId].setAttribute('src', 'images/'+cardsChosenName[0]+'.png')
            cardsWon.push(cardsChosenName)
        }else{
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
        }
        cardsChosenName = []
        cardsChosenId = []
        console.log('cards won====');
        console.log(cardsWon.length)
        console.log('cards Array====');
        console.log(cardsArray.length)
        //resultDisplay.textContent = cardsWon.length
        if(cardsWon.length === cardsArray.length)
        {
            alert('tu as gagné')
            //resultDisplay.textContent = 'Bravo ! Tu as gagné'
        }
    }




    function flipCard(){
        var cardId = this.getAttribute('data-id')
        cardsChosenName.push(fruitArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src',fruitArray[cardId].img)
        if (cardsChosenName.length === 2)
        {
            setTimeout(checkForMatch, 500)
        }
    }
    // 1. appel de la fonction pour la création du grid initial
    createGrid()



})

