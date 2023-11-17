package com.hero.aem.core.servlets;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import com.hero.aem.core.services.osgiconfigs.HeroAPIEndPointsConfigurations;
import com.hero.aem.core.util.StaticWrapper;
import org.apache.http.Consts;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
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
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component(service = Servlet.class, immediate = true, property = {
        Constants.SERVICE_DESCRIPTION + "=Exchange Journey StateList servlet",
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/content/exchangeformsteps",
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/structure/page",
        ServletResolverConstants.SLING_SERVLET_SELECTORS + "=exchangedealerlist",
        ServletResolverConstants.SLING_SERVLET_EXTENSIONS + "=json",
        ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST })
public class ExchangeDealerListServlet extends SlingAllMethodsServlet {
    /**
     * Generated serialVersionUID
     */
    private static final long serialVersionUID = 4438376868274173005L;
    private static final Logger log = LoggerFactory.getLogger(ExchangeDealerListServlet.class);

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
            HttpPost httpPost = new HttpPost(apiEndpointConfigurations.getConfigProperty("getExchangeDealerAPI"));
            List<NameValuePair> form = new ArrayList< >();
            form.add(new BasicNameValuePair("state", req.getParameter("state")));
            form.add(new BasicNameValuePair("city", req.getParameter("city")));
            UrlEncodedFormEntity entity = new UrlEncodedFormEntity(form, Consts.UTF_8);
            httpPost.setEntity(entity);
            httpPost.setHeader("App-Name", apiConfigurations.getConfigProperty("exchangeJourneyAppName"));
            httpPost.setHeader("App-Token", apiConfigurations.getConfigProperty("exchangeJourneyAppToken"));
            CloseableHttpResponse response = httpClient.execute(httpPost);
            String jsonVal = EntityUtils.toString(response.getEntity());
            log.info("Exchange Journey DealerList Response" + jsonVal);
            resp.getWriter().write(jsonVal);
        } catch (IOException e) {
            log.error("Exception in Exchange Journey DealerList Servlet" + e.getMessage());
        } finally {
            httpClient.close();
        }
    }
}
