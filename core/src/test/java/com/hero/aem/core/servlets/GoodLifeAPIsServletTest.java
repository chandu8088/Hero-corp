package com.hero.aem.core.servlets;

import com.google.gson.JsonObject;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import com.hero.aem.core.util.StaticWrapper;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.sling.servlethelpers.MockSlingHttpServletRequest;
import org.apache.sling.servlethelpers.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import javax.servlet.ServletException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.when;

@ExtendWith(AemContextExtension.class)
class GoodLifeAPIsServletTest {

    @InjectMocks
    GoodLifeAPIsServlet goodLifeAPIsServlet;

    @Mock
    APIConfigurations apiConfigurations;

    Map<String, Object> configProperties = new HashMap<>();

    @Mock
    CloseableHttpClient httpClient;

    @Mock
    HttpGet httpGet;

    @Mock
    CloseableHttpResponse clientResponse;

    @Mock
    StaticWrapper httpGetWrapper;
    JsonObject jobj = new JsonObject();

    @BeforeEach
    void init() throws IOException {
        MockitoAnnotations.openMocks(this);
        when(httpGetWrapper.getHttpGet("http://localhost:4502/api")).thenReturn(httpGet);
        when(httpGetWrapper.createDefaultHttpClient()).thenReturn(httpClient);
        jobj.addProperty("apiName", "RideDetail");
        jobj.addProperty("requestBody", "Aamod Joshi");
        jobj.addProperty("processID", "9857585858");
    }

    @Test
    void testDoPost(AemContext aemContext) throws ServletException, IOException, URISyntaxException {
        MockSlingHttpServletRequest request = aemContext.request();
        MockSlingHttpServletResponse response = aemContext.response();
        when(httpGetWrapper.getJsonFromString(Mockito.anyString())).thenReturn(jobj);
        configProperties.put("getMMIEndPoint", "http://localhost:4502/api");
        configProperties.put("goodLifeEncPublicKey", "aleznasdasdasd");
        configProperties.put("getMMIClientID", "aleznasdasdasd");
        when(apiConfigurations.getConfigProperties()).thenReturn(configProperties);
        when(apiConfigurations.getConfigProperty("goodLifeEncPublicKey")).thenReturn("aleznasdasdasd");
        goodLifeAPIsServlet.doPost(request, response);
    }

}
