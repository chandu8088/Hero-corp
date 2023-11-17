package com.hero.aem.core.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.mockito.InjectMocks;

import static org.junit.jupiter.api.Assertions.*;

class LeadGenerationAPIBeanTest {
    private String bike_model;
    private String name;
    private String email;
    private String mobile;
    private String state;
    private String city;
    private String ip;
    private String agent;
    private String insert_date;
    private String utm_source;
    private String utm_medium;
    private String utm_term;
    private String utm_content;
    private String utm_campaign;
    private String postal_code;
    private String interested_in;
    private String preferred_dealership;
    private String vehicle_purchase_plan;
    private String own_vehicle;
    private String token;
    private String source;
    private String otp;
    private String reqId;
    private String captcha;
    private String variation_type;
    private String dealer_code;
    private String dealer_name;
    private String topic;
    private String suggestion;
    private String section;

    @InjectMocks
    private LeadGenerationAPIBean leadGenerationAPIBean;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        leadGenerationAPIBean.setBike_model(bike_model);
        leadGenerationAPIBean.setName(name);
        leadGenerationAPIBean.setEmail(email);
        leadGenerationAPIBean.setMobile(mobile);
        leadGenerationAPIBean.setState(state);
        leadGenerationAPIBean.setCity(city);
        leadGenerationAPIBean.setIp(ip);
        leadGenerationAPIBean.setAgent(agent);
        leadGenerationAPIBean.setInsert_date(insert_date);
        leadGenerationAPIBean.setUtm_source(utm_source);
        leadGenerationAPIBean.setUtm_medium(utm_medium);
        leadGenerationAPIBean.setUtm_term(utm_term);
        leadGenerationAPIBean.setUtm_content(utm_content);
        leadGenerationAPIBean.setUtm_campaign(utm_campaign);
        leadGenerationAPIBean.setPostal_code(postal_code);
        leadGenerationAPIBean.setInterested_in(interested_in);
        leadGenerationAPIBean.setPreferred_dealership(preferred_dealership);
        leadGenerationAPIBean.setVehicle_purchase_plan(vehicle_purchase_plan);
        leadGenerationAPIBean.setOwn_vehicle(own_vehicle);
        leadGenerationAPIBean.setToken(token);
        leadGenerationAPIBean.setSource(source);
        leadGenerationAPIBean.setOtp(otp);
        leadGenerationAPIBean.setReqId(reqId);
        leadGenerationAPIBean.setCaptcha(captcha);
        leadGenerationAPIBean.setVariation_type(variation_type);
        leadGenerationAPIBean.setDealer_code(dealer_code);
        leadGenerationAPIBean.setDealer_name(dealer_name);
        leadGenerationAPIBean.setTopic(topic);
        leadGenerationAPIBean.setSuggestion(suggestion);
        leadGenerationAPIBean.setSection(section);
    }

    @Test
    void getTestResult() {
        assertEquals(bike_model,leadGenerationAPIBean.getBike_model());
        assertEquals(name,leadGenerationAPIBean.getName());
        assertEquals(email,leadGenerationAPIBean.getEmail());
        assertEquals(mobile,leadGenerationAPIBean.getMobile());
        assertEquals(state,leadGenerationAPIBean.getState());
        assertEquals(city,leadGenerationAPIBean.getCity());
        assertEquals(ip,leadGenerationAPIBean.getIp());
        assertEquals(agent,leadGenerationAPIBean.getAgent());
        assertEquals(insert_date,leadGenerationAPIBean.getInsert_date());
        assertEquals(utm_source,leadGenerationAPIBean.getUtm_source());
        assertEquals(utm_medium,leadGenerationAPIBean.getUtm_medium());
        assertEquals(utm_term,leadGenerationAPIBean.getUtm_term());
        assertEquals(utm_content,leadGenerationAPIBean.getUtm_content());
        assertEquals(utm_campaign,leadGenerationAPIBean.getUtm_campaign());
        assertEquals(postal_code,leadGenerationAPIBean.getPostal_code());
        assertEquals(interested_in,leadGenerationAPIBean.getInterested_in());
        assertEquals(preferred_dealership,leadGenerationAPIBean.getPreferred_dealership());
        assertEquals(vehicle_purchase_plan,leadGenerationAPIBean.getVehicle_purchase_plan());
        assertEquals(own_vehicle,leadGenerationAPIBean.getOwn_vehicle());
        assertEquals(token,leadGenerationAPIBean.getToken());
        assertEquals(source,leadGenerationAPIBean.getSource());
        assertEquals(otp,leadGenerationAPIBean.getOtp());
        assertEquals(reqId,leadGenerationAPIBean.getReqId());
        assertEquals(captcha,leadGenerationAPIBean.getCaptcha());
        assertEquals(variation_type,leadGenerationAPIBean.getVariation_type());
        assertEquals(dealer_code,leadGenerationAPIBean.getDealer_code());
        assertEquals(dealer_name,leadGenerationAPIBean.getDealer_name());
        assertEquals(topic,leadGenerationAPIBean.getTopic());
        assertEquals(suggestion,leadGenerationAPIBean.getSuggestion());
        assertEquals(section,leadGenerationAPIBean.getSection());
    }

}