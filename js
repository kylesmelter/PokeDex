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
      document.querySelector(".height").innerText = data.height;
      document.querySelector(".weight").innerText = data.weight;
      //   data.types.forEach((obj) => console.log(obj.type.name));
      data.types.forEach((obj) => {
        // console.log(obj.type.name);

        const li = document.createElement("li");

        li.textContent = obj.type.name;

        document.querySelector(".types").appendChild(li);
      });
    });

  fetch(`https://pokeapi.co/api/v2/pokemon/${choice}/encounters`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);

      data.filter((x) => console.log(x.location_area.name));
    });
}

document.querySelector(".reset").addEventListener("click", refresh);

function refresh() {
  location.reload();
}
