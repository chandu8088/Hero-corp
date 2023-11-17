package com.hero.aem.core.servlets;

import com.adobe.granite.asset.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hero.aem.core.constants.HeroConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component(service = {Servlet.class})
@SlingServletResourceTypes(resourceTypes = "hero-aem-website/components/structure/page", methods = HttpConstants.METHOD_GET, extensions = "json", selectors = "accessories")
public class AccessoriesServlet extends SlingSafeMethodsServlet {

    private static final Logger LOGGER = LoggerFactory.getLogger(AccessoriesServlet.class);


    private static final String MODEL = "model";

    private static final String CATEGORY = "category";

    private static final String DESCRIPTION = "description";

    private static final String PART_NO = "part-no";

    private static final String ESHOP = "eshop";

    private static final String IMAGES = "images";

    private static final String METADATA_PATH = "jcr:content/metadata";

    private static final String NAME = "name";

    private static final String P_LIMIT = "p.limit";

    private static final String P_LIMIT_VALUE = "-1";
    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        String accessoriesPath = request.getParameter("accessoriesPath");
        if (accessoriesPath == null) {
            accessoriesPath = "/content/dam/hero-aem-website/accessories";
        }
        ResourceResolver resourceResolver = request.getResourceResolver();
        QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
        List<Map<String, String>> metaDataArray = new ArrayList<>();
        if (resourceResolver != null) {
            Map<String, String> map = new HashMap<>();
            map.put(HeroConstants.PATH, accessoriesPath);
            map.put(HeroConstants.TYPE, DamConstants.NT_DAM_ASSET);
            map.put(P_LIMIT, P_LIMIT_VALUE);
            try {
                Query query = queryBuilder.createQuery(PredicateGroup.create(map),
                        resourceResolver.adaptTo(Session.class));
                SearchResult result = query.getResult();
                for (final Hit hit : result.getHits()) {
                    Asset asset = hit.getResource().adaptTo(Asset.class);
                    Resource assetResource = resourceResolver.getResource(asset.getPath());
                    Resource metaDataResource = assetResource.getChild(METADATA_PATH);
                    Map<String, String> meteDataMap = new HashMap<>();
                    meteDataMap.put(NAME, assetResource.getName());
                    meteDataMap.put(HeroConstants.TYPE, metaDataResource.getValueMap().get(HeroConstants.TYPE, StringUtils.EMPTY));
                    meteDataMap.put(MODEL, metaDataResource.getValueMap().get(MODEL, StringUtils.EMPTY));
                    meteDataMap.put(CATEGORY, metaDataResource.getValueMap().get(CATEGORY, StringUtils.EMPTY));
                    meteDataMap.put(DESCRIPTION, metaDataResource.getValueMap().get(DESCRIPTION, StringUtils.EMPTY));
                    meteDataMap.put(PART_NO, metaDataResource.getValueMap().get(PART_NO, StringUtils.EMPTY));
                    meteDataMap.put(ESHOP, metaDataResource.getValueMap().get(ESHOP, StringUtils.EMPTY));
                    meteDataMap.put(IMAGES, metaDataResource.getValueMap().get(IMAGES, StringUtils.EMPTY));
                    metaDataArray.add(meteDataMap);
                }
            } catch (RepositoryException e) {
                LOGGER.error("Error in Accessories Servlet {0}", e);
                response.sendError(SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error occurred while retrieving accessories data");
            }
        }
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(metaDataArray);
        response.setHeader("Cache-Control", "max-age=5184000");
        response.getWriter().write(jsonString);
    }

}
