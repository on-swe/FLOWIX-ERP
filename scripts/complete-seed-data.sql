-- Complete seed data for all modules

-- Insert additional product categories
INSERT INTO product_categories (id, tenant_id, name, description) VALUES 
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440000', 'Electronics', 'Electronic devices and components'),
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440000', 'Furniture', 'Office and home furniture'),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440000', 'Accessories', 'Various accessories and supplies');

-- Insert customers
INSERT INTO customers (id, tenant_id, name, email, phone, company, status) VALUES 
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000', 
 'John Smith', 'john@acmecorp.com', '+1 (555) 123-4567', 'Acme Corp', 'active'),
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000', 
 'Sarah Johnson', 'sarah@techsolutions.com', '+1 (555) 987-6543', 'Tech Solutions Inc', 'active'),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440000', 
 'Mike Wilson', 'mike@globalent.com', '+1 (555) 456-7890', 'Global Enterprises', 'prospect');

-- Insert vendors
INSERT INTO vendors (id, tenant_id, name, contact_person, email, phone, category, rating, status) VALUES 
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440000', 
 'Tech Supplies Inc', 'John Manager', 'john@techsupplies.com', '+1 (555) 123-4567', 'Technology', 4.8, 'active'),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440000', 
 'Office Equipment Co', 'Sarah Wilson', 'sarah@officeequip.com', '+1 (555) 987-6543', 'Office Supplies', 4.5, 'active'),
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440000', 
 'Industrial Materials Ltd', 'Mike Davis', 'mike@industrial.com', '+1 (555) 456-7890', 'Manufacturing', 4.2, 'pending');

-- Insert departments
INSERT INTO departments (id, tenant_id, name, description, budget, location, status) VALUES 
('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440000', 
 'Engineering', 'Software development and technical operations', 2500000, 'Building A, Floor 3', 'active'),
('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440000', 
 'Sales & Marketing', 'Sales operations and marketing campaigns', 1800000, 'Building B, Floor 2', 'active'),
('550e8400-e29b-41d4-a716-446655440052', '550e8400-e29b-41d4-a716-446655440000', 
 'Human Resources', 'Employee relations and organizational development', 850000, 'Building A, Floor 1', 'active');

-- Insert employees
INSERT INTO employees (id, tenant_id, user_id, employee_id, department_id, position, salary, hire_date, status) VALUES 
('550e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440000', 
 '550e8400-e29b-41d4-a716-446655440001', 'EMP-001', '550e8400-e29b-41d4-a716-446655440050', 
 'Senior Developer', 95000, '2022-03-15', 'active'),
('550e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440000', 
 '550e8400-e29b-41d4-a716-446655440002', 'EMP-002', '550e8400-e29b-41d4-a716-446655440051', 
 'Sales Manager', 75000, '2021-08-20', 'active');

-- Insert sales orders
INSERT INTO sales_orders (id, tenant_id, order_number, customer_id, status, order_date, delivery_date, total_amount, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440000', 
 'SO-2024-001', '550e8400-e29b-41d4-a716-446655440030', 'confirmed', '2024-01-15', '2024-01-25', 
 2450.00, '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440000', 
 'SO-2024-002', '550e8400-e29b-41d4-a716-446655440031', 'shipped', '2024-01-14', '2024-01-24', 
 1299.99, '550e8400-e29b-41d4-a716-446655440002');

-- Insert purchase orders
INSERT INTO purchase_orders (id, tenant_id, po_number, vendor_id, status, order_date, delivery_date, total_amount, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440000', 
 'PO-2024-001', '550e8400-e29b-41d4-a716-446655440040', 'confirmed', '2024-01-15', '2024-01-25', 
 15750.00, '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440081', '550e8400-e29b-41d4-a716-446655440000', 
 'PO-2024-002', '550e8400-e29b-41d4-a716-446655440041', 'sent', '2024-01-14', '2024-01-28', 
 8950.50, '550e8400-e29b-41d4-a716-446655440001');

-- Insert projects
INSERT INTO projects (id, tenant_id, name, description, client_id, manager_id, status, start_date, end_date, budget, progress) VALUES 
('550e8400-e29b-41d4-a716-446655440090', '550e8400-e29b-41d4-a716-446655440000', 
 'E-commerce Platform Redesign', 'Complete redesign of the e-commerce platform', 
 '550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440001', 
 'active', '2024-01-01', '2024-03-31', 125000, 65),
('550e8400-e29b-41d4-a716-446655440091', '550e8400-e29b-41d4-a716-446655440000', 
 'Mobile App Development', 'Development of mobile application', 
 '550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440002', 
 'active', '2024-02-01', '2024-05-31', 85000, 30);

-- Insert support tickets
INSERT INTO support_tickets (id, tenant_id, ticket_number, subject, description, customer_id, assignee_id, priority, status, category, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440000', 
 'TKT-2024-001', 'Login issues with mobile app', 'Customer unable to login to mobile application', 
 '550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440001', 
 'high', 'in-progress', 'Technical', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440000', 
 'TKT-2024-002', 'Payment processing error', 'Error occurred during payment processing', 
 '550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440002', 
 'urgent', 'open', 'Billing', '550e8400-e29b-41d4-a716-446655440002');

-- Insert chart of accounts
INSERT INTO accounts (id, tenant_id, account_code, account_name, account_type, balance) VALUES 
('550e8400-e29b-41d4-a716-446655440110', '550e8400-e29b-41d4-a716-446655440000', 
 '1000', 'Cash and Cash Equivalents', 'Asset', 500000.00),
('550e8400-e29b-41d4-a716-446655440111', '550e8400-e29b-41d4-a716-446655440000', 
 '1200', 'Accounts Receivable', 'Asset', 125000.00),
('550e8400-e29b-41d4-a716-446655440112', '550e8400-e29b-41d4-a716-446655440000', 
 '4000', 'Sales Revenue', 'Revenue', 0.00),
('550e8400-e29b-41d4-a716-446655440113', '550e8400-e29b-41d4-a716-446655440000', 
 '5000', 'Cost of Goods Sold', 'Expense', 0.00);

-- Insert sample transactions
INSERT INTO transactions (id, tenant_id, transaction_date, description, total_amount, status, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440120', '550e8400-e29b-41d4-a716-446655440000', 
 '2024-01-15', 'Sales Revenue - Acme Corp', 2450.00, 'completed', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440121', '550e8400-e29b-41d4-a716-446655440000', 
 '2024-01-14', 'Office Supplies Purchase', 156.78, 'completed', '550e8400-e29b-41d4-a716-446655440001');

-- Insert notifications
INSERT INTO notifications (id, tenant_id, user_id, type, title, message, module, is_read) VALUES 
('550e8400-e29b-41d4-a716-446655440130', '550e8400-e29b-41d4-a716-446655440000', 
 '550e8400-e29b-41d4-a716-446655440001', 'warning', 'Low Stock Alert', 
 '15 items are running low on stock', 'inventory', false),
('550e8400-e29b-41d4-a716-446655440131', '550e8400-e29b-41d4-a716-446655440000', 
 '550e8400-e29b-41d4-a716-446655440001', 'success', 'Payment Received', 
 'Payment of $2,450 received from Acme Corp', 'finance', false);

-- Insert reports
INSERT INTO reports (id, tenant_id, name, description, category, type, status, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440140', '550e8400-e29b-41d4-a716-446655440000', 
 'Monthly Sales Report', 'Comprehensive monthly sales analysis', 'Sales', 'scheduled', 'active', 
 '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440141', '550e8400-e29b-41d4-a716-446655440000', 
 'Inventory Status Report', 'Current inventory levels and stock analysis', 'Inventory', 'standard', 'active', 
 '550e8400-e29b-41d4-a716-446655440001');
