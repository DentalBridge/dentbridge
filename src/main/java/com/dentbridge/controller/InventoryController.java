package com.dentbridge.controller;

import com.dentbridge.dto.ApiResponse;
import com.dentbridge.dto.InventoryItemRequest;
import com.dentbridge.dto.InventoryItemResponse;
import com.dentbridge.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<InventoryItemResponse>> getAllItems() {
        return ResponseEntity.ok(inventoryService.getAllItems());
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<InventoryItemResponse>> getLowStockItems() {
        return ResponseEntity.ok(inventoryService.getLowStockItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryItemResponse> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.getItemById(id));
    }

    @PostMapping
    public ResponseEntity<InventoryItemResponse> createItem(@Valid @RequestBody InventoryItemRequest request) {
        return ResponseEntity.ok(inventoryService.createItem(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryItemResponse> updateItem(
            @PathVariable Long id,
            @Valid @RequestBody InventoryItemRequest request
    ) {
        return ResponseEntity.ok(inventoryService.updateItem(id, request));
    }

    @PostMapping("/{id}/adjust-quantity")
    public ResponseEntity<InventoryItemResponse> adjustQuantity(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> request
    ) {
        Integer adjustment = request.get("adjustment");
        return ResponseEntity.ok(inventoryService.adjustQuantity(id, adjustment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteItem(@PathVariable Long id) {
        inventoryService.deleteItem(id);
        return ResponseEntity.ok(ApiResponse.success("Inventory item deleted successfully"));
    }

}
