package com.hero.aem.core.servlets;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.hero.aem.core.beans.ExchangeProspectAPIBean;
import com.hero.aem.core.beans.LeadGenerationAPIBean;
import com.hero.aem.core.services.SOAPServiceGen;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import com.hero.aem.core.services.osgiconfigs.HeroAPIEndPointsConfigurations;
import com.hero.aem.core.util.FormsUtils;
import com.hero.aem.core.util.StaticWrapper;
import org.apache.commons.io.IOUtils;
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

import javax.net.ssl.*;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.xml.soap.SOAPException;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;

@Component(service = Servlet.class, immediate = true, property = {
        Constants.SERVICE_DESCRIPTION + "=Exchange Journey Prospect API servlet",
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/content/exchangeformsteps",
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/structure/page",
        ServletResolverConstants.SLING_SERVLET_SELECTORS + "=exchangeprospect",
        ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST })
public class ExchangeProspectServlet extends SlingAllMethodsServlet {
    /**
     * Generated serialVersionUID
     */
    private static final long serialVersionUID = 4438376868274173005L;
    private static final Logger log = LoggerFactory.getLogger(ExchangeProspectServlet.class);

    @Reference
    transient SOAPServiceGen soapServiceGen;

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

        JsonObject input = httpGetWrapper
                .getJsonFromString(IOUtils.toString(req.getInputStream(), StandardCharsets.UTF_8));
        final ExchangeProspectAPIBean exchangeProspectAPIBean = objectMapper.readValue(input.toString(),
                ExchangeProspectAPIBean.class);

        CloseableHttpClient httpClient = httpGetWrapper.createDefaultHttpClient();
        try {
            String xml = soapServiceGen.GenerateExchangeXML(exchangeProspectAPIBean);
            log.info("Exchange Journey Prospect XML"+xml);
            String exchange_prospect_Resp = soapServiceGen.ProcessSOAPRequest(xml);
            log.info("Exchange Journey Prospect Response: "+exchange_prospect_Resp);
            resp.getWriter().write(exchange_prospect_Resp);
        } catch (IOException e) {
            log.error("Exception in Exchange Journey Prospect Servlet" + e.getMessage());
        } catch (SOAPException e) {
            log.error("SOAP Exception in Exchange Journey Prospect Servlet" + e.getMessage());
        } finally {
            httpClient.close();
        }
    }
}
