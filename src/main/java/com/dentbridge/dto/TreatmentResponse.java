package com.dentbridge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentResponse {

    private Long id;
    private Long patientId;
    private String patientName;
    private Long appointmentId;
    private String treatmentName;
    private String description;
    private BigDecimal cost;
    private LocalDate treatmentDate;
    private Long performedBy;
    private String performedByName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
