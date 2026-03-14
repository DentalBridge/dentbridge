package com.dentbridge.service;

import com.dentbridge.dto.AppointmentRequest;
import com.dentbridge.dto.AppointmentResponse;
import com.dentbridge.model.Appointment;
import com.dentbridge.model.Patient;
import com.dentbridge.model.User;
import com.dentbridge.repository.AppointmentRepository;
import com.dentbridge.repository.PatientRepository;
import com.dentbridge.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final GoogleCalendarService googleCalendarService;

    @Transactional(readOnly = true)
    public Page<AppointmentResponse> getAllAppointments(Pageable pageable) {
        return appointmentRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public Page<AppointmentResponse> getAppointmentsByStatus(String status, Pageable pageable) {
        return appointmentRepository.findByStatus(status, pageable)
                .map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAppointmentsByDateRange(LocalDateTime start, LocalDateTime end) {
        return appointmentRepository.findByDateRange(start, end).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AppointmentResponse getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        return mapToResponse(appointment);
    }

    @Transactional
    public AppointmentResponse createAppointment(AppointmentRequest request, Long userId) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .appointmentDateTime(request.getAppointmentDateTime())
                .durationMinutes(request.getDurationMinutes())
                .status(request.getStatus())
                .treatmentType(request.getTreatmentType())
                .notes(request.getNotes())
                .createdBy(user)
                .build();

        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Sync with Google Calendar
        String eventId = googleCalendarService.createEvent(savedAppointment);
        if (eventId != null) {
            savedAppointment.setGoogleCalendarEventId(eventId);
            savedAppointment = appointmentRepository.save(savedAppointment);
        }

        return mapToResponse(savedAppointment);
    }

    @Transactional
    public AppointmentResponse updateAppointment(Long id, AppointmentRequest request) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        appointment.setPatient(patient);
        appointment.setAppointmentDateTime(request.getAppointmentDateTime());
        appointment.setDurationMinutes(request.getDurationMinutes());
        appointment.setStatus(request.getStatus());
        appointment.setTreatmentType(request.getTreatmentType());
        appointment.setNotes(request.getNotes());

        Appointment updatedAppointment = appointmentRepository.save(appointment);

        // Update Google Calendar
        if (updatedAppointment.getGoogleCalendarEventId() != null) {
            googleCalendarService.updateEvent(updatedAppointment.getGoogleCalendarEventId(), updatedAppointment);
        }

        return mapToResponse(updatedAppointment);
    }

    @Transactional
    public void deleteAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));

        // Delete from Google Calendar
        if (appointment.getGoogleCalendarEventId() != null) {
            googleCalendarService.deleteEvent(appointment.getGoogleCalendarEventId());
        }

        appointmentRepository.deleteById(id);
    }

    private AppointmentResponse mapToResponse(Appointment appointment) {
        return AppointmentResponse.builder()
                .id(appointment.getId())
                .patientId(appointment.getPatient().getId())
                .patientName(appointment.getPatient().getName())
                .appointmentDateTime(appointment.getAppointmentDateTime())
                .durationMinutes(appointment.getDurationMinutes())
                .status(appointment.getStatus())
                .treatmentType(appointment.getTreatmentType())
                .notes(appointment.getNotes())
                .googleCalendarEventId(appointment.getGoogleCalendarEventId())
                .createdBy(appointment.getCreatedBy().getId())
                .createdByName(appointment.getCreatedBy().getFullName())
                .createdAt(appointment.getCreatedAt())
                .updatedAt(appointment.getUpdatedAt())
                .build();
    }

}
