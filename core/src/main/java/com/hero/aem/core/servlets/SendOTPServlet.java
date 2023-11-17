package com.hero.aem.core.servlets;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import com.hero.aem.core.services.MessagingService;
import org.osgi.framework.Constants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.JsonObject;
import com.hero.aem.core.constants.HeroConstants;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import com.hero.aem.core.util.StaticWrapper;

@SuppressWarnings("serial")
@Component(service = Servlet.class, immediate = true, property = {
        Constants.SERVICE_DESCRIPTION + "=Send OTP based on random session_id",
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=" + ServletResolverConstants.DEFAULT_RESOURCE_TYPE,
        ServletResolverConstants.SLING_SERVLET_SELECTORS + "=sendotp",
        ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST })
public class SendOTPServlet extends SlingAllMethodsServlet {
    private static final long serialVersionUID = 4438376868274173005L;

    private static final Logger log = LoggerFactory.getLogger(SendOTPServlet.class);

    @Reference
    transient APIConfigurations apiConfigurations;

    @Reference
    transient MessagingService messagingService;

    transient StaticWrapper httpGetWrapper = new StaticWrapper();

    @Override
    protected void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
            throws ServletException, IOException {
        String phoneNum = request.getParameter(HeroConstants.REQ_PARAM_PHONE_NUMBER);
        String pageType = request.getParameter(HeroConstants.REQ_PARAM_PAGE_TYPE);
        String vehicleName = request.getParameter(HeroConstants.REQ_PARAM_VEHICLE_NAME);
        String requestID = request.getParameter("reqID");
        String otp = String.format("%06d", Math.abs((phoneNum + requestID).hashCode()) % 1000000);
        String templateID = apiConfigurations.getConfigProperty(HeroConstants.OSGI_SENDSMSAPITEMPLATEIDHOME);
        String msgText = apiConfigurations.getConfigProperty(HeroConstants.OSGI_SENDSMSAPIMSGHOME).replace("{otp}",
                otp);
        if (!pageType.equals(HeroConstants.PAGE_TYPE_HOME)) {
            templateID = apiConfigurations.getConfigProperty(HeroConstants.OSGI_SENDSMSAPITEMPLATEIDPRODUCT);
            msgText = apiConfigurations.getConfigProperty(HeroConstants.OSGI_SENDSMSAPIMSGPRODUCT).replace("{otp}",
                    otp);
            msgText = msgText.replace("{vehicleName}", vehicleName);
        }
        String apiUrl = apiConfigurations.getConfigProperty(HeroConstants.OSGI_SENDSMSAPIURL);
        HttpGet httpGet = httpGetWrapper.getHttpGet(apiUrl);
        CloseableHttpClient httpClient = httpGetWrapper.createDefaultHttpClient();
        try {
            URI uri = new URIBuilder(httpGet.getURI())
                    .addParameter("username", apiConfigurations.getConfigProperty("sendSMSAPIUsername"))
                    .addParameter("password", apiConfigurations.getConfigProperty("sendSMSAPIPassword"))
                    .addParameter("to", phoneNum)
                    .addParameter("from", apiConfigurations.getConfigProperty(HeroConstants.OSGI_SENDSMSAPIFROMNAME))
                    .addParameter("text", msgText).addParameter("dlt_templateid", templateID).build();
            ((HttpRequestBase) httpGet).setURI(uri);
            CloseableHttpResponse smsAPIResponse = httpClient.execute(httpGet);
            JsonObject output = new JsonObject();
            output.addProperty("smsResult", EntityUtils.toString(smsAPIResponse.getEntity()));
            log.info("Old smsResult", output.toString());
            String msg = messagingService.sendSMS(phoneNum,msgText,templateID);
            response.getWriter().write(msg);
        } catch (URISyntaxException e) {
            log.error("....SendOTP servlet failed ......", e);
        } finally {
            httpClient.close();
        }
    }
}
