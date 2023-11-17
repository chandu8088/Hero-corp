package com.hero.aem.core.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude()
public class ExchangeProspectAPIBean {

    private String dse_login = "";
    private String comments = "";
    private String referal_gl_No = "";
    private String fName = "";
    private String enquirySource = "";
    private String next_followup_Dt = "";
    private String city = "";
    private String prospect_source = "";
    private String emailId = "";
    private String referal_VIN = "";
    private String testride_Flag = "";
    private String lName = "";
    private String dealer_code = "";
    private String app_Source = "";
    private String modelInterested_In = "";
    private String mobile_Number = "";
    private String expected_purchaseDt = "";

    @JsonProperty("dse_login")
    public String getDse_login() {
        return dse_login;
    }

    public void setDse_login(String dse_login) {
        this.dse_login = dse_login;
    }

    @JsonProperty("comments")
    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    @JsonProperty("referal_gl_No")
    public String getReferal_gl_No() {
        return referal_gl_No;
    }

    public void setReferal_gl_No(String referal_gl_No) {
        this.referal_gl_No = referal_gl_No;
    }

    @JsonProperty("fName")
    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    @JsonProperty("enquirySource")
    public String getEnquirySource() {
        return enquirySource;
    }

    public void setEnquirySource(String enquirySource) {
        this.enquirySource = enquirySource;
    }

    @JsonProperty("next_followup_Dt")
    public String getNext_followup_Dt() {
        return next_followup_Dt;
    }

    public void setNext_followup_Dt(String next_followup_Dt) {
        this.next_followup_Dt = next_followup_Dt;
    }

    @JsonProperty("prospect_source")
    public String getProspect_source() {
        return prospect_source;
    }

    public void setProspect_source(String prospect_source) {
        this.prospect_source = prospect_source;
    }

    @JsonProperty("emailId")
    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    @JsonProperty("referal_VIN")
    public String getReferal_VIN() {
        return referal_VIN;
    }

    public void setReferal_VIN(String referal_VIN) {
        this.referal_VIN = referal_VIN;
    }

    @JsonProperty("testride_Flag")
    public String getTestride_Flag() {
        return testride_Flag;
    }

    public void setTestride_Flag(String testride_Flag) {
        this.testride_Flag = testride_Flag;
    }

    @JsonProperty("lName")
    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    @JsonProperty("app_Source")
    public String getApp_Source() {
        return app_Source;
    }

    public void setApp_Source(String app_Source) {
        this.app_Source = app_Source;
    }

    @JsonProperty("modelInterested_In")
    public String getModelInterested_In() {
        return modelInterested_In;
    }

    public void setModelInterested_In(String modelInterested_In) {
        this.modelInterested_In = modelInterested_In;
    }

    @JsonProperty("mobile_Number")
    public String getMobile_Number() {
        return mobile_Number;
    }

    public void setMobile_Number(String mobile_Number) {
        this.mobile_Number = mobile_Number;
    }

    @JsonProperty("expected_purchaseDt")
    public String getExpected_purchaseDt() {
        return expected_purchaseDt;
    }

    public void setExpected_purchaseDt(String expected_purchaseDt) {
        this.expected_purchaseDt = expected_purchaseDt;
    }

    @JsonProperty("city")
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @JsonProperty("dealer_code")
    public String getDealer_code() {
        return dealer_code;
    }

    public void setDealer_code(String dealer_code) {
        this.dealer_code = dealer_code;
    }

}
