package com.dentbridge.repository;

import com.dentbridge.model.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByPatientId(Long patientId);

    Page<Payment> findByStatus(String status, Pageable pageable);

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 'PAID'")
    BigDecimal getTotalPaidAmount();

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 'PENDING'")
    BigDecimal getTotalPendingAmount();

    @Query("SELECT p FROM Payment p WHERE p.paymentDate BETWEEN :startDate AND :endDate")
    List<Payment> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

}
