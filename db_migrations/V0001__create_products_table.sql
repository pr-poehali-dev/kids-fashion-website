CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image_url TEXT,
    age_range VARCHAR(20) NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('boy', 'girl', 'unisex')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_age_range ON products(age_range);
CREATE INDEX idx_products_gender ON products(gender);

INSERT INTO products (name, price, image_url, age_range, gender) VALUES
('Хлопковый комбинезон', 2499, '/placeholder.svg', '0-12', 'unisex'),
('Платье с рюшами', 3299, '/placeholder.svg', '1-3', 'girl'),
('Спортивный костюм', 4199, '/placeholder.svg', '4-6', 'boy'),
('Джинсовая куртка', 5499, '/placeholder.svg', '7-10', 'unisex'),
('Летний сарафан', 2899, '/placeholder.svg', '4-6', 'girl'),
('Толстовка с капюшоном', 3499, '/placeholder.svg', '7-10', 'boy');