package com.hero.aem.core.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class QuerySearchResultTest {

    private String name;

    private String path;

    private String title;

    private String releaseDate;

    private String pressName;

    private String year;

    private String quater;

    private String description;

    private String iconPath;

    @InjectMocks
    private QuerySearchResult querySearchResult;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        querySearchResult.setName(name);
        querySearchResult.setPath(path);
        querySearchResult.setTitle(title);
        querySearchResult.setReleaseDate(releaseDate);
        querySearchResult.setPressName(pressName);
        querySearchResult.setYear(year);
        querySearchResult.setQuater(quater);
        querySearchResult.setDescription(description);
        querySearchResult.setIconPath(iconPath);
    }

    @Test
    void getTestResult() {
        assertEquals(name,querySearchResult.getName());
        assertEquals(path,querySearchResult.getPath());
        assertEquals(title,querySearchResult.getTitle());
        assertEquals(releaseDate,querySearchResult.getReleaseDate());
        assertEquals(pressName,querySearchResult.getPressName());
        assertEquals(year,querySearchResult.getYear());
        assertEquals(quater,querySearchResult.getQuater());
        assertEquals(description,querySearchResult.getDescription());
        assertEquals(iconPath,querySearchResult.getIconPath());
    }
}