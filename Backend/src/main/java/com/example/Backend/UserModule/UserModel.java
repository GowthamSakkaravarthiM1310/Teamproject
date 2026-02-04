package com.example.Backend.UserModule;

public class UserModel {
    String name;
    String phone;
    String password;
    String email;
    String address;
    String bloodGroup;
    String role;

    public UserModel() {
    }

    public UserModel(String name, String phone, String password, String email, String address, String bloodGroup, String role) {
        this.name = name;
        this.phone = phone;
        this.password = password;
        this.email = email;
        this.address = address;
        this.bloodGroup = bloodGroup;
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
