import {useState} from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import ShoppingCart from "./components/ShoppingCart";

function App() {

    // Sample product data
    const initialProducts = [
        {
            id: 1,
            title: 'Smartphone',
            description: 'Latest model with advanced features',
            price: 699,
            stock: 15,
            imageUrl: 'https://via.placeholder.com/300x150?text=Smartphone'
        },
        {
            id: 2,
            title: 'Laptop',
            description: 'Powerful laptop for work and gaming',
            price: 1299,
            stock: 8,
            imageUrl: 'https://via.placeholder.com/300x150?text=Laptop'
        },
        {
            id: 3,
            title: 'Headphones',
            description: 'Noise-cancelling wireless headphones',
            price: 249,
            stock: 23,
            imageUrl: 'https://via.placeholder.com/300x150?text=Headphones'
        },
        {
            id: 4,
            title: 'Smartwatch',
            description: 'Fitness tracking and notifications',
            price: 199,
            stock: 12,
            imageUrl: 'https://via.placeholder.com/300x150?text=Smartwatch'
        }
    ];

    const [products, setProducts] = useState(initialProducts);
    const [cart, setCart] = useState([]);
    const [sortBy, setSortBy] = useState('default');

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        return a.id - b.id; // default sort by id
    });

    // Add product to cart
    const addToCart = (product) => {
        // Check if product has stock
        const productInState = products.find(p => p.id === product.id);
        if (productInState.stock <= 0) return;

        // Update stock
        setProducts(products.map(p =>
            p.id === product.id ? {...p, stock: p.stock - 1} : p
        ));

        // Add to cart
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id ? {...item, quantity: item.quantity + 1} : item
            ));
        } else {
            setCart([...cart, {...product, quantity: 1}]);
        }
    };

    // Remove product from cart
    const removeFromCart = (productId) => {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        // Update product stock
        setProducts(products.map(p =>
            p.id === productId ? {...p, stock: p.stock + 1} : p
        ));

        // Update cart
        if (item.quantity > 1) {
            setCart(cart.map(item =>
                item.id === productId ? {...item, quantity: item.quantity - 1} : item
            ));
        } else {
            setCart(cart.filter(item => item.id !== productId));
        }
    };

    // Calculate total price
    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    const [currentPage, setCurrentPage] = useState('home');// Simple navigation state management
    const handleNavigate = (pageId) => {
        setCurrentPage(pageId);// This could be expanded to handle page transition animations
// or to update browser history for back/forward navigation
    };// Render the appropriate page based on state
    const renderPage = () => {
        switch (currentPage) {
            case 'products':
                return <ProductsPage
                    cart={cart}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    addToCart={addToCart}
                    sortedProducts={sortedProducts}
                />;
            case 'profile':
                return <ProfilePage/>;
            case 'home':
            default:
                return <HomePage onNavigate={handleNavigate}/>;
        }
    };
    return (
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '20px'}}>
            <Header
                currentPage={currentPage}
                onNavigate={handleNavigate}
            />
            <main>
                {renderPage()}
                {currentPage === 'products' ?
                    <ShoppingCart cart={cart} removeFromCart={removeFromCart} totalPrice={totalPrice}/> :
                    (cart.length > 0 ?
                        <ShoppingCart cart={cart} removeFromCart={removeFromCart} totalPrice={totalPrice}/> : null)}

            </main>
            <footer style={{
                marginTop: '50px',
                padding: '20px',
                borderTop: '1px solid #eee',
                textAlign: 'center',
                color: '#666'
            }}>
                <p>React Multi-Page Application</p>
            </footer>
        </div>
    );
}

export default App