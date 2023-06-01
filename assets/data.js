const productsData = [
  {
    id: 2,
    name: "Remera CocoAk47",
    description: "Talles: XL X L S ",
    price: "1600",
    image: "./assets/img/remera--mari1.png",
    category: "remeras",
  },
  {
    id: 15,
    name: "Remera CocoAk47",
    description: "Talles: XL X L S ",
    price: "1600",
    image: "./assets/img/remera--mari3.png",
    category: "remeras",
  },
  {
    id: 14,
    name: "Remera Crazy Band",
    description: "Talles: XL X L S ",
    price: "1800",
    image: "./assets/img/remeraCrazy--front.jpg",
    category: "remeras",
  },
  {
    id: 16,
    name: "Remera Crazy Band",
    description: "Talles: XL X L S ",
    price: "1800",
    image: "./assets/img/remeraCrazy--back.jpg",
    category: "remeras",
  },
  {
    id: 1,
    name: "Pantalon cargo",
    description: "Confeccionadas en gamuza",
    price: "240.00",
    image: "./assets/img/cargo1.png",
    category: "pantalones",
  },
  {
    id: 3,
    name: "Pantalon jean",
    description: "Jean azul elastizado",
    price: "22000",
    image: "./assets/img/jean1.png",
    category: "pantalones",
  },
  {
    id: 4,
    name: "Bermuda gabardina",
    description: "Bermuda verde olivo",
    price: "26000",
    image: "./assets/img/bermuda1.png",
    category: "bermudas",
  },
  {
    id: 5,
    name: "Bermuda jean",
    description: "Bermuda turqueza",
    price: "45000",
    image: "./assets/img/bermuda2.png",
    category: "bermudas",
  },
  {
    id: 6,
    name: "Bermuda buzo",
    description: "Bermuda gris deportiva",
    price: "25000",
    image: "./assets/img/bermuda3.png",
    category: "bermudas",
  },
  {
    id: 7,
    name: "Bermuda gabardina",
    description: "Bermuda gris oscura",
    price: "24000",
    image: "./assets/img/bermuda4.png",
    category: "bermudas",
  },
  {
    id: 8,
    name: "Pantalon jogger",
    description: "Jogger verde elastizado",
    price: "23000",
    image: "./assets/img/pantalon3.png",
    category: "pantalones",
  },
  {
    id: 9,
    name: "Pantalon de vestir",
    description: "Pantalon de vestir negro",
    price: "33000",
    image: "./assets/img/pantalon4.png",
    category: "pantalones",
  },
  {
    id: 10,
    name: "Zapatilla new balance",
    description: "New balance gris",
    price: "333000",
    image: "./assets/img/calzado1.png",
    category: "calzados",
  },
  {
    id: 11,
    name: "Zapatilla nike",
    description: "Nike roja",
    price: "321000",
    image: "./assets/img/calzado2.png",
    category: "calzados",
  },
  {
    id: 12,
    name: "Zapatilla converse",
    description: "Converse negras",
    price: "233000",
    image: "./assets/img/calzado3.webp",
    category: "calzados",
  },
  {
    id: 13,
    name: "Zapatilla adidas",
    description: "Adidas con aire color beige",
    price: "413000",
    image: "./assets/img/calzado4.png",
    category: "calzados",
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
