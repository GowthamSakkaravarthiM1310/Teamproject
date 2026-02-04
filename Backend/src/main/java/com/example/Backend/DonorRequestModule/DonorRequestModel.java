package com.example.Backend.DonorRequestModule;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "donor_requests")
public class DonorRequestModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String bloodGroup;
    private int units;
    private String phone;
    private String address;
    private String status;
    private LocalDate requestDate;

    public DonorRequestModel() {
    }

    public DonorRequestModel(String name, String bloodGroup, int units, String phone, String address, String status, LocalDate requestDate) {
        this.name = name;
        this.bloodGroup = bloodGroup;
        this.units = units;
        this.phone = phone;
        this.address = address;
        this.status = status;
        this.requestDate = requestDate;
    }

    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public String getName() { 
        return name; 
    }

    public void setName(String name) { 
        this.name = name; 
    }

    public String getBloodGroup() { 
        return bloodGroup; 
    }

    public void setBloodGroup(String bloodGroup) { 
        this.bloodGroup = bloodGroup; 
    }

    public int getUnits() { 
        return units; 
    }

    public void setUnits(int units) { 
        this.units = units; 
    }

    public String getPhone() { 
        return phone; 
    }

    public void setPhone(String phone) { 
        this.phone = phone; 
    }

    public String getAddress() { 
        return address; 
    }

    public void setAddress(String address) { 
        this.address = address; 
    }

    public String getStatus() { 
        return status; 
    }

    public void setStatus(String status) { 
        this.status = status; 
    }

    public LocalDate getRequestDate() { 
        return requestDate; 
    }

    public void setRequestDate(LocalDate requestDate) { 
        this.requestDate = requestDate; 
    }
}
