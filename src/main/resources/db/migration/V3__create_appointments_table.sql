-- Create appointments table
CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    appointment_date_time TIMESTAMP NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 30,
    status VARCHAR(50) NOT NULL,
    treatment_type VARCHAR(255),
    notes TEXT,
    google_calendar_event_id VARCHAR(255),
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_appointments_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    CONSTRAINT fk_appointments_created_by FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create indexes for faster queries
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_date_time ON appointments(appointment_date_time);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_created_by ON appointments(created_by);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
