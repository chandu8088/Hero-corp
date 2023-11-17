package com.hero.aem.core.servlets;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.JsonObject;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

@ExtendWith(AemContextExtension.class)
class StateCityListServletTest {

    ArrayList cityList = new ArrayList<String>();
    String state;

    @InjectMocks
    StateCityListServlet stateCityListServlet;

    @Mock
    SlingHttpServletResponse response;

    @Mock
    SlingHttpServletRequest request;

    @Mock
    ResourceResolver res;

    @Mock
    Resource statesRes;

    @Mock
    Node node;

    @Mock
    Node node1;

    @Mock
    NodeIterator it;

    @Mock
    NodeIterator childIt;

    @Mock
    Property property;

    @Mock
    JsonObject obj;

    @Mock
    Node cityNode;

    @Mock
    PrintWriter printWriter;


    @BeforeEach
    void init() throws IOException {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void doGet() throws ServletException, IOException, RepositoryException {
        when(request.getResourceResolver()).thenReturn(res);
        when(res.getResource("/content/hmc/dealers/in/dlr")).thenReturn(statesRes);
        when(statesRes.adaptTo(Node.class)).thenReturn(node);
        when(node.getNodes()).thenReturn(it);
        when(it.hasNext()).thenReturn(true,false);
        when(it.nextNode()).thenReturn(node1);
        when(node1.getNodes()).thenReturn(childIt);
        when(node1.getProperty("state_name")).thenReturn(property);
        when(property.getString()).thenReturn("state");
        when(childIt.hasNext()).thenReturn(true,false);
        when(childIt.nextNode()).thenReturn(cityNode);
        when(cityNode.getProperty("city")).thenReturn(property);
        when(property.getString()).thenReturn("cityList");
        when(response.getWriter()).thenReturn(printWriter);
        stateCityListServlet.doGet(request,response);

    }

}