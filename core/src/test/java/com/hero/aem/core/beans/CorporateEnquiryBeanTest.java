package com.hero.aem.core.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class CorporateEnquiryBeanTest {

    
    private String name;
    private String designation;
    private String companyName;
    private String mobile;
    private String tel;
    private String email;
    private String address;
    private String state;
    private String city;
    private String category;
    private String otherInfo;
    private String countryId;
    private String requirements;
    private String enquiryDate;

    @InjectMocks
    private CorporateEnquiryBean corporateEnquiryBean;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        corporateEnquiryBean.setName(name);
        corporateEnquiryBean.setAddress(address);
        corporateEnquiryBean.setCategory(category);
        corporateEnquiryBean.setCity(city);
        corporateEnquiryBean.setEnquiryDate(enquiryDate);
        corporateEnquiryBean.setTel(tel);
        corporateEnquiryBean.setState(state);
        corporateEnquiryBean.setRequirements(requirements);
        corporateEnquiryBean.setOtherInfo(otherInfo);
        corporateEnquiryBean.setMobile(mobile);
        corporateEnquiryBean.setEmail(email);
        corporateEnquiryBean.setDesignation(designation);
        corporateEnquiryBean.setCompanyName(companyName);
        corporateEnquiryBean.setCountryId(countryId);
    }

    @Test
    void getTestResult() {
        assertEquals(name,corporateEnquiryBean.getName());
        assertEquals(address,corporateEnquiryBean.getAddress());
        assertEquals(category,corporateEnquiryBean.getCategory());
        assertEquals(city,corporateEnquiryBean.getCity());
        assertEquals(enquiryDate,corporateEnquiryBean.getEnquiryDate());
        assertEquals(tel,corporateEnquiryBean.getTel());
        assertEquals(state,corporateEnquiryBean.getState());
        assertEquals(requirements,corporateEnquiryBean.getRequirements());
        assertEquals(otherInfo,corporateEnquiryBean.getOtherInfo());
        assertEquals(mobile,corporateEnquiryBean.getMobile());
        assertEquals(email,corporateEnquiryBean.getEmail());
        assertEquals(designation,corporateEnquiryBean.getDesignation());
        assertEquals(companyName,corporateEnquiryBean.getCompanyName());
        assertEquals(countryId,corporateEnquiryBean.getCountryId());
    }

}
