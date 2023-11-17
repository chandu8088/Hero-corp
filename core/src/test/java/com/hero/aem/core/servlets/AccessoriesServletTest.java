package com.hero.aem.core.servlets;

import com.adobe.granite.asset.api.Asset;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.RepositoryException;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class AccessoriesServletTest {

    @InjectMocks
    private AccessoriesServlet servlet = new AccessoriesServlet();

    @Mock
    private transient QueryBuilder queryBuilder;
    ;

    @Mock
    private ResourceResolver resourceResolver;
    @Mock
    private SearchResult searchResult;

    @Mock
    private Query query;

    @Mock
    SlingHttpServletRequest request;

    @Mock
    SlingHttpServletResponse response;

    private List<Resource> queryResults = new ArrayList<>();
    private final AemContext aemContext = new AemContext(ResourceResolverType.JCR_MOCK);

    @BeforeEach
    public void setUp() {
        servlet = new AccessoriesServlet();
    }

    @Test
    void testDoGet() throws ServletException, IOException, RepositoryException {
        request = mock(SlingHttpServletRequest.class);
        response = new MockSlingHttpServletResponse();
        when(resourceResolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);
        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(queryBuilder.createQuery(any(), any())).thenReturn(query);
        when(query.getResult()).thenReturn(searchResult);
        Hit hit1 = mock(Hit.class);
        Hit hit2 = mock(Hit.class);
        Asset asset = mock(Asset.class);
        when(searchResult.getHits()).thenReturn(Arrays.asList(new Hit[]{hit1, hit2}));
        Resource assetResource1 = mock(Resource.class);
        Resource assetResource2 = mock(Resource.class);
        Resource metaDataResource2 = mock(Resource.class);
        when(hit2.getResource()).thenReturn(assetResource2);
        when(assetResource2.getChild(anyString())).thenReturn(metaDataResource2);
        when(metaDataResource2.getValueMap()).thenReturn(mock(ValueMap.class));
        when(metaDataResource2.getValueMap().get(anyString(), anyString())).thenReturn("value2");
        when(hit1.getResource()).thenReturn(assetResource1);
        when(hit1.getResource().adaptTo(Asset.class)).thenReturn(mock(Asset.class));
        when(assetResource2.adaptTo(Asset.class)).thenReturn(asset);
        when(assetResource1.adaptTo(Asset.class)).thenReturn(asset);
        when(asset.getPath()).thenReturn("/content/dam");
        when(resourceResolver.getResource(anyString())).thenReturn(assetResource2);
        when(assetResource2.getName()).thenReturn("asset1");
        servlet.doGet(request, response);
    }

    @Test
    void testDoGetWithException() throws ServletException, IOException, RepositoryException {
        request = mock(SlingHttpServletRequest.class);
        response = new MockSlingHttpServletResponse();
        when(resourceResolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);
        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(queryBuilder.createQuery(any(), any())).thenReturn(query);
        when(query.getResult()).thenAnswer(invocation -> {
            throw new RepositoryException("Test exception");
        });
        servlet.doGet(request, response);
    }
}
