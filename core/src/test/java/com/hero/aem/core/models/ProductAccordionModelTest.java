package com.hero.aem.core.models;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.hero.aem.core.beans.ProductAccordionBean;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ProductAccordionModelTest {

    @InjectMocks
    ProductAccordionModel productAccordionModel;

    @Mock
    private Resource resource;

    @Mock
    private Resource childResource;
    

    @BeforeEach
    void setUP() throws NoSuchFieldException, IllegalAccessException {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testInit() {
        ProductAccordionModel productAccordionModel = new ProductAccordionModel();
        productAccordionModel.init();
        assertTrue(productAccordionModel.getProductList().isEmpty());
    }

    @Test
    void testSetProductList() {
        ProductAccordionModel productAccordionModel = new ProductAccordionModel();
        productAccordionModel.setProductList(new ArrayList<>());
        assertTrue(productAccordionModel.getProductList().isEmpty());
    }

    @Test
    void testConstructor() {
        assertTrue((new ProductAccordionModel()).getProductList().isEmpty());
    }

    @Test
    void testGetProductMultifieldItemsWithNullResource(){
        productAccordionModel.getProductMultifieldItems(null);
    }

        @Test
    void testGetProductMultifieldItemsWithNotNullResource(){
        List<Resource> childList = new ArrayList<>();
        childList.add(0, childResource);
        when(resource.listChildren()).thenReturn(childList.iterator());
        ProductAccordionBean accBean = new ProductAccordionBean();
        accBean.setProductname("testProd");
        accBean.setProductlargepath(null);
        accBean.setProductthumbpath(null);
        when(childResource.adaptTo(ProductAccordionBean.class)).thenReturn(accBean);
        productAccordionModel.getProductMultifieldItems(resource);

    }
}

