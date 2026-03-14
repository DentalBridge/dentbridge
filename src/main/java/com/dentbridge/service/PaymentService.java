package com.dentbridge.service;

import com.dentbridge.dto.PaymentRequest;
import com.dentbridge.dto.PaymentResponse;
import com.dentbridge.dto.PaymentStatsResponse;
import com.dentbridge.model.Appointment;
import com.dentbridge.model.Payment;
import com.dentbridge.model.Patient;
import com.dentbridge.repository.AppointmentRepository;
import com.dentbridge.repository.PaymentRepository;
import com.dentbridge.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    @Transactional(readOnly = true)
    public Page<PaymentResponse> getAllPayments(Pageable pageable) {
        return paymentRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public List<PaymentResponse> getPaymentsByPatient(Long patientId) {
        return paymentRepository.findByPatientId(patientId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PaymentResponse getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));
        return mapToResponse(payment);
    }

    @Transactional(readOnly = true)
    public PaymentStatsResponse getPaymentStats() {
        BigDecimal totalPaid = paymentRepository.getTotalPaidAmount();
        BigDecimal totalPending = paymentRepository.getTotalPendingAmount();
        Long totalPayments = paymentRepository.count();

        return PaymentStatsResponse.builder()
                .totalPaid(totalPaid != null ? totalPaid : BigDecimal.ZERO)
                .totalPending(totalPending != null ? totalPending : BigDecimal.ZERO)
                .totalPayments(totalPayments)
                .build();
    }

    @Transactional
    public PaymentResponse createPayment(PaymentRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Payment payment = Payment.builder()
                .patient(patient)
                .amount(request.getAmount())
                .paymentDate(request.getPaymentDate())
                .paymentMethod(request.getPaymentMethod())
                .status(request.getStatus())
                .notes(request.getNotes())
                .build();

        if (request.getAppointmentId() != null) {
            Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));
            payment.setAppointment(appointment);
        }

        Payment savedPayment = paymentRepository.save(payment);
        return mapToResponse(savedPayment);
    }

    @Transactional
    public PaymentResponse updatePayment(Long id, PaymentRequest request) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        payment.setPatient(patient);
        payment.setAmount(request.getAmount());
        payment.setPaymentDate(request.getPaymentDate());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setStatus(request.getStatus());
        payment.setNotes(request.getNotes());

        if (request.getAppointmentId() != null) {
            Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));
            payment.setAppointment(appointment);
        }

        Payment updatedPayment = paymentRepository.save(payment);
        return mapToResponse(updatedPayment);
    }

    @Transactional
    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new RuntimeException("Payment not found with id: " + id);
        }
        paymentRepository.deleteById(id);
    }

    private PaymentResponse mapToResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .patientId(payment.getPatient().getId())
                .patientName(payment.getPatient().getName())
                .appointmentId(payment.getAppointment() != null ? payment.getAppointment().getId() : null)
                .amount(payment.getAmount())
                .paymentDate(payment.getPaymentDate())
                .paymentMethod(payment.getPaymentMethod())
                .status(payment.getStatus())
                .notes(payment.getNotes())
                .createdAt(payment.getCreatedAt())
                .updatedAt(payment.getUpdatedAt())
                .build();
    }

}
