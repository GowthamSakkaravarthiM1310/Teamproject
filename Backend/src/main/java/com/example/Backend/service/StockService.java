package com.example.Backend.service;

import com.example.Backend.model.Stock;
import com.example.Backend.repository.StockRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Arrays;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    @PostConstruct
    public void init() {
        // Initialize default blood groups if empty
        if (stockRepository.count() == 0) {
            List<String> groups = Arrays.asList("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-");
            for (String group : groups) {
                stockRepository.save(new Stock(group, 0));
            }
        }
    }

    public List<Stock> getAllStock() {
        return stockRepository.findAll();
    }

    public Stock updateStock(String bloodGroup, int delta) {
        Stock stock = stockRepository.findByBloodGroup(bloodGroup)
                .orElseThrow(() -> new RuntimeException("Blood group not found"));
        stock.setUnits(stock.getUnits() + delta);
        return stockRepository.save(stock);
    }
}
