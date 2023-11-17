package com.hero.aem.core.servlets;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

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
import org.mockito.MockitoAnnotations;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hero.aem.core.services.osgiconfigs.HeroAPIEndPointsConfigurations;
import com.hero.aem.core.util.BookServiceUtils;
import com.hero.aem.core.util.StaticWrapper;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class BookServiceServletTest {

    @InjectMocks
    BookServiceServlet bookServiceServlet;

    @Mock
    BookServiceUtils bookServiceUtils;

    @Mock
    HeroAPIEndPointsConfigurations apiConfigurations;

    Map<String, Object> configProperties = new HashMap<>();

    Map<String, String> priceValues = new HashMap<>();

    @Mock
    CloseableHttpClient httpClient;

    @Mock
    HttpGet httpGet;

    @Mock
    CloseableHttpResponse clientResponse;

    @Mock
    StaticWrapper httpGetWrapper;

    ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void init() throws IOException {
        MockitoAnnotations.openMocks(this);
        when(httpGetWrapper.getHttpGet("http://localhost:4502/api")).thenReturn(httpGet);
        when(httpGetWrapper.createDefaultHttpClient()).thenReturn(httpClient);
    }

    @Test
    void testDoPost(AemContext aemContext) throws ServletException, IOException, URISyntaxException {
        MockSlingHttpServletRequest request = aemContext.request();
        MockSlingHttpServletResponse response = aemContext.response();
		aemContext.requestPathInfo().setSelectorString("bookservice1");
        bookServiceServlet.doPost(request, response);
    }

}
