package com.hero.aem.core.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class ProductEnquiryBeanTest {

    private String firstName;
    private String lastName;
    private String mobile;
    private String tel;
    private String email;
    private String vehicleModel;
    private String state;
    private String district;
    private String city;
    private String existingVehicle;
    private String dealerState;
    private String dealerCity;
    private String dealerName;
    private String briefAboutEnquiry;
    private String expectedDateOfPurchase;
    private String gender;
    private String age;
    private String occupation;
    private String intendedUse;
    private String expectedDateOfTestRide;
    private String enquiryDate;
    private String testRideRequired;
    private String dealerCode;

    @InjectMocks
    private ProductEnquiryBean productEnquiryBean;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        productEnquiryBean.setFirstName(firstName);
        productEnquiryBean.setLastName(lastName);
        productEnquiryBean.setMobile(mobile);
        productEnquiryBean.setTel(tel);
        productEnquiryBean.setEmail(email);
        productEnquiryBean.setVehicleModel(vehicleModel);
        productEnquiryBean.setState(state);
        productEnquiryBean.setDistrict(district);
        productEnquiryBean.setCity(city);
        productEnquiryBean.setExistingVehicle(existingVehicle);
        productEnquiryBean.setDealerState(dealerState);
        productEnquiryBean.setDealerCity(dealerCity);
        productEnquiryBean.setDealerName(dealerName);
        productEnquiryBean.setBriefAboutEnquiry(briefAboutEnquiry);
        productEnquiryBean.setExpectedDateOfPurchase(expectedDateOfPurchase);
        productEnquiryBean.setEnquiryDate(enquiryDate);
        productEnquiryBean.setTestRideRequired(testRideRequired);
        productEnquiryBean.setDealerCode(dealerCode);
        productEnquiryBean.setGender(gender);
        productEnquiryBean.setAge(age);
        productEnquiryBean.setOccupation(occupation);
        productEnquiryBean.setIntendedUse(intendedUse);
        productEnquiryBean.setExpectedDateOfTestRide(expectedDateOfTestRide);

    }

    @Test
    void getTestResult() {
        assertEquals(firstName,productEnquiryBean.getFirstName());
        assertEquals(lastName,productEnquiryBean.getLastName());
        assertEquals(mobile,productEnquiryBean.getMobile());
        assertEquals(tel,productEnquiryBean.getTel());
        assertEquals(email,productEnquiryBean.getEmail());
        assertEquals(vehicleModel,productEnquiryBean.getVehicleModel());
        assertEquals(state,productEnquiryBean.getState());
        assertEquals(district,productEnquiryBean.getDistrict());
        assertEquals(city,productEnquiryBean.getCity());
        assertEquals(existingVehicle,productEnquiryBean.getExistingVehicle());
        assertEquals(dealerState,productEnquiryBean.getDealerState());
        assertEquals(dealerCity,productEnquiryBean.getDealerCity());
        assertEquals(dealerName,productEnquiryBean.getDealerName());
        assertEquals(briefAboutEnquiry,productEnquiryBean.getBriefAboutEnquiry());
        assertEquals(expectedDateOfPurchase,productEnquiryBean.getExpectedDateOfPurchase());
        assertEquals(enquiryDate,productEnquiryBean.getEnquiryDate());
        assertEquals(testRideRequired,productEnquiryBean.getTestRideRequired());
        assertEquals(dealerCode,productEnquiryBean.getDealerCode());
        assertEquals(gender,productEnquiryBean.getGender());
        assertEquals(age,productEnquiryBean.getAge());
        assertEquals(occupation,productEnquiryBean.getOccupation());
        assertEquals(intendedUse,productEnquiryBean.getIntendedUse());
        assertEquals(expectedDateOfTestRide,productEnquiryBean.getExpectedDateOfTestRide());


    }


}