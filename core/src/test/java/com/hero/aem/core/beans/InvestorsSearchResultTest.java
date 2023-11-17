package com.hero.aem.core.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class InvestorsSearchResultTest {

    private String path;

    private String title;

    private String year;

    private String folderName;

    private Float size;

    private String description;

    private String quarter;

    @InjectMocks
    private InvestorsSearchResult investorsSearchResult;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        investorsSearchResult.setDescription(description);
        investorsSearchResult.setPath(path);
        investorsSearchResult.setFolderName(folderName);
        investorsSearchResult.setQuarter(quarter);
        investorsSearchResult.setTitle(title);
        investorsSearchResult.setSize(size);
        investorsSearchResult.setYear(year);
    }

    @Test
    void getTestResult() {
        assertEquals(description,investorsSearchResult.getDescription());
        assertEquals(path,investorsSearchResult.getPath());
        assertEquals(folderName,investorsSearchResult.getFolderName());
        assertEquals(quarter,investorsSearchResult.getQuarter());
        assertEquals(title,investorsSearchResult.getTitle());
        assertEquals(size,investorsSearchResult.getSize());
        assertEquals(year,investorsSearchResult.getYear());

    }
}