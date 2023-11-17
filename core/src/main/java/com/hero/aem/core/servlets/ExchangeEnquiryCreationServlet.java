package com.hero.aem.core.servlets;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import com.hero.aem.core.services.osgiconfigs.HeroAPIEndPointsConfigurations;
import com.hero.aem.core.util.FormsUtils;
import com.hero.aem.core.util.StaticWrapper;
import org.apache.http.HttpEntity;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.BufferedReader;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

@Component(service = Servlet.class, immediate = true, property = {
        Constants.SERVICE_DESCRIPTION + "=Exchange Journey Enquiry Creation servlet",
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/content/exchangeformsteps",
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/structure/page",
        ServletResolverConstants.SLING_SERVLET_SELECTORS + "=exchangeenquiry",
        ServletResolverConstants.SLING_SERVLET_EXTENSIONS + "=json",
        ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST })
public class ExchangeEnquiryCreationServlet extends SlingAllMethodsServlet {
    /**
     * Generated serialVersionUID
     */
    private static final long serialVersionUID = 4438376868274173005L;
    private static final Logger log = LoggerFactory.getLogger(ExchangeEnquiryCreationServlet.class);

    @Reference
    transient HeroAPIEndPointsConfigurations apiEndpointConfigurations;

    @Reference
    transient APIConfigurations apiConfigurations;

    ObjectMapper objectMapper;
    transient StaticWrapper httpGetWrapper = new StaticWrapper();

    @Activate
    public void activate() {
        objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }
    @Override
    protected void doPost(final SlingHttpServletRequest req, final SlingHttpServletResponse resp)
            throws ServletException, IOException {

        CloseableHttpClient httpClient = httpGetWrapper.createDefaultHttpClient();
        try {
            // FormsUtils.ValidateHostName();
            HttpPost httpPost = new HttpPost(apiEndpointConfigurations.getConfigProperty("exchangeEnquiryCreateAPI").toString());
            UsernamePasswordCredentials creds = new UsernamePasswordCredentials(apiConfigurations.getConfigProperty("exchangeenquiryusername").toString(), apiConfigurations.getConfigProperty("exchangeenquirypassword").toString());
            BasicCredentialsProvider provider = new BasicCredentialsProvider();
            provider.setCredentials(AuthScope.ANY, creds);
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = req.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            String requestBody = sb.toString();
            log.info("Exchange Journey Enquiry Creation Request: " + requestBody);
            HttpEntity httpEntity = new StringEntity(requestBody, "utf-8");
            httpPost.setEntity(httpEntity);
            httpPost.setHeader("Content-type", "application/json");
            CloseableHttpResponse response = httpClient.execute(httpPost);
            String jsonVal = EntityUtils.toString(response.getEntity());
            log.info("Exchange Journey Enquiry creation Response" + jsonVal);
            resp.getWriter().write(jsonVal);
        } catch (IOException e) {
            log.error("Exception in Exchange Journey Enquiry creation Servlet" + e.getMessage());
        // } 
        // catch (NoSuchAlgorithmException e) {
        //     log.error("No such Algorithm Error in Exchange Enquiry API"+ e.getMessage());
        // } catch (KeyManagementException e) {
        //     log.error("SSL error in Exchange Enquiry API"+ e.getMessage());
        } finally {
            httpClient.close();
        }
    }
}
