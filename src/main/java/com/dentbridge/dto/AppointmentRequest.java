package com.dentbridge.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequest {

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Appointment date and time is required")
    private LocalDateTime appointmentDateTime;

    private Integer durationMinutes = 30;

    @NotNull(message = "Status is required")
    private String status;

    private String treatmentType;
    private String notes;

}
