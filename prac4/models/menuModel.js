// models/menuModel.js
let menuItems = [
    { id: 1, name: '피자', price: 10, value: '피자' },
    { id: 2, name: '햄버거', price: 5, value: '햄버거' },
    { id: 3, name: '샐러드', price: 8, value: '샐러드' },
];

function getMenuItems() {
    return menuItems;
}

function setMenuItems(newMenuItems) {
    menuItems = newMenuItems;
}

module.exports = {
    getMenuItems,
    setMenuItems,
};
