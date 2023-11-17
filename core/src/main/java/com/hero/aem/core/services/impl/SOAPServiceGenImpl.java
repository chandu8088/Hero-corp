package com.hero.aem.core.services.impl;

import com.google.gson.JsonObject;
import com.hero.aem.core.beans.ExchangeProspectAPIBean;
import com.hero.aem.core.beans.LeadGenerationAPIBean;
import com.hero.aem.core.constants.HeroConstants;
import com.hero.aem.core.services.SOAPServiceGen;
import com.hero.aem.core.services.osgiconfigs.APIConfigurations;
import com.hero.aem.core.util.FormsUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.namespace.QName;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.soap.*;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

@Component(service = SOAPServiceGen.class, immediate = true)
@ServiceDescription("SOAP Service for Campaign Form enhancement")
public class SOAPServiceGenImpl implements SOAPServiceGen {

    @Reference
    transient APIConfigurations apiConfigurations;

    private static final Logger log = LoggerFactory.getLogger(SOAPServiceGenImpl.class);

    @Override
    public String GenerateXML(LeadGenerationAPIBean leadGenerationAPIBean)  {
        try {

            MessageFactory factory = MessageFactory.newInstance();
            SOAPMessage soapMsg = factory.createMessage();
            SOAPPart part = soapMsg.getSOAPPart();
            SOAPEnvelope envelope = part.getEnvelope();
            SOAPHeader header = envelope.getHeader();

            envelope.addNamespaceDeclaration("hhm", "http://siebel.com/HHMLInterface/");

            QName qNameUsername = new QName("http://siebel.com/webservices", "UsernameToken");
            SOAPHeaderElement username = header.addHeaderElement(qNameUsername);
            username.addTextNode(apiConfigurations.getConfigProperty("getSOAPUsername"));

            QName qNamePassword = new QName("http://siebel.com/webservices", "PasswordText");
            SOAPHeaderElement password = header.addHeaderElement(qNamePassword);
            password.addTextNode(apiConfigurations.getConfigProperty("getSOAPPassword"));
            QName qNameSessionType = new QName("http://siebel.com/webservices", "SessionType");
            SOAPHeaderElement sessionType = header.addHeaderElement(qNameSessionType);
            sessionType.addTextNode("None");

            SOAPBody body = envelope.getBody();

            SOAPElement soapBodyElem = body.addChildElement("CreateEnquiry_Input","hhm");
            soapBodyElem.setPrefix("hhm");
            SOAPElement modelNumber = soapBodyElem.addChildElement( "ModelNo","hhm");
            if (leadGenerationAPIBean.getBike_model().equals("XOOM")) {
                modelNumber.addTextNode("XOOM");
            } else if(leadGenerationAPIBean.getBike_model().equals("Passion+")) {
                modelNumber.addTextNode("PASSION +");
            } else if(leadGenerationAPIBean.getBike_model().equals("Glamour")){
                modelNumber.addTextNode("GLAMOUR");
            } else if(leadGenerationAPIBean.getBike_model().equals("Super Splendor Xtec")){
                modelNumber.addTextNode("SUPER SPLENDOR XTEC");
            } else if(leadGenerationAPIBean.getBike_model().equals("Destini Prime")){
                modelNumber.addTextNode("DESTINI PRIME");
            } else if(leadGenerationAPIBean.getBike_model().equals("Pleasure+ Xtec")){
                modelNumber.addTextNode("PLEASURE+ XTEC");
            } else if(leadGenerationAPIBean.getBike_model().equals("Xtreme 160R 4V")){
                modelNumber.addTextNode("XTREME 160R 4V");
            } else if(leadGenerationAPIBean.getBike_model().equals("Xpulse 200 4V")){
                modelNumber.addTextNode("XPULSE 200 4V");
            } else if(leadGenerationAPIBean.getBike_model().equals("Destini 125 Xtec")){
                modelNumber.addTextNode("DESTINI 125");
            } else if (leadGenerationAPIBean.getVariation_type().equals("festiveappcampaign")) {
                modelNumber.addTextNode(leadGenerationAPIBean.getBike_model().toString());
            } else{
                modelNumber.addTextNode("HARLEY X440");
            }

            SOAPElement enqSource = soapBodyElem.addChildElement("EnqSource","hhm");
            if(leadGenerationAPIBean.getVariation_type().equals("festiveappcampaign")){
                enqSource.addTextNode("FestiveHeroApp");
            }
            else if(leadGenerationAPIBean.getBike_model().equals("XOOM") || leadGenerationAPIBean.getBike_model().equals("Passion+") || leadGenerationAPIBean.getBike_model().equals("Glamour")
            || leadGenerationAPIBean.getBike_model().equals("Super Splendor Xtec") || leadGenerationAPIBean.getBike_model().equals("Destini Prime") || leadGenerationAPIBean.getBike_model().equals("Pleasure+ Xtec")
            || leadGenerationAPIBean.getBike_model().equals("Xtreme 160R 4V") || leadGenerationAPIBean.getBike_model().equals("Xpulse 200 4V") || leadGenerationAPIBean.getBike_model().equals("Destini 125 Xtec")) {
                enqSource.addTextNode("Cross Selling");
            }
            else{
                enqSource.addTextNode("CWS");
            }

            SOAPElement fName = soapBodyElem.addChildElement("FName","hhm");
            fName.addTextNode(leadGenerationAPIBean.getName());

            SOAPElement lName = soapBodyElem.addChildElement("LName","hhm");
            lName.addTextNode(leadGenerationAPIBean.getName());

            SOAPElement enqName = soapBodyElem.addChildElement("EnqName","hhm");
            if (leadGenerationAPIBean.getVariation_type().equals("festiveappcampaign") || leadGenerationAPIBean.getBike_model().equals("XOOM") || leadGenerationAPIBean.getBike_model().equals("Passion+") || leadGenerationAPIBean.getBike_model().equals("Glamour")
            || leadGenerationAPIBean.getBike_model().equals("Super Splendor Xtec") || leadGenerationAPIBean.getBike_model().equals("Destini Prime") || leadGenerationAPIBean.getBike_model().equals("Pleasure+ Xtec") 
            || leadGenerationAPIBean.getBike_model().equals("Xtreme 160R 4V") || leadGenerationAPIBean.getBike_model().equals("Xpulse 200 4V")) {
                enqName.addTextNode(leadGenerationAPIBean.getBike_model()+RandomStringUtils.random(9, false, true));
            } else if(leadGenerationAPIBean.getBike_model().equals("Destini 125 Xtec")){
                enqName.addTextNode("Destini 125"+RandomStringUtils.random(9, false, true));
            }else{
                enqName.addTextNode("HARLEYX440"+RandomStringUtils.random(9, false, true));
            }
            SOAPElement emailAddr = soapBodyElem.addChildElement("EmailAddr","hhm");
            emailAddr.addTextNode("N/A");

            SOAPElement mobile = soapBodyElem.addChildElement("MobileNo","hhm");
            mobile.addTextNode(leadGenerationAPIBean.getMobile());

            SOAPElement dealerCode = soapBodyElem.addChildElement("DealerCode","hhm");
            dealerCode.addTextNode(leadGenerationAPIBean.getDealer_code());

            soapMsg.saveChanges();
            final StringWriter sw = new StringWriter();

            try {
                TransformerFactory.newInstance().newTransformer().transform(
                        new DOMSource(soapMsg.getSOAPPart()),
                        new StreamResult(sw));
            } catch (TransformerException e) {
                log.error("TransformerException" + e);
            }
            return sw.toString();
        } catch (SOAPException e) {
            log.error("Exception" + e);
        }
        return null;
    }



    @Override
    public String ProcessSOAPRequest(String xmlInput) {
        try{
            FormsUtils.ValidateHostName();
            String wsURL = apiConfigurations.getConfigProperty("getProductEnquiryAPIURL");
            String responseString = "";
            String outputString = "";
            String SOAPAction;
            URL url = new URL(wsURL);
            URLConnection connection = url.openConnection();
            HttpURLConnection httpConn = (HttpURLConnection) connection;
            ByteArrayOutputStream bout = new ByteArrayOutputStream();
            bout.write(xmlInput.getBytes());
            byte[] b = bout.toByteArray();
            if(xmlInput.contains("hmc")){
                 SOAPAction = "\"document/http://siebel.com/HMCLCreateProspectFromMobileApp/:HMCLCreatePropsect\"";
            }
            else {
                 SOAPAction = "\"document/http://siebel.com/HHMLInterface/:CreateEnquiry\"";
            }
// Set the appropriate HTTP parameters.
            httpConn.setRequestProperty("Content-Length",String.valueOf(b.length));
            httpConn.setRequestProperty("Content-Type", "text/xml; charset=utf-8");
            httpConn.setRequestProperty("SOAPAction", SOAPAction);
            httpConn.setRequestMethod("POST");
            httpConn.setDoOutput(true);
            httpConn.setDoInput(true);
            httpConn.setConnectTimeout(30000);
            httpConn.setReadTimeout(30000);
            OutputStream out = httpConn.getOutputStream();
            out.write(b);
            out.close();
            InputStreamReader isr = null;
            if (httpConn.getResponseCode() == 200) {
                isr = new InputStreamReader(httpConn.getInputStream());
            } else {
                isr = new InputStreamReader(httpConn.getErrorStream());
            }
            BufferedReader in = new BufferedReader(isr);

            while ((responseString = in.readLine()) != null) {
                outputString = outputString + responseString;
            }
            log.info("Output SOAP Response"+outputString);

            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            DocumentBuilder db = null;
            try {
                db = dbf.newDocumentBuilder();
                InputSource is = new InputSource();
                is.setCharacterStream(new StringReader(outputString));
                try {
                    Document doc = db.parse(is);
                    String message = doc.getDocumentElement().getTextContent();
                    log.info("Harley Message"+message);
                    JsonObject obj=new JsonObject();
                    obj.addProperty("login", "true");
                    obj.addProperty("response", "message");
                    if(message.contains("SUCCESS")|| message.contains("Success") || message.contains("Already Open Enq Exists") || !message.isEmpty()){
                        obj.addProperty("message", "success");
                    }
                    else {
                        obj.addProperty("message", "failure");
                    }
                    return obj.toString();
                } catch (SAXException e) {
                    log.error("SAX Exception"+ e);
                } catch (IOException e) {
                    log.error("IO Exception"+ e);
                }
            } catch (ParserConfigurationException e1) {
                log.error("ParserConfigurationException" +e1);
            }
        }
        catch (IOException e) {
            log.error("IOException in SOAPServiceGenImpl"+e);
        } catch (ParserConfigurationException e) {
            log.error("ParserConfigurationException in SOAPServiceGenImpl"+e);
        } catch (KeyManagementException e2) {
            // TODO Auto-generated catch block
           log.error("ParserConfigurationException in KeyManagementException"+e2);
        } catch (NoSuchAlgorithmException e2) {
            // TODO Auto-generated catch block
            log.error("ParserConfigurationException in NoSuchAlgorithmException"+e2);
        }
        return null;
    }

    @Override
    public String GenerateExchangeXML(ExchangeProspectAPIBean exchangeProspectAPIBean) throws SOAPException {
        try {

            MessageFactory factory = MessageFactory.newInstance();
            SOAPMessage soapMsg = factory.createMessage();
            SOAPPart part = soapMsg.getSOAPPart();
            SOAPEnvelope envelope = part.getEnvelope();
            SOAPHeader header = envelope.getHeader();

            envelope.addNamespaceDeclaration("hmc", "http://siebel.com/HMCLCreateProspectFromMobileApp/");

            QName qNameUsername = new QName("http://siebel.com/webservices", "UsernameToken");
            SOAPHeaderElement username = header.addHeaderElement(qNameUsername);
            username.addTextNode(apiConfigurations.getConfigProperty("getSOAPUsername"));

            QName qNamePassword = new QName("http://siebel.com/webservices", "PasswordText");
            SOAPHeaderElement password = header.addHeaderElement(qNamePassword);
            password.addTextNode(apiConfigurations.getConfigProperty("getSOAPPassword"));
            QName qNameSessionType = new QName("http://siebel.com/webservices", "SessionType");
            SOAPHeaderElement sessionType = header.addHeaderElement(qNameSessionType);
            sessionType.addTextNode("None");

            SOAPBody body = envelope.getBody();

            SOAPElement soapBodyElem = body.addChildElement("HMCLCreatePropsect_Input","hmc");
            soapBodyElem.setPrefix("hmc");

            SOAPElement dseLogin = soapBodyElem.addChildElement( "DSELogin","hmc");
            dseLogin.addTextNode(exchangeProspectAPIBean.getDse_login()==null?"":exchangeProspectAPIBean.getDse_login());

            SOAPElement comments = soapBodyElem.addChildElement("Comments","hmc");
            comments.addTextNode(exchangeProspectAPIBean.getComments()==null?"":exchangeProspectAPIBean.getComments());

            SOAPElement referal_GL_No = soapBodyElem.addChildElement("ReferalGLNo","hmc");
            referal_GL_No.addTextNode(exchangeProspectAPIBean.getReferal_gl_No()==null?"":exchangeProspectAPIBean.getReferal_gl_No());

            SOAPElement fname = soapBodyElem.addChildElement("FirstName","hmc");
            fname.addTextNode(exchangeProspectAPIBean.getfName()==null?"":exchangeProspectAPIBean.getfName());

            SOAPElement enquirySource = soapBodyElem.addChildElement("EnquirySource","hmc");
            //enquirySource.addTextNode(HeroConstants.EXCHANGE_JOURNEY_ENQSOURCE);
            enquirySource.addTextNode("Hero Sure Leads");

            SOAPElement next_followup_dt = soapBodyElem.addChildElement("NextFollowUpDt","hmc");
            next_followup_dt.addTextNode(exchangeProspectAPIBean.getNext_followup_Dt()==null?"":exchangeProspectAPIBean.getNext_followup_Dt());

            SOAPElement city = soapBodyElem.addChildElement("City","hmc");
            city.addTextNode(exchangeProspectAPIBean.getCity()==null?"":exchangeProspectAPIBean.getCity());

            SOAPElement prospectSource = soapBodyElem.addChildElement("ProspectSource","hmc");
            prospectSource.addTextNode(exchangeProspectAPIBean.getProspect_source()==null?"":exchangeProspectAPIBean.getProspect_source());

            SOAPElement emailId = soapBodyElem.addChildElement("EmailId","hmc");
            emailId.addTextNode(exchangeProspectAPIBean.getEmailId()==null?"":exchangeProspectAPIBean.getEmailId());

            SOAPElement referalVIN = soapBodyElem.addChildElement("ReferalVIN","hmc");
            referalVIN.addTextNode(exchangeProspectAPIBean.getReferal_VIN()==null?"":exchangeProspectAPIBean.getReferal_VIN());

            SOAPElement testrideFlag = soapBodyElem.addChildElement("TestRideFlag","hmc");
            testrideFlag.addTextNode(exchangeProspectAPIBean.getTestride_Flag()==null?"":exchangeProspectAPIBean.getTestride_Flag());

            SOAPElement lName = soapBodyElem.addChildElement("LastName","hmc");
            lName.addTextNode(exchangeProspectAPIBean.getlName()==null?"":exchangeProspectAPIBean.getlName());

            SOAPElement dealer_code = soapBodyElem.addChildElement("DealerCode","hmc");
            dealer_code.addTextNode(exchangeProspectAPIBean.getDealer_code()==null?"":exchangeProspectAPIBean.getDealer_code());

            SOAPElement app_source = soapBodyElem.addChildElement("AppSource","hmc");
            app_source.addTextNode(exchangeProspectAPIBean.getApp_Source()==null?"":exchangeProspectAPIBean.getApp_Source());

            SOAPElement model_interestedIn = soapBodyElem.addChildElement("ModelInterestedIn","hmc");
            model_interestedIn.addTextNode(exchangeProspectAPIBean.getModelInterested_In()==null?"":exchangeProspectAPIBean.getModelInterested_In());

            SOAPElement mobileNumber = soapBodyElem.addChildElement("MobileNumber","hmc");
            mobileNumber.addTextNode(exchangeProspectAPIBean.getMobile_Number()==null?"":exchangeProspectAPIBean.getMobile_Number());

            SOAPElement expected_purchaseDt = soapBodyElem.addChildElement("ExpectedPurchaseDt","hmc");
            expected_purchaseDt.addTextNode(exchangeProspectAPIBean.getExpected_purchaseDt()==null?"":exchangeProspectAPIBean.getExpected_purchaseDt());


            soapMsg.saveChanges();
            final StringWriter sw = new StringWriter();

            try {
                TransformerFactory.newInstance().newTransformer().transform(
                        new DOMSource(soapMsg.getSOAPPart()),
                        new StreamResult(sw));
            } catch (TransformerException e) {
                log.error("TransformerException" + e);
            }
            return sw.toString();
        } catch (SOAPException e) {
            log.error("Exception" + e);
        }
        return null;
    }
}
