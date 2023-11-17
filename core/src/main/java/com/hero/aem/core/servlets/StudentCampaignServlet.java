package com.hero.aem.core.servlets;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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
@SlingServletResourceTypes(resourceTypes = "hero-aem-website/components/structure/page", methods = HttpConstants.METHOD_POST, extensions = "json", selectors = "student-details")
public class StudentCampaignServlet extends SlingAllMethodsServlet {

    private static final Logger LOGGER = LoggerFactory.getLogger(StudentCampaignServlet.class);

    private static final String NAME = "Name";

    private static final String FILE1 = "File1";

    private static final String FILE2 = "File2";

    private static final String MOBILE = "Mobile";

    private static final String STATE = "State";

    private static final String CITY = "City";

    private static final String MODEL = "Model";

    private static final String SCHOOL_NAME = "SchoolName";



    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost httpPost = new HttpPost("https://worxpertise.in/HeroGD_API/api/InsertDetails");
        List<NameValuePair> params = new ArrayList<>();
        response.setContentType("application/json");
        params.add(new BasicNameValuePair(NAME,request.getParameter(NAME)));
        params.add(new BasicNameValuePair(FILE1,request.getParameter(FILE1)));
        params.add(new BasicNameValuePair(FILE2,request.getParameter(FILE2)));
        params.add(new BasicNameValuePair(MOBILE,request.getParameter(MOBILE)));
        params.add(new BasicNameValuePair(STATE,request.getParameter(STATE)));
        params.add(new BasicNameValuePair(CITY,request.getParameter(CITY)));
        params.add(new BasicNameValuePair(MODEL,request.getParameter(MODEL)));
        params.add(new BasicNameValuePair(SCHOOL_NAME,request.getParameter(SCHOOL_NAME)));
        httpPost.setEntity(new UrlEncodedFormEntity(params));
        HttpResponse httpResponse = httpClient.execute(httpPost);
        if (httpResponse.getStatusLine().getStatusCode() == 200) {
            JsonElement httpJsonElement = JsonParser.parseString(EntityUtils.toString(httpResponse.getEntity()));
            JsonObject httpJsonObject = httpJsonElement.getAsJsonObject();
            response.getWriter().write(httpJsonObject.toString());
        }
        else {
            LOGGER.error("error in student campaign servlet");
            response.sendError(500,"internal error");
        }
    }
}
