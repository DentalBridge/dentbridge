package com.dentbridge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItemResponse {

    private Long id;
    private String itemName;
    private String category;
    private String description;
    private Integer quantity;
    private BigDecimal unitPrice;
    private String unitOfMeasure;
    private Integer reorderLevel;
    private String supplier;
    private Boolean isLowStock;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
