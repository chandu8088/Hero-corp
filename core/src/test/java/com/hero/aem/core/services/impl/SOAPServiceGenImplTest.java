package com.hero.aem.core.services.impl;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.lenient;
import com.hero.aem.core.services.MessagingService;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class SOAPServiceGenImplTest {

    @InjectMocks
    SOAPServiceGenImpl soapServiceGen;

    @Mock
    APIConfigurations apiConfigurations;

    @Mock
    URL url;

    Map<String, Object> configProperties = new HashMap<>();

    @BeforeEach
    void init() throws IOException {
        MockitoAnnotations.openMocks(this);
        configProperties.put("getProductEnquiryAPIURL", "apiUrl");
    }

    @Test
    void testProcessSOAPRequest() throws IOException, URISyntaxException, SAXException, ParserConfigurationException {
        lenient().when(apiConfigurations.getConfigProperties()).thenReturn(configProperties);
        lenient().when(apiConfigurations.getConfigProperty("getProductEnquiryAPIURL"))
            .thenReturn("https://localhost:4502/api");
        soapServiceGen.ProcessSOAPRequest("Xml Input");
    }

}
