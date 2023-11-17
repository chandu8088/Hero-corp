package com.hero.aem.core.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.hero.aem.core.util.StaticWrapper;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.servlethelpers.MockSlingHttpServletRequest;
import org.apache.sling.servlethelpers.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import javax.servlet.ServletException;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@Disabled
@ExtendWith(AemContextExtension.class)
class ExchangeGetPriceServletTest {

    @InjectMocks
    ExchangeGetPriceServlet exchangeGetPriceServlet;
    @Mock
    SlingHttpServletRequest request;
    @Mock
    SlingHttpServletResponse response;
    @Mock
    ObjectMapper objectMapper;
    @Mock
    StaticWrapper httpGetWrapper;
    @Mock
    CloseableHttpClient httpClient;
    @Mock
    HttpPost httpPost;
    @Mock
    CloseableHttpResponse clientResponse;

    JsonObject jobj = new JsonObject();

    @BeforeEach
    void init() throws IOException {
        MockitoAnnotations.openMocks(this);
        when(httpGetWrapper.getHttpPost("http://localhost:4502")).thenReturn(httpPost);
        when(httpGetWrapper.createDefaultHttpClient()).thenReturn(httpClient);
        jobj.addProperty("year_of_mfg", "2017");
        jobj.addProperty("city", "GANDHINAGAR");
        jobj.addProperty("state", "GUJARAT");
        jobj.addProperty("make", "Hero");
        jobj.addProperty("model", "SPLENDOR +");
        jobj.addProperty("month", "02");
        jobj.addProperty("vehicle_type", "Motorcycle");
        jobj.addProperty("smoke", "Y");
        jobj.addProperty("starting", "Y");
        jobj.addProperty("light_indicator", "Y");
        jobj.addProperty("front_tyre", "Y");
        jobj.addProperty("rear_tyre", "Y");
        jobj.addProperty("body_part", "Y");
    }

    @Test
    void doPostTest(AemContext aemContext) throws ServletException,IOException {
        MockSlingHttpServletRequest req = aemContext.request();
        MockSlingHttpServletResponse res = aemContext.response();
        when(httpClient.execute(any(HttpPost.class))).thenReturn(clientResponse);
        HttpEntity httpEntity = new StringEntity("{\"success\":\"200\"}", "utf-8");
        when(clientResponse.getEntity()).thenReturn(httpEntity);
        when(httpGetWrapper.getJsonFromString(Mockito.anyString())).thenReturn(jobj);
        exchangeGetPriceServlet.activate();
        exchangeGetPriceServlet.doPost(req,res);
    }
}