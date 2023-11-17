package com.hero.aem.core.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class SuggestionSoapAPIBeanTest {

    private String firstName;
    private String lastName;
    private String tel;
    private String email;
    private String addressLine1;
    private String addressLine2;
    private String state;
    private String city;
    private String town;
    private String pin;
    private String vehicleModel;
    private String vehicleRegdNo;
    private String odometer;
    private String malfunctionDate;
    private String dealerState;
    private String dealerCity;
    private String dealerName;
    private String complaintStream;
    private String complaintCategory;
    private String complaintDesc;
    private String cellularPhone;
    private String hhmlVINNumber;

    @InjectMocks
    private SuggestionSoapAPIBean suggestionSoapAPIBean;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        suggestionSoapAPIBean.setFirstName(firstName);
        suggestionSoapAPIBean.setLastName(lastName);
        suggestionSoapAPIBean.setTel(tel);
        suggestionSoapAPIBean.setEmail(email);
        suggestionSoapAPIBean.setAddressLine1(addressLine1);
        suggestionSoapAPIBean.setAddressLine2(addressLine2);
        suggestionSoapAPIBean.setState(state);
        suggestionSoapAPIBean.setCity(city);
        suggestionSoapAPIBean.setTown(town);
        suggestionSoapAPIBean.setPin(pin);
        suggestionSoapAPIBean.setVehicleModel(vehicleModel);
        suggestionSoapAPIBean.setVehicleRegdNo(vehicleRegdNo);
        suggestionSoapAPIBean.setOdometer(odometer);
        suggestionSoapAPIBean.setMalfunctionDate(malfunctionDate);
        suggestionSoapAPIBean.setDealerCity(dealerCity);
        suggestionSoapAPIBean.setDealerName(dealerName);
        suggestionSoapAPIBean.setComplaintStream(complaintStream);
        suggestionSoapAPIBean.setComplaintCategory(complaintCategory);
        suggestionSoapAPIBean.setComplaintDesc(complaintDesc);
        suggestionSoapAPIBean.setCellularPhone(cellularPhone);
        suggestionSoapAPIBean.setHhmlVINNumber(hhmlVINNumber);
        suggestionSoapAPIBean.setDealerState(dealerState);
    }

    @Test
    void getTestResult() {
        assertEquals(firstName,suggestionSoapAPIBean.getFirstName());
        assertEquals(lastName,suggestionSoapAPIBean.getLastName());
        assertEquals(tel,suggestionSoapAPIBean.getTel());
        assertEquals(email,suggestionSoapAPIBean.getEmail());
        assertEquals(addressLine1,suggestionSoapAPIBean.getAddressLine1());
        assertEquals(addressLine2,suggestionSoapAPIBean.getAddressLine2());
        assertEquals(state,suggestionSoapAPIBean.getState());
        assertEquals(city,suggestionSoapAPIBean.getCity());
        assertEquals(town,suggestionSoapAPIBean.getTown());
        assertEquals(pin,suggestionSoapAPIBean.getPin());
        assertEquals(vehicleModel,suggestionSoapAPIBean.getVehicleModel());
        assertEquals(vehicleRegdNo,suggestionSoapAPIBean.getVehicleRegdNo());
        assertEquals(odometer,suggestionSoapAPIBean.getOdometer());
        assertEquals(malfunctionDate,suggestionSoapAPIBean.getMalfunctionDate());
        assertEquals(dealerCity,suggestionSoapAPIBean.getDealerCity());
        assertEquals(dealerName,suggestionSoapAPIBean.getDealerName());
        assertEquals(complaintStream,suggestionSoapAPIBean.getComplaintStream());
        assertEquals(complaintCategory,suggestionSoapAPIBean.getComplaintCategory());
        assertEquals(complaintDesc,suggestionSoapAPIBean.getComplaintDesc());
        assertEquals(cellularPhone,suggestionSoapAPIBean.getCellularPhone());
        assertEquals(hhmlVINNumber,suggestionSoapAPIBean.getHhmlVINNumber());
        assertEquals(dealerState,suggestionSoapAPIBean.getDealerState());
    }

}
