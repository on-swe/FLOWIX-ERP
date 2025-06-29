-- Seed data for development and testing

-- Insert sample tenant
INSERT INTO tenants (id, name, domain, settings) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Acme Corporation', 'acme.com', 
 '{"currency": "USD", "timezone": "UTC", "language": "en", "fiscalYearStart": "January"}');

-- Insert sample users
INSERT INTO users (id, tenant_id, email, password_hash, name, role, permissions) VALUES 
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 
 'admin@acme.com', '$2b$10$hash', 'John Admin', 'admin', 
 ARRAY['inventory.read', 'inventory.write', 'users.manage', 'settings.manage']),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 
 'manager@acme.com', '$2b$10$hash', 'Jane Manager', 'manager', 
 ARRAY['inventory.read', 'inventory.write', 'sales.read', 'sales.write']);

-- Insert sample product categories and products
INSERT INTO products (id, tenant_id, sku, name, description, category, price, cost, stock, min_stock, unit) VALUES 
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 
 'SKU-001', 'Wireless Bluetooth Headphones', 'High-quality wireless headphones with noise cancellation', 
 'Electronics', 99.99, 45.00, 45, 10, 'pcs'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 
 'SKU-002', 'Ergonomic Office Chair', 'Comfortable office chair with lumbar support', 
 'Furniture', 299.99, 150.00, 8, 5, 'pcs'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', 
 'SKU-003', 'Stainless Steel Water Bottle', 'Insulated water bottle, 32oz capacity', 
 'Accessories', 24.99, 12.00, 0, 20, 'pcs'),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440000', 
 'SKU-004', 'Laptop Stand Adjustable', 'Aluminum laptop stand with adjustable height', 
 'Electronics', 79.99, 35.00, 32, 15, 'pcs');

-- Insert sample inventory transactions
INSERT INTO inventory_transactions (tenant_id, product_id, type, quantity, reason, user_id) VALUES 
('550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440010', 
 'in', 50, 'Initial stock', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440010', 
 'out', 5, 'Sale order #001', '550e8400-e29b-41d4-a716-446655440002');
