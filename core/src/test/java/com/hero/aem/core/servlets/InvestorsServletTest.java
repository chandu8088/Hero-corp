package com.hero.aem.core.servlets;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.ServletException;

import com.adobe.granite.asset.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.hero.aem.core.constants.HeroConstants;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.hero.aem.core.util.StaticWrapper;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class InvestorsServletTest {

    @InjectMocks
    InvestorsServlet investorsServlet;

    @Mock
    SlingHttpServletRequest request;

    @Mock
    SlingHttpServletResponse response;

    @Mock
    CloseableHttpClient httpClient;

    @Mock
    HttpPost httpPost;

    @Mock
    StaticWrapper httpGetWrapper;

    @Mock
    Resource resource;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    Query query;

    @Mock
    QueryBuilder queryBuilder;

    @Mock
    SearchResult searchResult;

    @Mock
    Asset asset;
    @Mock
    Resource imageResource;

    @Mock
    ValueMap valueMap;

    @Mock
    Session session;

    @Mock
    PrintWriter out;

    Map<String, String> map = new HashMap<>();

    private static final String JCR_CONTENT_METADATA = "/jcr:content/metadata";
    String[] categoryName = { "element" };

    @BeforeEach
    void init() throws IOException {
        MockitoAnnotations.openMocks(this);
        when(httpGetWrapper.getHttpPost("http://localhost:4502")).thenReturn(httpPost);
        when(httpGetWrapper.createDefaultHttpClient()).thenReturn(httpClient);
        map.put(HeroConstants.PATH, "test");
        map.put(HeroConstants.TYPE, DamConstants.NT_DAM_ASSET);
        map.put("test", "test");
    }

    private Hit mockHit(String path) throws RepositoryException {
        Hit hit = mock(Hit.class);
        when(hit.getPath()).thenReturn(path);
        when(hit.getResource()).thenReturn(resource);
        when(resource.adaptTo(Asset.class)).thenReturn(asset);
        return hit;
    }

    @Test
    public void folderName_ShouldReturnCorrectName() {
        String assetPath1 = "some/path/element";
        String expectedName1 = "element";
        String actualName1 = investorsServlet.folderName(assetPath1, categoryName);
        assertEquals(expectedName1, actualName1);
        String assetPath2 = "some/path/other";
        String[] categoryName2 = { "element", "another" };
        String expectedName2 = "";
        String actualName2 = investorsServlet.folderName(assetPath2, categoryName2);
        assertEquals(expectedName2, actualName2);
    }

    @Test
    void doPost() throws ServletException, IOException, RepositoryException {
        when(request.getParameter("investorsCategory")).thenReturn("test");
        when(request.getParameterValues("categoryName")).thenReturn(categoryName);
        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
        when(queryBuilder.createQuery(Mockito.any(PredicateGroup.class), Mockito.any(Session.class)))
            .thenReturn(query);
        when(query.getResult()).thenReturn(searchResult);
        List<Hit> hits=new ArrayList<>();
        hits.add(mockHit("/content/page1"));
        when(searchResult.getHits()).thenReturn(hits);
        when(imageResource.getValueMap()).thenReturn(valueMap);
        when(resourceResolver.getResource("/content/tests/abc"+JCR_CONTENT_METADATA)).thenReturn(imageResource);
        when(asset.getPath()).thenReturn("/content/tests/abc");
        when(response.getWriter()).thenReturn(out);
        investorsServlet.doGet(request,response);
    }

}