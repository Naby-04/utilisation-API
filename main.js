// ---------------- declaration des variables

const searchZone = document.getElementById("searchZone");
const subButton = document.getElementById("subBtn");
const showzone = document.getElementById("show");

subButton?.addEventListener("click", function sendrequest(e) {
  e.preventDefault();
  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + searchZone?.value)
    .then((response) => response.json())
    .then((data) => {
      showzone.style.display = "block";
      // console.table(data);
      // ---------sens du mot
      const sens = document.createElement("p");
      sens.textContent =
        "Sens:  " + data[0].meanings[0].definitions[0].definition;
      showzone?.appendChild(sens);
      // ---------sens du mot exit
      // ---------phonetic du mot
      const phonetic = document.createElement("p");
      phonetic.textContent = "Phonetic:  " + data[0].phonetics[1].text;
      showzone?.appendChild(phonetic);
      // ---------phonetic du mot exit
      // ---------son du mot
      const son = document.createElement("audio");

      // Ajoute des contrôles pour que l'utilisateur puisse jouer/pause
      son.controls = true;

      //  Accéder au tableau "phonetics"
      const phonetics = data[0].phonetics;
      //  Filtrer les éléments avec un lien audio valide
      const audiosWithLinks = phonetics.filter((item) => item.audio !== "");
      console.log(audiosWithLinks[0].audio);
      son.src = audiosWithLinks[0].audio;
      son.classList.add("d-block");
      son.classList.add("m-auto");
      son.classList.add("mb-5");
      showzone?.appendChild(son);
      // ---------son du mot exit
      // ----------exemples
      // ---
      //  Accéder au tableau "phonetics"
      const exemple = data[0].meanings[2].definitions;
      //  Filtrer les éléments avec une definition valide
      const exemplevalid = exemple.filter((item) => item.definitions !== "");
      const definitionsOnly = exemplevalid.map((item) => item.definition);

      console.table(definitionsOnly);
      definitionsOnly.forEach((element) => {
        const exemples = document.createElement("p");
        exemples.textContent = "Exemple:  " + element;
        showzone?.appendChild(exemples);
      });
      const separate = document.createElement("hr");
      showzone?.appendChild(separate);

      // -----
      // console.log(!Array(exemplevalidArray));

      // exemples.textContent =
      //   "exemple:  " + data[0].meanings[2].definitions[1].definition;
      // showzone?.appendChild(exemples);

      // ----------exemples exit
    });
  resetForm();
});
// Fonction pour réinitialiser le formulaire et les boutons
function resetForm() {
  // Réinitialiser les champs de saisie
  searchZone.value = "";
}
