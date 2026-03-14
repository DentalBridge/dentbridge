package com.dentbridge.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentRequest {

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    private Long appointmentId;

    @NotBlank(message = "Treatment name is required")
    private String treatmentName;

    private String description;
    private BigDecimal cost;

    @NotNull(message = "Treatment date is required")
    private LocalDate treatmentDate;

}
