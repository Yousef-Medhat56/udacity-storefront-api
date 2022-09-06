-- Join table between products and orders
CREATE TABLE products_orders(
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    PRIMARY KEY(order_id,product_id)
);