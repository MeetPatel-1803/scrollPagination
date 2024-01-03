const itemContainer = document.getElementById("itemContainer");
const loader = document.getElementById("loader");

const totalPages = 100;
const itemsPerLoad = 20;
let currentPage = 1;
let flag = 0;
const pageCount = Math.ceil(totalPages / itemsPerLoad);

const appendItemCard = (index) => {
  const itemCard = document.createElement("div");
  itemCard.setAttribute("id", index);
  itemCard.className = "card";
  itemCard.innerHTML = `item ${index}`;
  itemContainer.appendChild(itemCard);
};

const createItemCard = (page) => {
  if (page > 0) {
    currentPage = page;
    const start = (page - 1) * itemsPerLoad;
    const end = currentPage == pageCount ? totalPages : page * itemsPerLoad;
    for (let i = start + 1; i <= end; i++) {
      appendItemCard(i);
    }
  }
};

const loaderFunction = () => {
  loader.style.display = "block";
  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
};

const removeItemCard = () => {
  const temp = itemContainer.querySelectorAll(".card");
  let itemsToRemove = temp.length - itemsPerLoad;
  if (itemsToRemove === 0 && flag == 1) {
    itemsToRemove = 20;
  }
  for (let i = 0; i < itemsToRemove; i++) {
    temp[i].remove();
  }
};

const handleEndOfPage = () => {
  const endOfPage =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;

  if (endOfPage) {
    loaderFunction();
    createItemCard(currentPage + 1);
  }

  if (currentPage === pageCount) {
    window.removeEventListener("scroll", handleEndOfPage);
  }
};

window.addEventListener("load", () => {
  createItemCard(currentPage);
});

window.addEventListener("scroll", handleEndOfPage);
window.addEventListener("scroll", () => {
  if (window.innerHeight < window.scrollY) {
    removeItemCard();
  }
});

window.addEventListener("scroll", () => {
  if (window.scrollY === 1) {
    flag = 1;
    removeItemCard();
    currentPage > 1 ? createItemCard(currentPage - 1) : createItemCard(1);
    flag = 0;
    window.addEventListener("scroll", handleEndOfPage);
  }
});
