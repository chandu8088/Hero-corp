package com.hero.aem.core.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class ProductAccordionBeanTest {

    private String productname;
    private String productthumbpath;
    private String productlargepath;

    @InjectMocks
    private ProductAccordionBean productAccordionBean;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        productAccordionBean.setProductname(productname);
        productAccordionBean.setProductthumbpath(productthumbpath);
        productAccordionBean.setProductlargepath(productlargepath);
    }

    @Test
    void getTestResult() {
        assertEquals(productname,productAccordionBean.getProductname());
        assertEquals(productthumbpath,productAccordionBean.getProductthumbpath());
        assertEquals(productlargepath,productAccordionBean.getProductlargepath());
    }

}
