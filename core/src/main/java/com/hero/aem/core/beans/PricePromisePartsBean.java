package com.hero.aem.core.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude
public class PricePromisePartsBean {
    @JsonProperty("dealerCode")
    private String dealerCode = "";

    @JsonProperty("serviceNature")
    private String serviceNature = "";

    @JsonProperty("serviceType")
    private String serviceType = "";

    @JsonProperty("model")
    private String model = "";

    @JsonProperty("city")
    private String city = "";

    @JsonProperty("state")
    private String state = "";

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDealerCode() {
        return dealerCode;
    }

    public void setDealerCode(String dealerCode) {
        this.dealerCode = dealerCode;
    }

    public String getServiceNature() {
        return serviceNature;
    }

    public void setServiceNature(String serviceNature) {
        this.serviceNature = serviceNature;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
