package com.hero.aem.core.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class XPulseBeanTest {

    private String name;
    private String mobile;
    private String address;
    private String city;
    private String selectProgram;
    private String selectDate;
    private String utmSource;
    private String utmMedium;
    private String utmTerm;
    private String utmContent;
    private String utmCampaign;
    private String smsText;

    @InjectMocks
    private XPulseBean xPulseBean;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        xPulseBean.setName(name);
        xPulseBean.setMobile(mobile);
        xPulseBean.setAddress(address);
        xPulseBean.setCity(city);
        xPulseBean.setSelectProgram(selectProgram);
        xPulseBean.setSelectDate(selectDate);
        xPulseBean.setUtmSource(utmSource);
        xPulseBean.setUtmMedium(utmMedium);
        xPulseBean.setUtmTerm(utmTerm);
        xPulseBean.setUtmContent(utmContent);
        xPulseBean.setUtmCampaign(utmCampaign);
        xPulseBean.setSmsText(smsText);
    }

    @Test
    void getTestResult() {
        assertEquals(name,xPulseBean.getName());
        assertEquals(mobile,xPulseBean.getMobile());
        assertEquals(address,xPulseBean.getAddress());
        assertEquals(city,xPulseBean.getCity());
        assertEquals(selectProgram,xPulseBean.getSelectProgram());
        assertEquals(selectDate,xPulseBean.getSelectDate());
        assertEquals(utmSource,xPulseBean.getUtmSource());
        assertEquals(utmMedium,xPulseBean.getUtmMedium());
        assertEquals(utmTerm,xPulseBean.getUtmTerm());
        assertEquals(utmContent,xPulseBean.getUtmContent());
        assertEquals(utmCampaign,xPulseBean.getUtmCampaign());
        assertEquals(smsText,xPulseBean.getSmsText());
    }


}