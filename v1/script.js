function getTextBox(){
    return document.querySelector('input')
   }
   
function getCocktailName(){
    let r = getTextBox().value;
    getTextBox().value = "";
    return r
}

function requestCocktail(){
    let baseline = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    let query = getCocktailName().toLowerCase();
    (query.length > 3)? baseline += query : baseline += 'margarita';
    let information = fetch(baseline).then( res => res.json() ).then(
        data => {
            return data.drinks;
        }
    )
    return information    
}

function showFirstDrink(){
    colorz();
    const title = document.querySelector(".name");
    const instr = document.querySelector(".instructions");
    const img = document.querySelector('img');
    const ingredients = document.querySelector('p.ingre');
    const promisedDrinks = requestCocktail();
    promisedDrinks.then(info => {
        const d = info[
            Math.floor( Math.random() * info.length )
        ];
        const ingList = getIngredients(d);
        makeList(ingList,ingredients)
        title.textContent = d.strDrink;
        instr.textContent = d.strInstructions;
        img.setAttribute('src',d.strDrinkThumb);
        return info
    }).then(info => {
        const allDrinks = info.map(drink => drink.strDrink);
        const target = document.querySelector('ul.others');
        makeList(allDrinks,target);
    })
}

function getIngredients(drink){
    const pairs = Object.entries(drink).filter(propertyPair => {
        const regexp = /(strIngredient\d)/;
        return (regexp.test( propertyPair[0] ) && propertyPair[1] != null)
    });
    return pairs.map(val => val[1] )
}

function makeList(array,target){
    target.innerHTML = "";
    array.forEach(element => {
    const li = document.createElement('li');
    li.classList.add('others');
    li.textContent = element;
    target.append(li)
})
}

function colorz(){
    let hue = Math.floor( Math.random() * 255 );
    let sat = 30;
    let lux = 25;
    const background = document.querySelector('html');
    const header = document.querySelector('header');
    let color1 = `hsl(${hue}, ${sat}%, ${lux-10}%)`;
    let color2 = `hsl(${hue}, ${sat}%, ${lux-15}%)`;
    background.setAttribute('style',``);
    header.setAttribute('style',``)
    background.setAttribute('style',`background-color: ${color1}`);
    header.setAttribute('style',`background-color: ${color2}`)
    console.log('Colorz!')
}

const button = document.querySelector('button');
button.addEventListener('click',showFirstDrink);
showFirstDrink();