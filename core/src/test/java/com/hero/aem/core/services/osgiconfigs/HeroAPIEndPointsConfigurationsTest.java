package com.hero.aem.core.services.osgiconfigs;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class HeroAPIEndPointsConfigurationsTest {

    @Mock
    private HeroAPIEndPointsConfiguration configuration;

    private HeroAPIEndPointsConfigurations configurations;

    @BeforeEach
    void setUp() {
        configurations = new HeroAPIEndPointsConfigurations();
    }

    @Test
    void activate_ConfigurationProvided_ApiValueAsStringSet() throws JsonProcessingException {
        Map<String, Object> properties = new HashMap<>();
        properties.put("key1", "value1");
        properties.put("key2", "value2");
        configurations.activate(configuration, properties);
        assertEquals("{\"key1\":\"value1\",\"key2\":\"value2\"}", configurations.getApiValueAsString());
    }

    @Test
    void modified_ConfigurationProvided_ApiValueAsStringUpdated() throws JsonProcessingException {
        Map<String, Object> properties = new HashMap<>();
        properties.put("key1", "value1");
        properties.put("key2", "value2");
        configurations.modified(configuration, properties);
        assertEquals("{\"key1\":\"value1\",\"key2\":\"value2\"}", configurations.getApiValueAsString());
    }

    @Test
    void getConfigProperty_PropertyExists_ReturnsPropertyValue() throws JsonProcessingException {
        Map<String, Object> properties = new HashMap<>();
        properties.put("key1", "value1");
        properties.put("key2", "value2");
        configurations.activate(configuration, properties);
        String value = configurations.getConfigProperty("key2");
        assertEquals("value2", value);
    }

    @Test
    void deactivate_ApiValueAsStringNotNull_ApiValueAsStringSetToNull() {
        configurations.setApiValueAsString("dummy value");
        configurations.deactivate();
        assertNull(configurations.getApiValueAsString());
    }

    @Test
    void deactivate_ApiValueAsStringNull_ApiValueAsStringRemainsNull() {
        configurations.setApiValueAsString(null);
        configurations.deactivate();
        assertNull(configurations.getApiValueAsString());
    }
}
