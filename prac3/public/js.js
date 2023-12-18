// js.js 파일의 내용
document.addEventListener("DOMContentLoaded", function () {

    const cartButton = document.createElement('button');
    cartButton.textContent = '장바구니 확인';
    cartButton.style.backgroundColor = '#4CAF50';
    cartButton.style.color = 'white';
    cartButton.style.padding = '15px 30px';  
    cartButton.style.border = 'none';
    cartButton.style.borderRadius = '20px';  //
    cartButton.style.cursor = 'pointer';

    // 사이드바 하단 가운데에 위치시키기
    cartButton.style.position = 'fixed';
    cartButton.style.bottom = '10px';
    cartButton.style.left = '85%';
    cartButton.style.transform = 'translateX(-50%)';
    cartButton.style.zIndex = '100'

    cartButton.addEventListener('click', showCart);
    document.body.appendChild(cartButton);

    const menuButtons = document.querySelectorAll('.menu-button');

    menuButtons.forEach(menuButton => {
        menuButton.addEventListener('click', function () {
            const itemId = this.parentElement.querySelector('.menu-image').dataset.id;
            const itemName = this.parentElement.querySelector('.menu-image').dataset.item;
            const itemPrice = this.parentElement.querySelector('.menu-image').dataset.price;

            addToCart(itemId, itemName, itemPrice);
        });
    });

    function addToCart(itemId, itemName, itemPrice) {
        const existingCart = JSON.parse(getCookie('cart') || '[]');
        existingCart.push({ id: itemId, name: itemName, price: parseFloat(itemPrice) });

        document.cookie = `cart=${JSON.stringify(existingCart)}; path=/`;
        console.log('cart cookie after addToCart:', document.cookie);

        alert('장바구니에 추가되었습니다!');
    }

    // 클라이언트 측 코드
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});
