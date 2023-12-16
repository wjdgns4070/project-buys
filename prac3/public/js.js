document.addEventListener("DOMContentLoaded", function () {
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

    // 장바구니 확인 버튼 추가
    const cartButton = document.createElement('button');
    cartButton.textContent = '장바구니 확인';
    cartButton.addEventListener('click', showCart);
    document.body.appendChild(cartButton);

    function showCart() {
        const cartCookie = document.cookie.split('; ')
            .find(cookie => cookie.startsWith('cart='));

        if (!cartCookie) {
            alert('장바구니가 비어 있습니다.');
            return;
        }

        const decodedCartValue = decodeURIComponent(cartCookie.split('=')[1]);
        const cartItems = JSON.parse(decodedCartValue);

        const totalAmount = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

        const popupContent = cartItems.map(item => `${item.name} - $${parseFloat(item.price).toFixed(2)}`).join('<br>');
        const popupHTML = `
            <div>
                <h2>장바구니 내역</h2>
                <p>${popupContent}</p>
                <hr>
                <p><strong>총 금액:</strong> $${totalAmount.toFixed(2)}</p>
            </div>
        `;

        const popup = window.open('', 'cartPopup', 'width=400,height=400');
        popup.document.body.innerHTML = popupHTML;

        // "구매하기" 버튼 추가
        const purchaseButton = document.createElement('button');
        purchaseButton.textContent = '구매하기';
        purchaseButton.addEventListener('click', purchaseItems);
        popup.document.body.appendChild(purchaseButton);
    }

    // 클라이언트 측 코드
function purchaseItems() {
    const cartCookie = document.cookie.split('; ')
        .find(cookie => cookie.startsWith('cart='));

    if (!cartCookie) {
        alert('장바구니가 비어 있습니다.');
        return;
    }

    const decodedCartValue = decodeURIComponent(cartCookie.split('=')[1]);
    const cartItems = JSON.parse(decodedCartValue);

    // 배열로 감싸서 서버로 전송
    axios.post('/purchase', cartItems)
        .then(response => {
            console.log('Purchase successful:', response.data);

            // 구매가 완료되면 쿠키 초기화
            document.cookie = 'cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

            // 팝업 창 닫기
            window.location.reload();
        })
        .catch(error => {
            console.error('Purchase error:', error);
            alert('구매 중 오류가 발생했습니다.');
        });
}


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});
