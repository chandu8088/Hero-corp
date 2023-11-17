package com.hero.aem.core.services.impl;

import com.hero.aem.core.beans.SuggestionSoapAPIBean;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;
import com.hero.aem.core.services.MessagingService;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.xml.sax.SAXException;

import static org.junit.jupiter.api.Assertions.assertNull;

import javax.xml.parsers.ParserConfigurationException;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class SuggestionsFormImplTest {

    @InjectMocks
    SuggestionsFormImpl suggestionsForm;

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
        configProperties.put("getSuggestionsAPIURL", "apiUrl");
        configProperties.put("sendSMSAPI", "smsApi");
    }

    @Test
    @Disabled
    void testGenerateXML() {
        SuggestionsFormImpl suggestionsFormImpl = new SuggestionsFormImpl();

        SuggestionSoapAPIBean suggestionSoapAPIBean = new SuggestionSoapAPIBean();
        
        suggestionSoapAPIBean.setAddressLine1("42 Main St");
        suggestionSoapAPIBean.setAddressLine2("42 Main St");
        suggestionSoapAPIBean.setCellularPhone("4105551212");
        suggestionSoapAPIBean.setCity("Oxford");
        suggestionSoapAPIBean.setComplaintCategory("Complaint Category");
        suggestionSoapAPIBean.setComplaintDesc("Complaint Desc");
        suggestionSoapAPIBean.setComplaintStream("Complaint Stream");
        suggestionSoapAPIBean.setDealerCity("Dealer City");
        suggestionSoapAPIBean.setDealerName("Dealer Name");
        suggestionSoapAPIBean.setDealerState("Dealer State");
        suggestionSoapAPIBean.setEmail("jane.doe@example.org");
        suggestionSoapAPIBean.setFirstName("Jane");
        suggestionSoapAPIBean.setHhmlVINNumber("42");
        suggestionSoapAPIBean.setLastName("Doe");
        suggestionSoapAPIBean.setMalfunctionDate("2020-03-01");
        suggestionSoapAPIBean.setOdometer("Odometer");
        suggestionSoapAPIBean.setPin("Pin");
        suggestionSoapAPIBean.setState("MD");
        suggestionSoapAPIBean.setTel("Tel");
        suggestionSoapAPIBean.setTown("Oxford");
        suggestionSoapAPIBean.setVehicleModel("Vehicle Model");
        suggestionSoapAPIBean.setVehicleRegdNo("Vehicle Regd No");
        assertNull(suggestionsFormImpl.GenerateXML(suggestionSoapAPIBean));
    }

    @Test
    void testProcessSOAPRequest() throws IOException, URISyntaxException, SAXException, ParserConfigurationException {
        lenient().when(apiConfigurations.getConfigProperties()).thenReturn(configProperties);
        lenient().when(apiConfigurations.getConfigProperty("getSuggestionsAPIURL"))
                .thenReturn("https://localhost:4502/api");
        suggestionsForm.ProcessSOAPRequest("Xml Input");
    }

    @Test
    void testSendSMS() throws IOException {
        lenient().when(apiConfigurations.getConfigProperties()).thenReturn(configProperties);
        lenient().when(apiConfigurations.getConfigProperty("sendSMSAPI")).thenReturn("test");
        lenient().when(messagingService.sendSMS(anyString(), anyString(), anyString())).thenReturn("Text");
        suggestionsForm.SendSMS("42");
    }
}

