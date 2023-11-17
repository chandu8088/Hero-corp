package com.hero.aem.core.servlets;


import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.hero.aem.core.beans.PricePromisePartsBean;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import com.hero.aem.core.services.osgiconfigs.HeroAPIEndPointsConfigurations;
import com.hero.aem.core.util.StaticWrapper;
import org.apache.commons.io.IOUtils;
import org.apache.commons.text.StringSubstitutor;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
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
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Component(service = Servlet.class, immediate = true, property = {
    Constants.SERVICE_DESCRIPTION + "=Service Mock Test servlet",
    ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/content/price-promise",
    ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/structure/page",
    ServletResolverConstants.SLING_SERVLET_SELECTORS + "=pricepromiseparts",
    ServletResolverConstants.SLING_SERVLET_SELECTORS + "=pricepromisedealers",
    ServletResolverConstants.SLING_SERVLET_SELECTORS + "=pricepromisecities",
    ServletResolverConstants.SLING_SERVLET_EXTENSIONS + "=json",
    ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST })
public class PricePromisePartsServlet extends SlingAllMethodsServlet {
    
    private static final long serialVersionUID = 4438376868274173005L;

    private static final Logger log = LoggerFactory.getLogger(PricePromisePartsServlet.class);

    public static final String PARTS_CONSTANT = "{\n" +
            "\"PWSESSIONRS\": {\n" +
            "  \"PWPROCESSRS\": {\n" +
            "    \"PWDATA\": {\n" +
            "      \"get_pmp_parts\": {\n" +
            "        \"Row\": [\n" +
            "          {\n" +
            "            \"0\": \"${dealerCode}\",\n" +
            "            \"1\": \"${serviceNature}\",\n" +
            "            \"2\": \"${serviceType}\",\n" +
            "            \"3\": \"${model}\"\n" +
            "          }\n" +
            "        ]\n" +
            "      }\n" +
            "    },\n" +
            "    \"PWERROR\": {},\n" +
            "      \"PWHEADER\": {\n" +
            "        \"LOGIN_ID\": \"983cbae056bf020530b1be6d9c97d022\",\n"+
            "        \"APP_ID\": \"${appid}\",\n" +
            "        \"ORG_ID\": \"${orgid}\",\n" +
            "        \"IN_PROCESS_ID\": \"1\",\n" +
            "        \"OUT_PROCESS_ID\": \"get_pmp_parts\"\n" +
            "      }\n" +
            "    }\n" +
            "  }\n" +
            "}";
    public static final String CITIES_CONSTANT = "{\n" +
            "\"PWSESSIONRS\": {\n" +
            "  \"PWPROCESSRS\": {\n" +
            "    \"PWDATA\": {\n" +
            "      \"getDealerCities\": {\n" +
            "        \"Row\": [\n" +
            "          {\n" +
            "            \"0\": \"${state}\",\n" +
            "          }\n" +
            "        ]\n" +
            "      }\n" +
            "    },\n" +
            "    \"PWERROR\": {},\n" +
            "      \"PWHEADER\": {\n" +
            "        \"LOGIN_ID\": \"983cbae056bf020530b1be6d9c97d022\",\n"+
            "        \"APP_ID\": \"${appid}\",\n" +
            "        \"ORG_ID\": \"${orgid}\",\n" +
            "        \"IN_PROCESS_ID\": \"1\",\n" +
            "        \"OUT_PROCESS_ID\": \"getDealerCities\"\n" +
            "      }\n" +
            "    }\n" +
            "  }\n" +
            "}";

    public static final String DEALER_CONSTANT = "{\n" +
            "\"PWSESSIONRS\": {\n" +
            "  \"PWPROCESSRS\": {\n" +
            "    \"PWDATA\": {\n" +
            "      \"getDealers\": {\n" +
            "        \"Row\": [\n" +
            "          {\n" +
            "            \"0\": \"${state}\",\n" +
            "            \"1\": \"${city}\",\n" +
            "          }\n" +
            "        ]\n" +
            "      }\n" +
            "    },\n" +
            "    \"PWERROR\": {},\n" +
            "      \"PWHEADER\": {\n" +
            "        \"LOGIN_ID\": \"983cbae056bf020530b1be6d9c97d022\",\n"+
            "        \"APP_ID\": \"${appid}\",\n" +
            "        \"ORG_ID\": \"${orgid}\",\n" +
            "        \"IN_PROCESS_ID\": \"1\",\n" +
            "        \"OUT_PROCESS_ID\": \"getDealers\"\n" +
            "      }\n" +
            "    }\n" +
            "  }\n" +
            "}";

            @Reference
            transient APIConfigurations apiConfigurations;
            @Reference
            transient HeroAPIEndPointsConfigurations apiEndPointsConfigurations;
        
            ObjectMapper objectMapper;
        
            transient StaticWrapper httpGetWrapper = new StaticWrapper();
        
            @Activate
            public void activate() {
                objectMapper = new ObjectMapper();
                objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            }
        
            /**
             * Logger
             */
        
            @Override
            protected void doPost(final SlingHttpServletRequest req, final SlingHttpServletResponse resp)
                    throws ServletException, IOException {
        
                JsonObject input = httpGetWrapper
                        .getJsonFromString(IOUtils.toString(req.getInputStream(), StandardCharsets.UTF_8));
                final PricePromisePartsBean pricePromisePartsBean = objectMapper.readValue(input.toString(),
                        PricePromisePartsBean.class);
                CloseableHttpClient httpClient = httpGetWrapper.createDefaultHttpClient();
                try {
                    HttpPost httpPost = new HttpPost(apiEndPointsConfigurations.getConfigProperty("getPricePromiseAPI"));
                    Map<String, String> requestMap = new HashMap<String, String>();
                    String selector = req.getRequestPathInfo().getSelectorString();
                    String finalReq = "";
                    if("pricepromiseparts".equals(selector)) {
                        requestMap.put("dealerCode", pricePromisePartsBean.getDealerCode());
                        requestMap.put("serviceNature", pricePromisePartsBean.getServiceNature());
                        requestMap.put("serviceType", pricePromisePartsBean.getServiceType());
                        requestMap.put("model", pricePromisePartsBean.getModel());
                        requestMap.put("appid", apiConfigurations.getConfigProperty("pricepromiseappid").toString());
                        requestMap.put("orgid", apiConfigurations.getConfigProperty("pricepromiseorgid").toString());

                        StringSubstitutor sub = new StringSubstitutor(requestMap);
                        finalReq = sub.replace(PARTS_CONSTANT);
                    }
                    else if("pricepromisecities".equals(selector)){
                        requestMap.put("state", pricePromisePartsBean.getState());
                        requestMap.put("appid", apiConfigurations.getConfigProperty("pricepromiseappid").toString());
                        requestMap.put("orgid", apiConfigurations.getConfigProperty("pricepromiseorgid").toString());
                        StringSubstitutor sub = new StringSubstitutor(requestMap);
                        finalReq = sub.replace(CITIES_CONSTANT);
                    }
                    else if("pricepromisedealers".equals(selector)){
                        requestMap.put("state", pricePromisePartsBean.getState());
                        requestMap.put("city", pricePromisePartsBean.getCity());
                        requestMap.put("appid", apiConfigurations.getConfigProperty("pricepromiseappid").toString());
                        requestMap.put("orgid", apiConfigurations.getConfigProperty("pricepromiseorgid").toString());
                        StringSubstitutor sub = new StringSubstitutor(requestMap);
                        finalReq = sub.replace(DEALER_CONSTANT);
                    }
                    log.info("Price Promise Parts Request Sent--"+finalReq);
                    StringEntity entity = new StringEntity(finalReq);
                    httpPost.setEntity(entity);
                    httpPost.setHeader("Content-type", "application/json");
                    httpPost.setHeader("Authorization",apiConfigurations.getConfigProperty("pricepromiseauthheader"));
                    CloseableHttpResponse response = httpClient.execute(httpPost);
                    String jsonVal = EntityUtils.toString(response.getEntity());
                    log.info("Price Promise Parts Response"+jsonVal);
                    resp.getWriter().write(jsonVal);
                }
                catch (IOException e) {
                    log.error("Exception in PricePromiseParts Servlet"+e.getMessage());
                }
                finally {
                    httpClient.close();
                }
            }

}
