// models/menuModel.js

const menuItems = [
    { id: '1', name: '피자', price: 21000 },
    { id: '2', name: '햄버거', price: 18000 },
    { id: '3', name: '샐러드', price: 8000 },
];

function getMenuItems() {
    return menuItems;
}

module.exports = {
    getMenuItems,
};
