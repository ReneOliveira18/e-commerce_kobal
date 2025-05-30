document.addEventListener('DOMContentLoaded', () => {
    //VERIFICAÇÃO IDADE
    
    /*const isAdult = confirm('Você tem 18 anos?');
    if (!isAdult) {
        alert('Seja Bem-Vindo(a) a Kobal Arguiles');
        window.location.href = 'https://www.google.com'; // Redireciona para o Google
        return;
    }*/
   
    //Obtenha as referências aos elementos do modal
    const customAlert = document.getElementById('myCustomAlert');
    const closeButton = document.querySelector('#myCustomAlert .close-button');
    const alertOkButton = document.getElementById('alertOkButton');
    
        // Funções para mostrar e esconder o alerta
    function showAlert(message, title = 'Atenção!') {
        customAlert.style.display = 'flex'; // Exibe o overlay (que já tem display flex para centralizar)
        document.querySelector('.custom-alert-content h2').textContent = title; // Atualiza o título
        document.querySelector('.custom-alert-content p').textContent = message; // Atualiza a mensagem
        document.body.classList.add('no-scroll'); // Adiciona classe para evitar rolagem da página
    }

    function hideAlert() {
        customAlert.style.display = 'none'; // Esconde o overlay
        document.body.classList.remove('no-scroll'); // Remove a classe para habilitar rolagem
    }

    // Adiciona ouvintes de evento para fechar o alerta
    closeButton.addEventListener('click', hideAlert);
    alertOkButton.addEventListener('click', hideAlert);
    
        customAlert.addEventListener('click', (event) => {
        if (event.target === customAlert) { // Se o clique foi no overlay e não no conteúdo
            hideAlert();
        }
    });

     function checkout() {
        if (cart.length === 0) {
            showAlert('Seu carrinho está vazio. Adicione produtos antes de finalizar a compra!', 'Carrinho Vazio');
            return;
        }
        const confirmation = confirm(`Total da compra: R$ ${cartTotalSpan.textContent}\n\nDeseja finalizar a compra?`);
        if (confirmation) {
            showAlert('Compra finalizada com sucesso! Obrigado por comprar conosco.', 'Sucesso!');
            cart = [];
            updateCartUI();
        }
    }
    
    //Elementos HTML que vamos manipular
    const productListDiv = document.getElementById('product-list');
    const cartCountSpan = document.getElementById('cart-count');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const emptyCartMessage = document.getElementById('empty-cart-message');
        
    //Dados dos produtos (simulando um "banco de dados" de produtos)
    const products = [
        {
            id: 1,
            name: 'Essências Zomo',
            price: 11.90,
            image: 'assets/essencias-zomo.jpg' // Imagem de placeholder
        },
        {
            id: 2,
            name: 'Essências Urban',
            price: 9.90,
            image: 'assets/essencias-urban.jpg'
        },
        {
            id: 3,
            name: 'Essências Pimp',
            price: 12.90,
            image: 'assets/essencias-pimp.jpg'
        },
        {
            id: 4,
            name: 'Essência Volker',
            price: 10.00,
            image: 'assets/essencias-volker.jpg'
        },
        {
            id: 5,
            name: 'Carvão Power Coco',
            price: 39.90,
            image: 'assets/carvao-powercoco.jpg'
        },
        {
            id: 6,
            name: 'Arguile Amazon Colonial',
            price: 400.00,
            image: 'assets/arguile-colonial.jpg'
        },
                {
            id: 7,
            name: 'Arguile Mahalla Mini-Hype',
            price: 290.90,
            image: 'assets/arguile-mahalla.jpg'
        },
    ];

    //Array para o carrinho de compras (inicialmente vazio)
    let cart = [];

    //Função para renderizar (mostrar) os produtos na página
    function renderProducts() {
        productListDiv.innerHTML = '<h2>Nossos Produtos</h2>'; // Limpa e adiciona o título
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>R$ <span class="price">${product.price.toFixed(2)}</span></p>
                <button data-id="${product.id}">Adicionar ao Carrinho</button>
            `;
            productListDiv.appendChild(productDiv);
        });

        // Adiciona ouvintes de evento aos botões "Adicionar ao Carrinho"
        document.querySelectorAll('.product-item button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.id);
                addToCart(productId);
            });
        });
    }

    //Função para adicionar um produto ao carrinho
    function addToCart(productId) {
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            // Verifica se o produto já está no carrinho
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++; // Se sim, apenas aumenta a quantidade
            } else {
                cart.push({ ...productToAdd, quantity: 1 }); // Se não, adiciona com quantidade 1
            }
            updateCartUI(); // Atualiza a interface do carrinho
        }
    }

    //Função para remover um produto do carrinho
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    }

    //Função para atualizar a interface do carrinho (itens, contador e total)
    function updateCartUI() {
        // Atualiza o contador do carrinho no cabeçalho
        const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountSpan.textContent = totalItemsInCart;

        // Limpa os itens atuais no carrinho e os redesenha
        cartItemsDiv.innerHTML = ''; // Limpa o conteúdo
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block'; // Mostra a mensagem de carrinho vazio
        } else {
            emptyCartMessage.style.display = 'none'; // Esconde a mensagem
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <p>${item.name} (x${item.quantity})</p>
                        <p>R$ ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button data-id="${item.id}">Remover</button>
                    </div>
                `;
                cartItemsDiv.appendChild(cartItemDiv);
            });

            // Adiciona ouvintes de evento aos botões "Remover" do carrinho
            document.querySelectorAll('.cart-item-actions button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = parseInt(event.target.dataset.id);
                    removeFromCart(productId);
                });
            });
        }

        // Atualiza o total do carrinho
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalSpan.textContent = total.toFixed(2);
    }

    //Função para finalizar a compra
    function checkout() {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio. Adicione produtos antes de finalizar a compra!');
            return;
        }
        const confirmation = confirm(`Total da compra: R$ ${cartTotalSpan.textContent}\n\nDeseja finalizar a compra?`);
        if (confirmation) {
            alert('Compra finalizada com sucesso! Obrigado por comprar conosco.');
            cart = []; // Limpa o carrinho
            updateCartUI(); // Atualiza a interface
        }
    }

    //Event Listeners (Eventos que o JS "escuta")
    checkoutBtn.addEventListener('click', checkout); // Botão Finalizar Compra

    //Inicialização: Renderiza os produtos e atualiza o carrinho ao carregar a página
    renderProducts();
    updateCartUI(); // Para garantir que o contador e total estejam corretos no início
});