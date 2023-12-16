document.addEventListener("DOMContentLoaded", function () {
    // "장바구니 확인" 버튼 추가
    const cartButton = document.createElement('button');
    cartButton.textContent = '장바구니 확인';
    cartButton.addEventListener('click', showCart);
    document.body.appendChild(cartButton);

    // "구매하기" 버튼 추가
    const purchaseButton = document.createElement('button');
    purchaseButton.textContent = '구매하기';
    purchaseButton.addEventListener('click', purchaseItems);

    // 이미지 버튼 클릭 이벤트 처리
    const menuButtons = document.querySelectorAll('.menu-button');

    menuButtons.forEach(menuButton => {
        menuButton.addEventListener('click', function () {
            // data-* 속성을 통해 메뉴 정보 받아오기
            const itemId = this.parentElement.querySelector('.menu-image').dataset.id;
            const itemName = this.parentElement.querySelector('.menu-image').dataset.item;
            const itemPrice = this.parentElement.querySelector('.menu-image').dataset.price;

            // addToCart 함수 호출
            addToCart(itemId, itemName, itemPrice);
        });
    });

    // 장바구니에 추가 함수
    function addToCart(itemId, itemName, itemPrice) {
        // 쿠키에서 장바구니 정보 가져오기
        const cartCookie = document.cookie.split('; ')
            .find(cookie => cookie.startsWith('cart='));

        let cartItems = [];

        if (cartCookie) {
            // 쿠키 값에서 JSON 파싱 (URL 디코딩 추가)
            const decodedCartValue = decodeURIComponent(cartCookie.split('=')[1]);
            cartItems = JSON.parse(decodedCartValue);
        }

        // 객체를 생성하여 장바구니 배열에 추가
        const selectedItem = { id: itemId, name: itemName, price: parseFloat(itemPrice) };
        cartItems.push(selectedItem);

        // 쿠키에 저장
        document.cookie = `cart=${JSON.stringify(cartItems)}; path=/`;

        // 디버깅을 위한 로그 추가
        console.log('cart cookie after addToCart:', document.cookie);

        alert('장바구니에 추가되었습니다!');
    }

    // 장바구니 확인 함수
    function showCart() {
        // 쿠키에서 장바구니 정보 가져오기
        const cartCookie = document.cookie.split('; ')
            .find(cookie => cookie.startsWith('cart='));

        if (!cartCookie) {
            alert('장바구니가 비어 있습니다.');
            return;
        }

        // 쿠키 값에서 JSON 파싱 (URL 디코딩 추가)
        const decodedCartValue = decodeURIComponent(cartCookie.split('=')[1]);
        const cartItems = JSON.parse(decodedCartValue);

        // 총 금액 계산
        const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

        // 팝업 창에 내용 표시
        const popupContent = cartItems.map(item => `${item.name} - $${item.price}`).join('<br>');
        const popupHTML = `
            <div>
                <h2>장바구니 내역</h2>
                <p>${popupContent}</p>
                <hr>
                <p><strong>총 금액:</strong> $${totalAmount.toFixed(2)}</p>
                <button id="purchaseBtn">구매하기</button>
            </div>
        `;

        // 팝업 창 열기
        const popup = window.open('', 'cartPopup', 'width=400,height=400');
        popup.document.body.innerHTML = popupHTML;

        // "구매하기" 버튼 추가
        const purchaseBtn = popup.document.getElementById('purchaseBtn');
        purchaseBtn.addEventListener('click', purchaseItems);
    }

    // 구매하기 함수
    function purchaseItems() {
        // 쿠키에서 장바구니 정보 가져오기
        const cartCookie = document.cookie.split('; ')
            .find(cookie => cookie.startsWith('cart='));

        if (!cartCookie) {
            alert('장바구니가 비어 있습니다.');
            return;
        }

        // 쿠키 값에서 JSON 파싱 (URL 디코딩 추가)
        const decodedCartValue = decodeURIComponent(cartCookie.split('=')[1]);
        const cartItems = JSON.parse(decodedCartValue);

        // AJAX를 사용하여 서버로 데이터 전송
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/purchase'); // '/purchase'는 서버 측의 해당 엔드포인트로 맞춰야 합니다.
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200) {
                alert('구매가 완료되었습니다!');
                
                // 구매가 완료되면 쿠키 초기화
                document.cookie = 'cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

                // 팝업 창 닫기
                window.location.reload();
            } else {
                alert('구매 중 오류가 발생했습니다.');
            }
        };

        xhr.send(JSON.stringify(cartItems));
    }
});
