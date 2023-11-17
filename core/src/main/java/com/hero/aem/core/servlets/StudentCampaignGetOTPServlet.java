package com.hero.aem.core.servlets;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component(service = {Servlet.class})
@SlingServletResourceTypes(resourceTypes = "hero-aem-website/components/structure/page", methods = HttpConstants.METHOD_POST, extensions = "json", selectors = "getOtp")
public class StudentCampaignGetOTPServlet extends SlingAllMethodsServlet {

    private static final Logger LOGGER = LoggerFactory.getLogger(StudentCampaignGetOTPServlet.class);

    private static final String SEARCH_BY = "searchby";

    private static final String TYPE = "type";

    private static final String OTP = "otp";


    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        String mobileNumber = request.getParameter(SEARCH_BY);
        String type = request.getParameter(TYPE);
        String otp = request.getParameter(OTP);
        response.setContentType("application/json");
        String apiResponse = getAPIResponse(mobileNumber,type,otp);
        response.getWriter().write(apiResponse);
    }

    private String getAPIResponse(String mobileNumber, String type, String otp) {
        List<NameValuePair> params = new ArrayList<>();
        String apiUrl = StringUtils.isEmpty(type) && StringUtils.isEmpty(otp) ? "https://worxpertise.in/HeroGD_API/api/GetOTP" : "https://worxpertise.in/HeroGD_API/api/GetDetail";
        if (StringUtils.isNotEmpty(type) && StringUtils.isNotEmpty(otp)) {
            params.add(new BasicNameValuePair(TYPE, type));
            params.add(new BasicNameValuePair(OTP, otp));
        }
        try {
            CloseableHttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost httpPost = new HttpPost(apiUrl);
            params.add(new BasicNameValuePair(SEARCH_BY, mobileNumber));
            httpPost.setEntity(new UrlEncodedFormEntity(params));
            HttpResponse httpResponse = httpClient.execute(httpPost);
            if (httpResponse.getStatusLine().getStatusCode() == 200) {
                JsonElement httpJsonElement = JsonParser.parseString(EntityUtils.toString(httpResponse.getEntity()));
                JsonObject httpJsonObject = httpJsonElement.getAsJsonObject();
                return httpJsonObject.toString();
            }
        } catch (IOException e) {
            LOGGER.error("error is student campaign Servlet",e);
            return "";
        }
        return "";
    }
}
