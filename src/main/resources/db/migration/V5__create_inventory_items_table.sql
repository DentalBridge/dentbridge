-- Create inventory_items table
CREATE TABLE inventory_items (
    id BIGSERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    quantity INT NOT NULL DEFAULT 0,
    unit_price DECIMAL(10,2),
    unit_of_measure VARCHAR(50),
    reorder_level INT,
    supplier VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_inventory_items_item_name ON inventory_items(item_name);
CREATE INDEX idx_inventory_items_category ON inventory_items(category);
CREATE INDEX idx_inventory_items_quantity ON inventory_items(quantity);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_inventory_items_updated_at
    BEFORE UPDATE ON inventory_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
