package com.dentbridge.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItemRequest {

    @NotBlank(message = "Item name is required")
    private String itemName;

    private String category;
    private String description;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    private BigDecimal unitPrice;
    private String unitOfMeasure;
    private Integer reorderLevel;
    private String supplier;

}
