import {useState} from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import ShoppingCart from '../components/ShoppingCart';

function ProductsPage({cart, sortBy, setSortBy, addToCart, sortedProducts}) {
    return (
        <div>
            <h1>Products Page</h1>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <div>
                    <label htmlFor="sort-select" style={{marginRight: '10px'}}>Sort by:</label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{padding: '5px'}}
                    >
                        <option value="default">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name</option>
                    </select>
                </div>

                <div>
                    <strong>Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</strong>
                </div>
            </div>

            <div style={{display: 'flex', gap: '30px'}}>
                {/* Products listing */}
                <div style={{flex: '1', display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
                    {sortedProducts.map(product => (
                        <Card
                            key={product.id}
                            title={product.title}
                            description={`${product.description} - $${product.price}`}
                            imageUrl={product.imageUrl}
                            actions={[
                                {
                                    label: `Add to Cart ($${product.price})`,
                                    onClick: () => addToCart(product),
                                    variant: product.stock > 0 ? 'primary' : 'secondary',
                                    disabled: product.stock <= 0
                                }
                            ]}
                        >
                            <p>In stock: {product.stock}</p>
                        </Card>
                    ))}
                </div>

                {/*<ShoppingCart/>*/}
                {/* Cart sidebar */}
                {/*<div style={{*/}
                {/*    width: '300px',*/}
                {/*    padding: '15px',*/}
                {/*    backgroundColor: '#f8f9fa',*/}
                {/*    borderRadius: '8px',*/}
                {/*    alignSelf: 'flex-start'*/}
                {/*}}>*/}
                {/*    <h3>Shopping Cart</h3>*/}

                {/*    {cart.length === 0 ? (*/}
                {/*        <p>Your cart is empty</p>*/}
                {/*    ) : (*/}
                {/*        <>*/}
                {/*            <ul style={{padding: 0, listStyle: 'none'}}>*/}
                {/*                {cart.map(item => (*/}
                {/*                    <li key={item.id} style={{*/}
                {/*                        display: 'flex',*/}
                {/*                        justifyContent: 'space-between',*/}
                {/*                        alignItems: 'center',*/}
                {/*                        padding: '8px 0',*/}
                {/*                        borderBottom: '1px solid #ddd'*/}
                {/*                    }}>*/}
                {/*                        <div>*/}
                {/*                            <strong>{item.title}</strong> × {item.quantity}*/}
                {/*                            <div>${item.price * item.quantity}</div>*/}
                {/*                        </div>*/}
                {/*                        <Button*/}
                {/*                            onClick={() => removeFromCart(item.id)}*/}
                {/*                            variant="danger"*/}
                {/*                        >*/}
                {/*                            −*/}
                {/*                        </Button>*/}
                {/*                    </li>*/}
                {/*                ))}*/}
                {/*            </ul>*/}

                {/*            <div style={{*/}
                {/*                marginTop: '15px',*/}
                {/*                padding: '10px 0',*/}
                {/*                borderTop: '2px solid #ddd',*/}
                {/*                display: 'flex',*/}
                {/*                justifyContent: 'space-between'*/}
                {/*            }}>*/}
                {/*                <strong>Total:</strong>*/}
                {/*                <strong>${totalPrice}</strong>*/}
                {/*            </div>*/}

                {/*            <Button*/}
                {/*                onClick={() => alert(`Checkout completed for $${totalPrice}!`)}*/}
                {/*                variant="success"*/}
                {/*                style={{width: '100%', marginTop: '10px'}}*/}
                {/*            >*/}
                {/*                Checkout*/}
                {/*            </Button>*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default ProductsPage;