document.querySelector("button").addEventListener("click", search);

function search() {
  const choice = document.querySelector("input").value.toLowerCase();

  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      document.querySelector("img").src =
        data.sprites.other["official-artwork"].front_default;
      document.querySelector("h3").innerText = data.name;
      document.querySelector(".height").innerText =
        "Height/Length:" + " " + heightToFeet(data.height) + " " + "feet";
      document.querySelector(".weight").innerText =
        "Weight:" + " " + weightToPounds(data.weight) + " " + "pounds";
      //   data.types.forEach((obj) => console.log(obj.type.name));
      data.types.forEach((obj) => {
        // console.log(obj.type.name);
        const pokeType = "Types";
        const li = document.createElement("li");

        li.textContent = obj.type.name;

        document.querySelector(".types").appendChild(li);
      });
    });

  fetch(`https://pokeapi.co/api/v2/pokemon/${choice}/encounters`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);

      //   data.filter((x) => console.log(x.location_area.name));

      data.filter((x) => {
        const typeLi = document.createElement("li");

        typeLi.textContent = x.location_area.name;
        document.querySelector(".locations").appendChild(typeLi);
      });
    });
}

document.querySelector(".reset").addEventListener("click", refresh);

function refresh() {
  location.reload();
}

function weightToPounds(w) {
  return Math.round((w / 4.536) * 100) / 100;
}

function heightToFeet(h) {
  return Math.round((h / 3.048) * 100) / 100;
}
