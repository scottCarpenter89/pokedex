const pokemonArray = [];



document.querySelector('#saveNewPokemon').addEventListener('click', (e) => {
    e.preventDefault();
    let pokemonName = document.querySelector('#pokemonName').value;
    let number = document.querySelector('#pokemonNumber').value;
    let feet = document.querySelector('#pokemonFeet').value;
    let inches = document.querySelector('#pokemonInches').value;
    let weight = document.querySelector('#pokemonWeight').value;
    let description = document.querySelector('#pokemonDescription').value;

    let form = document.getElementById("addPokemonForm");
    let inputs = form.getElementsByClassName("form-check-input");
    let typeArray = [];

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "checkbox" && inputs[i].checked) {
            typeArray.push(inputs[i].value);
        }
    }
    let typeString = typeArray.join(', ');

    const pokemon = {
        name: `${pokemonName}`,
        number: `${number}`,
        description: `${description}`,
        feet: `${feet}`,
        inches: `${inches}`,
        weight: `${weight}`,
        type: `${typeString}`
    }

    const newCard = `<!-- New Pokemon -->
            <div id="${pokemonName}-card" class="col-md-6 col-lg-3 col-xxl-2 d-flex justify-content-center">
                <div class="card container-fluid mb-4" style="width: 18rem;">
                    <div class="pokemon-name-number d-flex justify-content-between mt-2">
                        <h4 class="card-title">${pokemonName}</h4>
                        <h4 class="card-title">#${number}</h4>
                    </div>
                    <div class="img-container">
                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png"
                            class="card-img-top" alt="Photo of ${pokemonName}">
                    </div>

                    <div class="card-content">
                        <div class="description-container mb-3">
                            <p class="card-text">
                                ${description}
                            </p>
                        </div>

                        <div id="${pokemonName}-stats" class="row mb-3">
                            <div id="${pokemonName}-height-container" class="col-6 mb-3">
                                <div class="height-title me-2">
                                    Height:
                                </div>
                                <div class="height-content">
                                    ${feet}' ${inches}"
                                </div>
                            </div>

                            <div id="${pokemonName}-weight-container" class="col-6 mb-3">
                                <div class="weight-title me-2">
                                    Weight:
                                </div>
                                <div class="weight-content">
                                    ${weight} lbs
                                </div>
                            </div>

                            <div id="${pokemonName}-type-container" class="col-12 mb-3">
                                <div class="type-title">
                                    Type:
                                </div>
                                <div class="type-content">
                                    ${typeString}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container mb-3 d-flex justify-content-end">
                            <button id="update-${pokemonName} type="button" class="btn btn-warning" data-bs-toggle="modal"
                                data-bs-target="#updateModal">Update</button>
                            <button id="release-${pokemonName}" class="release btn btn-success ms-2">Release</button>
                        </div>
                </div>
            </div>`;

    pokemonArray.push(pokemon);
    window.localStorage.setItem("pokemon", JSON.stringify(pokemonArray));
    document.querySelector('.row').insertAdjacentHTML("beforeend", newCard);
    document.querySelector('#addPokemonForm').reset();
});

// takes data from local storage and puts it into an array
document.addEventListener('DOMContentLoaded', event => {
    event.preventDefault();

    const loadCards = JSON.parse(localStorage.getItem('pokemon'));

    if (localStorage.getItem("pokemon") === null) {
        return;
    } else {
        loadCards.forEach(pokemon => {
            const card = `<!-- New Pokemon -->
        <div id="${pokemon.name}-card" class="col-md-6 col-lg-3 col-xxl-2">
            <div class="card container mb-4" style="width: 18rem;">
                <div class="pokemon-name-number d-flex justify-content-between mt-2">
                    <h4 class="card-title">${pokemon.name}</h4>
                    <h4 class="card-title">#${pokemon.number}</h4>
                </div>
                <div class="img-container">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png"
                        class="card-img-top" alt="Photo of ${pokemon.name}">
                </div>

                <div class="card-content">
                    <div class="description-container mb-3">
                        <p class="card-text">
                            ${pokemon.description}
                        </p>
                    </div>

                    <div id="${pokemon.name}-stats" class="row mb-3">
                        <div id="${pokemon.name}-height-container" class="col-6 mb-3">
                            <div class="height-title me-2">
                                Height:
                            </div>
                            <div class="height-content">
                                ${pokemon.feet}' ${pokemon.inches}"
                            </div>
                        </div>

                        <div id="${pokemon.name}-weight-container" class="col-6 mb-3">
                            <div class="weight-title me-2">
                                Weight:
                            </div>
                            <div class="weight-content">
                                ${pokemon.weight} lbs
                            </div>
                        </div>

                        <div id="${pokemon.name}-type-container" class="col-12 mb-3">
                            <div class="type-title">
                                Type:
                            </div>
                            <div class="type-content">
                                ${pokemon.type}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container mb-3 d-flex justify-content-end">
                        <button id="update-${pokemon.name}" type="button" class="btn btn-warning" data-bs-toggle="modal"
                            data-bs-target="#updateModal">Update</button>
                        <button id="release-${pokemon.name}" class="release btn btn-success ms-2"  data-bs-toggle="modal"
                        data-bs-target="#confirm-release" card-id="${pokemon.number}">Release</button>
                    </div>
            </div>
        </div>`;

            document.querySelector('.row').insertAdjacentHTML("beforeend", card);

            document.querySelector(`#release-${pokemon.name}`).addEventListener('click', e => {
                e.preventDefault();

                document.querySelector("#confirm-body").innerHTML = `<p>Are you sure you want to release ${pokemon.name} back into the wild? </p>`

                document.querySelector('#release').addEventListener('click', e => {
                    let releasePokemon = document.querySelector(`#${pokemon.name}-card`);
                    let pokemonName = `${pokemon.name}`;
                    releasePokemon.remove();
                    for (let i = 0; i < loadCards.length; i++) {
                        if (loadCards[i].name === pokemonName) {
                            loadCards.splice(loadCards[i], 1);
                            console.log(loadCards);
                            window.localStorage.setItem("pokemon", JSON.stringify(loadCards));
                        }
                    }
                });
            });

            document.querySelector(`#update-${pokemon.name}`).addEventListener('click', e => {
                e.preventDefault();
                let data = localStorage.getItem("pokemon");

                let updateName = `${pokemon.name}`;
                let updateNumber = `${pokemon.number}`;
                let updateFeet = `${pokemon.feet}`;
                let updateInches = `${pokemon.inches}`;
                let updateWeight = `${pokemon.weight}`;
                let updateDescription = `${pokemon.description}`;

                let form = document.getElementById("updatePokemonForm");
                let inputs = form.getElementsByClassName("form-check-input");
                let typeArray = [];

                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].type === "checkbox" && inputs[i].checked) {
                        typeArray.push(inputs[i].value);
                    }
                }
                let types = typeArray.join(', ');


                const updateNameField = document.querySelector('#update-pokemon-name');
                const updateNumberField = document.querySelector('#update-pokemon-number');
                const updateFeetField = document.querySelector('#update-pokemon-feet');
                const updateInchesField = document.querySelector('#update-pokemon-inches');
                const updateWeightField = document.querySelector('#update-pokemon-weight');
                const updateDescriptionField = document.querySelector('#update-pokemon-description');

                updateNameField.setAttribute("value", updateName);
                updateNumberField.setAttribute("value", updateNumber);
                updateFeetField.setAttribute("value", updateFeet);
                updateInchesField.setAttribute("value", updateInches);
                updateWeightField.setAttribute("value", updateWeight);
                updateDescriptionField.innerText = updateDescription;


                document.querySelector('#update-pokemon').addEventListener('click', e => {
                    let updateLocalStorage = {
                        name: updateNameField.value,
                        number: updateNumberField.value,
                        feet: updateFeetField.value,
                        inches: updateInchesField.value,
                        weight: updateWeightField.value,
                        description: updateDescriptionField.value
                    }
                    pokemonArray.push(updateLocalStorage)
                    window.localStorage.setItem("pokemon", JSON.stringify(pokemonArray));
                })
            });
        });
    }
});
