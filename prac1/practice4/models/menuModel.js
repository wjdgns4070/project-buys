// models/menuModel.js
const menuItems = [
    {
      name: '감자탕',
      imageFileName: 'gamjatang.jpg', 
      description: '맛있는 감자탕입니다.',
    },
    // 다른 메뉴 아이템들...
  ];
  
  function getMenuItems() {
    return menuItems;
  }
  
  module.exports = { getMenuItems };
  