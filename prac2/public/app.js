// public/app.js
document.addEventListener("DOMContentLoaded", function () {
    // 메뉴 항목 동적으로 생성
    const menuList = document.getElementById('menu-list');

    const menuItems = [
        { id: 1, name: '피자', price: 10 },
        { id: 2, name: '햄버거', price: 5 },
        { id: 3, name: '샐러드', price: 8 },
    ];

    menuItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" id="item${item.id}" name="menu-item" value="${item.name}" data-price="${item.price}">
            <label for="item${item.id}">${item.name} - $${item.price}</label>
        `;
        menuList.appendChild(listItem);
    });
});

function addToCart() {
    const selectedItems = [];

    // 체크된 메뉴 아이템 찾기
    const checkboxes = document.querySelectorAll('input[name="menu-item"]:checked');

    checkboxes.forEach(checkbox => {
        const itemName = checkbox.value;
        const itemPrice = parseFloat(checkbox.getAttribute('data-price'));
        selectedItems.push({ name: itemName, price: itemPrice });
    });

    // 선택한 항목을 쿠키에 저장
    document.cookie = `cart=${JSON.stringify(selectedItems)}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;

    alert('장바구니에 추가되었습니다!');
}
