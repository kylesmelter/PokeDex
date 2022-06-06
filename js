document.querySelector("button").addEventListener("click", search);

function search() {
  const choice = document.querySelector("input").value.toLowerCase();

  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`;

  // This fetch will handle the image, name, height, weight, and type(s) of the submitted Pokemon

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // Returning an image of the Pokemon
      document.querySelector("img").src =
        data.sprites.other["official-artwork"].front_default;

      // Returning the name of the Pokemon
      document.querySelector("h3").innerText = capitalizeName(data.name);

      // Returning the height of the Pokemon in feet
      document.querySelector(".height").innerText =
        "Height/Length:" + " " + heightToFeet(data.height) + " " + "feet";

      // Returning the weight of the Pokemon in pounds
      document.querySelector(".weight").innerText =
        "Weight:" + " " + weightToPounds(data.weight) + " " + "pounds";

      // Returning the type(s) of the Pokemon, and placing them in an unordered list
      data.types.forEach((obj) => {
        const li = document.createElement("li");

        li.textContent = capitalizeTypes(obj.type.name);

        document.querySelector(".types-heading").innerText = "Type(s)";
        document.querySelector(".types").appendChild(li);
      });
    });

  // This fetch will return all the locations across every game where the submitted Pokemon can be found

  fetch(`https://pokeapi.co/api/v2/pokemon/${choice}/encounters`)
    .then((res) => res.json())
    .then((data) => {
      data.filter((x) => {
        const typeLi = document.createElement("li");

        typeLi.textContent = x.location_area.name;

        document.querySelector(".locations-heading").innerText = "Location(s)";
        document.querySelector(".locations").appendChild(typeLi);
      });
    });
}

document.querySelector(".reset").addEventListener("click", refresh);

function refresh() {
  location.reload();
}

function capitalizeName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function weightToPounds(w) {
  return Math.round((w / 4.536) * 100) / 100;
}

function heightToFeet(h) {
  return Math.round((h / 3.048) * 100) / 100;
}

function capitalizeTypes(types) {
  return types.charAt(0).toUpperCase() + types.slice(1);
}
