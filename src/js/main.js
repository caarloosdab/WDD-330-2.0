import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData("tents");
const element = document.querySelector('.product-list');

const ProductsList = new ProductsList("tents", dataSource, element);
ProductList.init();
