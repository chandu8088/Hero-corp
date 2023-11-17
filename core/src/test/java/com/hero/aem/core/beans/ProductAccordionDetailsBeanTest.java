package com.hero.aem.core.beans;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

class ProductAccordionDetailsBeanTest {

    @Test
    void testSetProductThumbImages() {
        ProductAccordionDetailsBean productAccordionDetailsBean = new ProductAccordionDetailsBean();
        productAccordionDetailsBean.setProductThumbImages(new ArrayList<>());
        assertTrue(productAccordionDetailsBean.getProductThumbImages().isEmpty());
    }

    @Test
    void testSetProductLargeImages() {
        ProductAccordionDetailsBean productAccordionDetailsBean = new ProductAccordionDetailsBean();
        productAccordionDetailsBean.setProductLargeImages(new ArrayList<>());
        assertTrue(productAccordionDetailsBean.getProductLargeImages().isEmpty());
    }

    @Test
    void testConstructor() {
        ProductAccordionDetailsBean actualProductAccordionDetailsBean = new ProductAccordionDetailsBean();
        actualProductAccordionDetailsBean.setProductTitle("Dr");
        List<String> expectedProductThumbImages = actualProductAccordionDetailsBean.getProductLargeImages();
        assertSame(expectedProductThumbImages, actualProductAccordionDetailsBean.getProductThumbImages());
        assertEquals("Dr", actualProductAccordionDetailsBean.getProductTitle());
    }
}

