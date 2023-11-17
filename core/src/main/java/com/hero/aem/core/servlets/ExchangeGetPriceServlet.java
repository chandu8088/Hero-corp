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
        Constants.SERVICE_DESCRIPTION + "=Exchange Journey get Price servlet",
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/content/exchangeformsteps",
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/structure/page",
        ServletResolverConstants.SLING_SERVLET_SELECTORS + "=exchangegetprice",
        ServletResolverConstants.SLING_SERVLET_SELECTORS + "=exgetmodelmapprice",
        ServletResolverConstants.SLING_SERVLET_SELECTORS + "=submitexchange",
        ServletResolverConstants.SLING_SERVLET_EXTENSIONS + "=json",
        ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST })
public class ExchangeGetPriceServlet extends SlingAllMethodsServlet {
    /**
     * Generated serialVersionUID
     */
    private static final long serialVersionUID = 4438376868274173005L;
    private static final Logger log = LoggerFactory.getLogger(ExchangeGetPriceServlet.class);

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
            List<NameValuePair> form = new ArrayList<>();
            HttpPost httpPost = null;
            String selector = req.getRequestPathInfo().getSelectorString();
            if("exchangegetprice".equals(selector)) {
                httpPost = new HttpPost(apiEndpointConfigurations.getConfigProperty("getExchangePriceAPI"));
                form.add(new BasicNameValuePair("year_of_mfg", req.getParameter("year_of_mfg")));
                form.add(new BasicNameValuePair("city", req.getParameter("city")));
                form.add(new BasicNameValuePair("state", req.getParameter("state")));
                form.add(new BasicNameValuePair("make", req.getParameter("make")));
                form.add(new BasicNameValuePair("model", req.getParameter("model")));
                form.add(new BasicNameValuePair("month", req.getParameter("month")));
                form.add(new BasicNameValuePair("vehicle_type", req.getParameter("vehicle_type")));
                form.add(new BasicNameValuePair("smoke", req.getParameter("smoke")));
                form.add(new BasicNameValuePair("starting", req.getParameter("starting")));
                form.add(new BasicNameValuePair("light_indicator", req.getParameter("light_indicator")));
                form.add(new BasicNameValuePair("front_tyre", req.getParameter("front_tyre")));
                form.add(new BasicNameValuePair("rear_tyre", req.getParameter("rear_tyre")));
                form.add(new BasicNameValuePair("body_part", req.getParameter("body_part")));
                form.add(new BasicNameValuePair("name", req.getParameter("name")));
                form.add(new BasicNameValuePair("phone", req.getParameter("phone")));
                form.add(new BasicNameValuePair("pincode", req.getParameter("pincode")));
            }
            if("exgetmodelmapprice".equals(selector)) {
                httpPost = new HttpPost(apiEndpointConfigurations.getConfigProperty("getExchangeModelMapAPI"));
                form.add(new BasicNameValuePair("year_of_mfg", req.getParameter("year_of_mfg")));
                form.add(new BasicNameValuePair("city", req.getParameter("city")));
                form.add(new BasicNameValuePair("state", req.getParameter("state")));
                form.add(new BasicNameValuePair("make", req.getParameter("make")));
                form.add(new BasicNameValuePair("model", req.getParameter("model")));
                form.add(new BasicNameValuePair("month", req.getParameter("month")));
                form.add(new BasicNameValuePair("vehicle_type", req.getParameter("vehicle_type")));
                form.add(new BasicNameValuePair("smoke", req.getParameter("smoke")));
                form.add(new BasicNameValuePair("starting", req.getParameter("starting")));
                form.add(new BasicNameValuePair("light_indicator", req.getParameter("light_indicator")));
                form.add(new BasicNameValuePair("front_tyre", req.getParameter("front_tyre")));
                form.add(new BasicNameValuePair("rear_tyre", req.getParameter("rear_tyre")));
                form.add(new BasicNameValuePair("body_part", req.getParameter("body_part")));
                form.add(new BasicNameValuePair("name", req.getParameter("name")));
                form.add(new BasicNameValuePair("phone", req.getParameter("phone")));
                form.add(new BasicNameValuePair("pincode", req.getParameter("pincode")));
            }
            if("submitexchange".equals(selector)){
                httpPost = new HttpPost(apiEndpointConfigurations.getConfigProperty("submitExchangeDetailsAPI"));
                form.add(new BasicNameValuePair("enquiry_id", req.getParameter("enquiry_id")));
                form.add(new BasicNameValuePair("dealer_id", req.getParameter("dealer_id")));
                form.add(new BasicNameValuePair("model", req.getParameter("model")));
            }
            UrlEncodedFormEntity entity = new UrlEncodedFormEntity(form, Consts.UTF_8);
            httpPost.setEntity(entity);
            httpPost.setHeader("App-Name", apiConfigurations.getConfigProperty("exchangeJourneyAppName"));
            httpPost.setHeader("App-Token", apiConfigurations.getConfigProperty("exchangeJourneyAppToken"));
            httpPost.setHeader("Content-type", "application/x-www-form-urlencoded");
            CloseableHttpResponse response = httpClient.execute(httpPost);
            String jsonVal = EntityUtils.toString(response.getEntity());
            log.info("Exchange Journey Price Response" + jsonVal);
            resp.getWriter().write(jsonVal);
        } catch (IOException e) {
            log.error("Exception in Exchange Journey Get Price Servlet" + e.getMessage());
        } finally {
            httpClient.close();
        }
    }
}
