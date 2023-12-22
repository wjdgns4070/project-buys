document.addEventListener("DOMContentLoaded", function () {
    // 장바구니 확인 버튼 생성
    const cartButton = document.createElement('button');
    cartButton.textContent = '장바구니 확인';
    cartButton.style.backgroundColor = '#4CAF50';
    cartButton.style.color = 'white';
    cartButton.style.padding = '15px 30px';
    cartButton.style.border = 'none';
    cartButton.style.borderRadius = '20px';
    cartButton.style.cursor = 'pointer';
    cartButton.style.position = 'fixed';
    cartButton.style.bottom = '10px';
    cartButton.style.left = '85%';
    cartButton.style.transform = 'translateX(-50%)';
    cartButton.style.zIndex = '100';
    cartButton.addEventListener('click', showCart);
    document.body.appendChild(cartButton);

    // 동적으로 생성된 동그라미에 대한 참조
    const dynamicCartIndicator = createDynamicCartIndicator();

    // 각 메뉴 버튼에 이벤트 리스너 추가
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(menuButton => {
        menuButton.addEventListener('click', function () {
            const itemId = this.parentElement.querySelector('.menu-image').dataset.id;
            const itemName = this.parentElement.querySelector('.menu-image').dataset.item;
            const itemPrice = this.parentElement.querySelector('.menu-image').dataset.price;
            addToCart(itemId, itemName, itemPrice);
        });
    });

    // 장바구니에 상품 추가
    function addToCart(itemId, itemName, itemPrice) {
        // 쿠키 가져오기
        const existingCart = getCookie('cart');
        // 쿠키가 존재하면 파싱, 아니면 빈 배열
        const cartArray = existingCart ? JSON.parse(existingCart) : [];
        // 아이템 추가
        cartArray.push({ id: itemId, name: itemName, price: parseFloat(itemPrice) });
        // 쿠키에 저장
        document.cookie = `cart=${JSON.stringify(cartArray)}; path=/`;
        console.log('cart cookie after addToCart:', document.cookie);
        updateDynamicCartIndicator(); // 동그라미 업데이트
        alert('장바구니에 추가되었습니다!');
    }

    // 클라이언트 측 코드
    function getCookie(name) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const value = `; ${decodedCookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function createDynamicCartIndicator() {
        const dynamicCartIndicator = document.createElement('div');
        dynamicCartIndicator.id = 'dynamic-cart-indicator';
        dynamicCartIndicator.style.backgroundColor = 'blue'; // 동그라미의 배경색을 파란색으로 설정
        dynamicCartIndicator.style.color = 'white'; // 동그라미 안의 텍스트 색상
        dynamicCartIndicator.style.borderRadius = '50%'; // 동그라미를 동그랗게 만들기
        dynamicCartIndicator.style.padding = '5px 10px'; // 동그라미 안의 텍스트와 경계 사이의 간격
        dynamicCartIndicator.style.position = 'fixed';
        dynamicCartIndicator.style.bottom = '10px'; // 동적 동그라미 위치 조절 (예시로 아래에 배치)
        dynamicCartIndicator.style.right = '80px';
        dynamicCartIndicator.style.zIndex = '100';
        dynamicCartIndicator.style.display = 'none'; // 초기에는 보이지 않도록 설정

        // 동그라미를 body에 추가
        document.body.appendChild(dynamicCartIndicator);

        return dynamicCartIndicator;
    }

    function updateDynamicCartIndicator() {
        const cartCookie = document.cookie.split('; ')
            .find(cookie => cookie.startsWith('cart='));

        if (!cartCookie) {
            // 장바구니가 비어 있으면 동그라미 숨김
            dynamicCartIndicator.style.display = 'none';
            return;
        }

        const decodedCartValue = decodeURIComponent(cartCookie.split('=')[1]);
        const cartItems = JSON.parse(decodedCartValue);

        // 현재 장바구니에 담긴 상품의 개수를 가져옴
        const cartCount = cartItems.length;

        // 동그라미 안에 개수를 표시
        dynamicCartIndicator.textContent = cartCount;

        // 동그라미 표시
        dynamicCartIndicator.style.display = 'block';
    }

    // 초기 로딩 시 동적 동그라미 업데이트
    updateDynamicCartIndicator();

    const mycoinAmountElement = document.getElementById('mycoinAmount');
    const mycoinCookie = getCookie('mycoin');
    const initialMycoin = mycoinCookie ? parseFloat(mycoinCookie) : 0;
    mycoinAmountElement.textContent = initialMycoin.toFixed(0);
    
    
});