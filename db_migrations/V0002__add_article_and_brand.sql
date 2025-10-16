ALTER TABLE products ADD COLUMN article VARCHAR(50);
ALTER TABLE products ADD COLUMN brand VARCHAR(100);

CREATE SEQUENCE IF NOT EXISTS product_article_seq START WITH 1000;

UPDATE products SET article = 'BK' || LPAD(CAST(id + 999 AS VARCHAR), 4, '0') WHERE article IS NULL;

ALTER TABLE products ALTER COLUMN article SET NOT NULL;
ALTER TABLE products ADD CONSTRAINT unique_article UNIQUE (article);

CREATE INDEX idx_products_brand ON products(brand);