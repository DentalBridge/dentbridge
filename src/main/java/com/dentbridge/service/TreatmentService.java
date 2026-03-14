package com.dentbridge.service;

import com.dentbridge.dto.TreatmentRequest;
import com.dentbridge.dto.TreatmentResponse;
import com.dentbridge.model.Appointment;
import com.dentbridge.model.Patient;
import com.dentbridge.model.Treatment;
import com.dentbridge.model.User;
import com.dentbridge.repository.AppointmentRepository;
import com.dentbridge.repository.PatientRepository;
import com.dentbridge.repository.TreatmentRepository;
import com.dentbridge.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TreatmentService {

    private final TreatmentRepository treatmentRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<TreatmentResponse> getAllTreatments() {
        return treatmentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TreatmentResponse> getTreatmentsByPatient(Long patientId) {
        return treatmentRepository.findByPatientId(patientId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TreatmentResponse getTreatmentById(Long id) {
        Treatment treatment = treatmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Treatment not found with id: " + id));
        return mapToResponse(treatment);
    }

    @Transactional
    public TreatmentResponse createTreatment(TreatmentRequest request, Long userId) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Treatment treatment = Treatment.builder()
                .patient(patient)
                .treatmentName(request.getTreatmentName())
                .description(request.getDescription())
                .cost(request.getCost())
                .treatmentDate(request.getTreatmentDate())
                .performedBy(user)
                .build();

        if (request.getAppointmentId() != null) {
            Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));
            treatment.setAppointment(appointment);
        }

        Treatment savedTreatment = treatmentRepository.save(treatment);
        return mapToResponse(savedTreatment);
    }

    @Transactional
    public TreatmentResponse updateTreatment(Long id, TreatmentRequest request) {
        Treatment treatment = treatmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Treatment not found with id: " + id));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        treatment.setPatient(patient);
        treatment.setTreatmentName(request.getTreatmentName());
        treatment.setDescription(request.getDescription());
        treatment.setCost(request.getCost());
        treatment.setTreatmentDate(request.getTreatmentDate());

        if (request.getAppointmentId() != null) {
            Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));
            treatment.setAppointment(appointment);
        }

        Treatment updatedTreatment = treatmentRepository.save(treatment);
        return mapToResponse(updatedTreatment);
    }

    @Transactional
    public void deleteTreatment(Long id) {
        if (!treatmentRepository.existsById(id)) {
            throw new RuntimeException("Treatment not found with id: " + id);
        }
        treatmentRepository.deleteById(id);
    }

    private TreatmentResponse mapToResponse(Treatment treatment) {
        return TreatmentResponse.builder()
                .id(treatment.getId())
                .patientId(treatment.getPatient().getId())
                .patientName(treatment.getPatient().getName())
                .appointmentId(treatment.getAppointment() != null ? treatment.getAppointment().getId() : null)
                .treatmentName(treatment.getTreatmentName())
                .description(treatment.getDescription())
                .cost(treatment.getCost())
                .treatmentDate(treatment.getTreatmentDate())
                .performedBy(treatment.getPerformedBy().getId())
                .performedByName(treatment.getPerformedBy().getFullName())
                .createdAt(treatment.getCreatedAt())
                .updatedAt(treatment.getUpdatedAt())
                .build();
    }

}
