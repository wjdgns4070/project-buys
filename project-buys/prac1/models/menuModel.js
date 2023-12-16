// models/menuModel.js
const menuItems = [
  { name: 'Item 1', price: 10 },
  { name: 'Item 2', price: 15 },
  // 추가적인 메뉴 아이템들...
];

function getMenuItems() {
  return menuItems;
}

module.exports = {
  getMenuItems,
};
