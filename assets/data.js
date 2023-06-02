const productsData = [
  {
    id: 1,
    name: "Remera Happy Tabacky",
    description: "Talles: XL X L S ",
    price: "4800",
    image: "./assets/img/remeraHongos--front.png",
    category: "remeras",
  },
  {
    id: 2,
    name: "Remera Happy Tabacky",
    description: "Talles: XL X L S ",
    price: "4800",
    image: "./assets/img/remeraHongos--back.png",
    category: "remeras",
  },
  {
    id: 3,
    name: "Remera Crazy Band",
    description: "Talles: XL X L S ",
    price: "4800",
    image: "./assets/img/remeraCrazy--front.jpg",
    category: "remeras",
  },
  {
    id: 4,
    name: "Remera Crazy Band",
    description: "Talles: XL X L S ",
    price: "4800",
    image: "./assets/img/remeraCrazy--back.jpg",
    category: "remeras",
  },
  {
    id: 5,
    name: "Remera CocoAk47",
    description: "Talles: XL X L S ",
    price: "4800",
    image: "./assets/img/remera--mari1.png",
    category: "remeras",
  },
  {
    id: 6,
    name: "Remera CocoAk47",
    description: "Talles: XL X L S ",
    price: "4800",
    image: "./assets/img/remera--mari3.png",
    category: "remeras",
  },
  {
    id: 7,
    name: "Buzo CocoAk47",
    description: "Talles: XL X L S ",
    price: "8999",
    image: "./assets/img/buzo-cocoak42.png",
    category: "buzos",
  },
  {
    id: 8,
    name: "Buzo CrazyBand",
    description: "Talles: XL X L S ",
    price: "8999",
    image: "./assets/img/buzo-logo.png",
    category: "buzos",
  },
  {
    id: 9,
    name: "Buzo PatoKnive",
    description: "Talles: XL X L S ",
    price: "8999",
    image: "./assets/img/buzo-pato.png",
    category: "buzos",
  },
  {
    id: 10,
    name: "Pantalon CocoAk47",
    description: "TALLES: XL X L S ",
    price: "7799",
    image: "./assets/img/pantalon-cocoak47.png",
    category: "pantalones",
  },
  {
    id: 11,
    name: "Pantalon PatoKnive",
    description: "TALLES: XL X L S ",
    price: "7799",
    image: "./assets/img/pantalon-pato.png",
    category: "pantalones",
  },
  {
    id: 12,
    name: "Conjunto PatoKnive",
    description: "TALLES: XL X L S ",
    price: "14500",
    image: "./assets/img/conjunto--pato.png",
    category: "conjunto",
  },
  {
    id: 13,
    name: "Conjunto CocoCrazyBand",
    description: "TALLES: XL X L S ",
    price: "14500",
    image: "./assets/img/conjunto--cocoylogo.png",
    category: "conjunto",
  },
];

const divideProductsInparts = (size) => {
  let productsList = [];
  for (let i = 0; i < productsData.length; i += size) {
    productsList.push(productsData.slice(i, i + size));
  }
  return productsList;
};

const appState = {
  products: divideProductsInparts(4),
  currentProductsIndex: 0,
  currentLimitProducts: divideProductsInparts(4).length,
  activeFilter: null,
};
