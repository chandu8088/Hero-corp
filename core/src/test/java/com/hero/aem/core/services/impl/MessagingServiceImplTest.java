package com.hero.aem.core.services.impl;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.Node;
import com.day.cq.commons.mail.MailTemplate;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.google.gson.JsonObject;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import com.hero.aem.core.util.StaticWrapper;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class MessagingServiceImplTest {

    @InjectMocks
    MessagingServiceImpl messagingServiceImpl;

    @Mock
    ResourceResolver resolver;

    @Mock
    Node templateNode;

    @Mock
    Resource resource;

    @Mock
    MailTemplate mailTemplate;

    @Mock
    APIConfigurations apiConfigurations;

    @Mock
    StaticWrapper httpGetWrapper;

    @Mock
    HttpGet httpGet;

    @Mock
    CloseableHttpClient httpClient;

    @Mock
    CloseableHttpResponse smsAPIResponse;

    @Mock
    URI uri;

    Map<String, Object> configProperties = new HashMap<>();

    JsonObject jobj = new JsonObject();

    @BeforeEach
    void init() throws IOException {
        MockitoAnnotations.openMocks(this);
        configProperties.put("sendNEWSMSAPI", "fgfdshyhjreHTRE");
        configProperties.put("New smsResult", "fgfdshyhjreHTREewrwe");
    }

    @Test
    void testSms() throws IOException {
        when(apiConfigurations.getConfigProperties()).thenReturn(configProperties);
        when(apiConfigurations.getConfigProperty("sendNEWSMSAPI")).thenReturn("Test");
        when(httpGetWrapper.getHttpGet("Test")).thenReturn(httpGet);
        when(httpGetWrapper.createDefaultHttpClient()).thenReturn(httpClient);
        when(httpGet.getURI()).thenReturn(uri);
        when(httpClient.execute(httpGet)).thenReturn(smsAPIResponse);
        HttpEntity httpEntity = new StringEntity("{\"success\":\"200\"}", "utf-8");
        when(smsAPIResponse.getEntity()).thenReturn(httpEntity);
        messagingServiceImpl.sendSMS("12345","Hi", "1234");
    }

}
