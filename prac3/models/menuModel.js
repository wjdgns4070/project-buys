// models/menuModel.js

const menuItems = [
    { id: '1', name: '페퍼로니 피자', price: 15000 },
    { id: '2', name: '하와이안 피자', price: 17000 },
    { id: '3', name: '불고기 피자', price: 15000 },
    { id: '4', name: '통새우 피자', price: 17000 },
    { id: '5', name: '치즈 피자', price: 13000 },
    { id: '6', name: '스윗포테이토 피자', price: 15000 },
    { id: '7', name: '맥앤치즈 스파게티', price: 7000 },
    { id: '8', name: '치즈오븐 스파게티', price: 7000 },
    { id: '9', name: '핫윙 5개', price: 4000 },
    { id: '10', name: '핫봉 5개', price: 4000 },
    { id: '11', name: '치즈볼 6개', price: 4000 },
    { id: '12', name: '오븐치즈감자', price: 6000 },
    { id: '13', name: '코카콜라제로', price: 3000 },
    { id: '14', name: '클라우드 맥주', price: 5000 },
    { id: '15', name: '아사히 맥주', price: 5000 },
    { id: '16', name: 'kgb 맥주', price: 5000 },
    { id: '17', name: '크루저 맥주', price: 5000 },
    { id: '18', name: '샐러드', price: 8000 },
    { id: '19', name: '샐러드', price: 8000 },
    { id: '20', name: '샐러드', price: 8000 },
    { id: '21', name: '샐러드', price: 8000 },
    { id: '22', name: '샐러드', price: 8000 },
    { id: '23', name: '샐러드', price: 8000 },


];

function getMenuItems() {
    return menuItems;
}

module.exports = {
    getMenuItems,
};
