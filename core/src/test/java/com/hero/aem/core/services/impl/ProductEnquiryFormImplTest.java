package com.hero.aem.core.services.impl;

import com.hero.aem.core.beans.ProductEnquiryBean;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import com.hero.aem.core.services.MessagingService;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;

class ProductEnquiryFormImplTest {

    @InjectMocks
    ProductEnquiryFormImpl productEnquiryForm;

    @Mock
    APIConfigurations apiConfigurations;

    @Mock
    MessagingService messagingService;

    @Mock
    URL url;

    Map<String, Object> configProperties = new HashMap<>();

    @BeforeEach
    void init() throws IOException {
        MockitoAnnotations.openMocks(this);
        configProperties.put("getProductEnquiryAPIURL", "apiUrl");
        configProperties.put("sendSMSAPI", "smsApi");
    }

    @Test
    @Disabled
    void testGenerateXML() {
        ProductEnquiryFormImpl productEnquiryFormImpl = new ProductEnquiryFormImpl();

        ProductEnquiryBean productEnquiryBean = new ProductEnquiryBean();

        assertNull(productEnquiryFormImpl.GenerateXML(productEnquiryBean));
    }

    @Test
    void testProcessSOAPRequest() {
        lenient().when(apiConfigurations.getConfigProperties()).thenReturn(configProperties);
        lenient().when(apiConfigurations.getConfigProperty("getProductEnquiryAPIURL"))
            .thenReturn("https://localhost:4502/api");
        productEnquiryForm.ProcessSOAPRequest("Xml Input");
    }

    @Test
    void testSendSMS() throws IOException {
        lenient().when(apiConfigurations.getConfigProperties()).thenReturn(configProperties);
        lenient().when(apiConfigurations.getConfigProperty("sendSMSAPI")).thenReturn("test");
        lenient().when(messagingService.sendSMS(anyString(), anyString(), anyString())).thenReturn("Text");
        productEnquiryForm.SendSMS("42", "Vehicle Model");
    }
}

