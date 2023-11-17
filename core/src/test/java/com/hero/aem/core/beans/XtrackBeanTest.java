package com.hero.aem.core.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
class XtrackBeanTest {

    private String event;
    private String name;
    private String age;
    private String email;
    private String mobile;
    private String vehicle;
    private String address;
    private String fbHandle;
    private String tweetHandle;
    private String instaHandle;
    private String dataRider;
    private String riderCommunityName;
    private String smsText;

    @InjectMocks
    private XtrackBean xtrackBean;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        xtrackBean.setName(name);
        xtrackBean.setAge(age);
        xtrackBean.setEmail(email);
        xtrackBean.setEvent(event);
        xtrackBean.setMobile(mobile);
        xtrackBean.setSmsText(smsText);
        xtrackBean.setVehicle(vehicle);
        xtrackBean.setAddress(address);
        xtrackBean.setFbHandle(fbHandle);
        xtrackBean.setInstaHandle(instaHandle);
        xtrackBean.setTweetHandle(tweetHandle);
        xtrackBean.setDataRider(dataRider);
        xtrackBean.setRiderCommunityName(riderCommunityName);

    }

    @Test
    void getTestResult() {
        assertEquals(name, xtrackBean.getName());
        assertEquals(event, xtrackBean.getEvent());
        assertEquals(age, xtrackBean.getAge());
        assertEquals(email, xtrackBean.getEmail());
        assertEquals(mobile, xtrackBean.getMobile());
        assertEquals(vehicle, xtrackBean.getVehicle());
        assertEquals(address, xtrackBean.getAddress());
        assertEquals(fbHandle, xtrackBean.getFbHandle());
        assertEquals(tweetHandle, xtrackBean.getTweetHandle());
        assertEquals(instaHandle, xtrackBean.getInstaHandle());
        assertEquals(dataRider, xtrackBean.getDataRider());
        assertEquals(riderCommunityName, xtrackBean.getRiderCommunityName());
        assertEquals(smsText, xtrackBean.getSmsText());

    }



}