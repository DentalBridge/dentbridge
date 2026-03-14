-- Create treatments table
CREATE TABLE treatments (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    appointment_id BIGINT,
    treatment_name VARCHAR(255) NOT NULL,
    description TEXT,
    cost DECIMAL(10,2),
    treatment_date DATE NOT NULL,
    performed_by BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_treatments_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    CONSTRAINT fk_treatments_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
    CONSTRAINT fk_treatments_performed_by FOREIGN KEY (performed_by) REFERENCES users(id)
);

-- Create indexes for faster queries
CREATE INDEX idx_treatments_patient_id ON treatments(patient_id);
CREATE INDEX idx_treatments_appointment_id ON treatments(appointment_id);
CREATE INDEX idx_treatments_treatment_date ON treatments(treatment_date);
CREATE INDEX idx_treatments_performed_by ON treatments(performed_by);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_treatments_updated_at
    BEFORE UPDATE ON treatments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
