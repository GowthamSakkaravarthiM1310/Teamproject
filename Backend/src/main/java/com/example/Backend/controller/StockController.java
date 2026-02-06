package com.example.Backend.controller;

import com.example.Backend.model.Stock;
import com.example.Backend.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "http://localhost:5173")
public class StockController {
    @Autowired
    private StockService stockService;

    @GetMapping
    public List<Stock> getStock() {
        return stockService.getAllStock();
    }

    @PutMapping("/{bloodGroup}")
    public Stock updateStock(@PathVariable String bloodGroup, @RequestBody Map<String, Integer> payload) {
        int delta = payload.get("delta");
        return stockService.updateStock(bloodGroup, delta);
    }
}
