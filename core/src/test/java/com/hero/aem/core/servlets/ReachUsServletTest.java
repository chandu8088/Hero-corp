package com.hero.aem.core.servlets;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import ch.qos.logback.classic.ViewStatusMessagesServlet;
import com.day.cq.commons.PathInfo;
import com.day.cq.wcm.foundation.forms.FormsHandlingRequest;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.deser.DefaultDeserializationContext;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import com.fasterxml.jackson.databind.jsontype.impl.StdSubtypeResolver;
import com.fasterxml.jackson.databind.ser.BeanSerializerFactory;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.fasterxml.jackson.databind.util.StdDateFormat;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.xml.ws.http.HTTPException;

import org.apache.sling.api.wrappers.SlingHttpServletRequestWrapper;
import org.apache.sling.servlethelpers.MockRequestPathInfo;
import org.apache.sling.servlethelpers.MockSlingHttpServletResponse;
import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;

class ReachUsServletTest {

    @Test
    void testActivate() {
        ReachUsServlet reachUsServlet = new ReachUsServlet();
        reachUsServlet.activate();
        ObjectMapper objectMapper = reachUsServlet.objectMapper;
        assertTrue(objectMapper.getSubtypeResolver() instanceof StdSubtypeResolver);
        SerializerProvider serializerProviderInstance = objectMapper.getSerializerProviderInstance();
        assertTrue(serializerProviderInstance instanceof DefaultSerializerProvider.Impl);
        SerializerProvider serializerProvider = objectMapper.getSerializerProvider();
        assertTrue(serializerProvider instanceof DefaultSerializerProvider.Impl);
        assertTrue(objectMapper.getVisibilityChecker() instanceof VisibilityChecker.Std);
        assertTrue(objectMapper.getSerializerFactory() instanceof BeanSerializerFactory);
        assertTrue(objectMapper.getDateFormat() instanceof StdDateFormat);
        assertSame(objectMapper.getFactory(), objectMapper.getJsonFactory());
        assertTrue(objectMapper.getPolymorphicTypeValidator() instanceof LaissezFaireSubTypeValidator);
        assertNull(objectMapper.getPropertyNamingStrategy());
        assertTrue(objectMapper.getDeserializationContext() instanceof DefaultDeserializationContext.Impl);
        assertNull(serializerProviderInstance.getFilterProvider());
        assertTrue(serializerProviderInstance.getAnnotationIntrospector() instanceof JacksonAnnotationIntrospector);
        TypeFactory expectedTypeFactory = objectMapper.getTypeFactory();
        assertSame(expectedTypeFactory, serializerProviderInstance.getTypeFactory());
        assertNull(serializerProvider.getActiveView());
        assertSame(serializerProviderInstance.getDefaultNullKeySerializer(),
                serializerProvider.getDefaultNullKeySerializer());
        assertSame(serializerProviderInstance.getDefaultNullValueSerializer(),
                serializerProvider.getDefaultNullValueSerializer());
    }


    @Test
    void testActivate2() throws ServletException {
        ReachUsServlet reachUsServlet = new ReachUsServlet();
        reachUsServlet.init(new ViewStatusMessagesServlet());
        reachUsServlet.activate();
        ObjectMapper objectMapper = reachUsServlet.objectMapper;
        assertTrue(objectMapper.getVisibilityChecker() instanceof VisibilityChecker.Std);
        assertTrue(objectMapper.getSubtypeResolver() instanceof StdSubtypeResolver);
        SerializerProvider serializerProviderInstance = objectMapper.getSerializerProviderInstance();
        assertTrue(serializerProviderInstance instanceof DefaultSerializerProvider.Impl);
        SerializerProvider serializerProvider = objectMapper.getSerializerProvider();
        assertTrue(serializerProvider instanceof DefaultSerializerProvider.Impl);
        assertTrue(objectMapper.getSerializerFactory() instanceof BeanSerializerFactory);
        assertTrue(objectMapper.getDateFormat() instanceof StdDateFormat);
        JsonFactory factory = objectMapper.getFactory();
        assertSame(factory, objectMapper.getJsonFactory());
        assertTrue(objectMapper.getPolymorphicTypeValidator() instanceof LaissezFaireSubTypeValidator);
        assertNull(objectMapper.getPropertyNamingStrategy());
        assertTrue(objectMapper.getDeserializationContext() instanceof DefaultDeserializationContext.Impl);
        assertNull(serializerProviderInstance.getFilterProvider());
        assertNull(serializerProvider.getActiveView());
        assertSame(serializerProviderInstance.getDefaultNullValueSerializer(),
                serializerProvider.getDefaultNullValueSerializer());
        TypeFactory expectedTypeFactory = objectMapper.getTypeFactory();
        assertSame(expectedTypeFactory, serializerProviderInstance.getTypeFactory());
        assertSame(serializerProviderInstance.getDefaultNullKeySerializer(),
                serializerProvider.getDefaultNullKeySerializer());
        assertSame(objectMapper, factory.getCodec());
        assertTrue(serializerProviderInstance.getAnnotationIntrospector() instanceof JacksonAnnotationIntrospector);
    }

    @Test
    @Disabled("TODO: Complete this test")
    void testDoPost() throws IOException, ServletException {
        ReachUsServlet reachUsServlet = new ReachUsServlet();
        SlingHttpServletRequestWrapper slingHttpServletRequestWrapper = mock(SlingHttpServletRequestWrapper.class);
        when(slingHttpServletRequestWrapper.getRequestPathInfo()).thenReturn(new MockRequestPathInfo());
        FormsHandlingRequest req = new FormsHandlingRequest(new FormsHandlingRequest(
                new FormsHandlingRequest(new FormsHandlingRequest(new FormsHandlingRequest(slingHttpServletRequestWrapper)))));
        reachUsServlet.doPost(req, new MockSlingHttpServletResponse());
    }

    @Test
    @Disabled("TODO: Complete this test")
    void testDoPost2() throws IOException, ServletException {
        ReachUsServlet reachUsServlet = new ReachUsServlet();
        SlingHttpServletRequestWrapper slingHttpServletRequestWrapper = mock(SlingHttpServletRequestWrapper.class);
        when(slingHttpServletRequestWrapper.getRequestPathInfo()).thenReturn(null);
        FormsHandlingRequest req = new FormsHandlingRequest(new FormsHandlingRequest(
                new FormsHandlingRequest(new FormsHandlingRequest(new FormsHandlingRequest(slingHttpServletRequestWrapper)))));
        reachUsServlet.doPost(req, new MockSlingHttpServletResponse());
    }

    @Test
    void testDoPost3() throws IOException, ServletException {
        ReachUsServlet reachUsServlet = new ReachUsServlet();
        PathInfo pathInfo = mock(PathInfo.class);
        when(pathInfo.getSelectors()).thenReturn(new String[]{"Selectors"});
        SlingHttpServletRequestWrapper slingHttpServletRequestWrapper = mock(SlingHttpServletRequestWrapper.class);
        when(slingHttpServletRequestWrapper.getRequestPathInfo()).thenReturn(pathInfo);
        FormsHandlingRequest req = new FormsHandlingRequest(new FormsHandlingRequest(
                new FormsHandlingRequest(new FormsHandlingRequest(new FormsHandlingRequest(slingHttpServletRequestWrapper)))));
        reachUsServlet.doPost(req, new MockSlingHttpServletResponse());
        verify(slingHttpServletRequestWrapper).getRequestPathInfo();
        verify(pathInfo).getSelectors();
    }

    @Test
    @Disabled("TODO: Complete this test")
    void testDoPost4() throws IOException, ServletException {
        ReachUsServlet reachUsServlet = new ReachUsServlet();
        FormsHandlingRequest formsHandlingRequest = mock(FormsHandlingRequest.class);
        when(formsHandlingRequest.getRequestPathInfo()).thenThrow(new HTTPException(1));
        FormsHandlingRequest req = new FormsHandlingRequest(
                new FormsHandlingRequest(new FormsHandlingRequest(new FormsHandlingRequest(formsHandlingRequest))));
        reachUsServlet.doPost(req, new MockSlingHttpServletResponse());
    }
}

