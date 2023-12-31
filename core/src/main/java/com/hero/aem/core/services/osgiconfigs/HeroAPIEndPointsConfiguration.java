package com.hero.aem.core.services.osgiconfigs;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Hero API End Points Configurations OSGI Service")
public @interface HeroAPIEndPointsConfiguration {
	
	@AttributeDefinition(name = "API End point for Middleware", description = "API to send OTP for login", type = AttributeType.STRING)
    String middleWareAPI() default "https://hmclmobazfun02p-dev.azurewebsites.net/api/cloudware_prod?ORG_ID=ONEAPP";
	
	@AttributeDefinition(name = "API End point for AEM - Book Service call", description = "API for Book service call", type = AttributeType.STRING)
    String getBookServiceAPI() default "/content/hero-aem-website/in/en-in/homepage/jcr:content/root/container/container_1351549374.bookservice.html";
	
	@AttributeDefinition(name = "API End point to get MMI Token", description = "API to get MMI token", type = AttributeType.STRING)
    String getMMIAccessTokenAPI() default "/content/hero-aem-website/in/en-in/homepage/jcr:content/root/container/container_1351549374.getMMIDetails.html";
	
	@AttributeDefinition(name = "API End point to get State City from Location", description = "API End point to get State City from Location o-ordinates", type = AttributeType.STRING)
    String getLocationDetails() default "https://apis.mappls.com/advancedmaps/v1/{token}/rev_geocode";
	
	@AttributeDefinition(name = "API End point to get Distance", description = "API End point to get Distance between eloc and co-ordinates", type = AttributeType.STRING)
    String getDistanceAPI() default "https://apis.mappls.com/advancedmaps/v1/{token}/distance_matrix/biking/";
	
	@AttributeDefinition(name = "API End point to get eLoc value", description = "API End point to get eLoc value from dealer address", type = AttributeType.STRING)
    String geteLocAPI() default "https://atlas.mappls.com/api/places/geocode";
	
	@AttributeDefinition(name = "API End point to get state and city values", description = "API End point to get state and city values", type = AttributeType.STRING)
    String getListingAPI() default "https://geoanalytics.mappls.com/listingapi";
	
	@AttributeDefinition(name = "API to submit Feedback", description = "API end point to submit feedback", type = AttributeType.STRING)
    String getSubmitFeedbackAPI() default "/content/hero-aem-website/in/en-in/homepage.submitFeedback.html";

	@AttributeDefinition(name = "GoodLife API Endpoint", description = "API end point to get Goodlife APIs response", type = AttributeType.STRING)
    String getGoodLifeAPI() default "/content/hero-aem-website/in/en-in/homepage.getGoodLifeResponse.html";
	
	@AttributeDefinition(name = "Payment Gateway path", description = "Enter the payment gateway path here", type = AttributeType.STRING)
    String paymentGateWay() default "https://test.ccavenue.com/transaction.do?command=initiateTransaction";

	@AttributeDefinition(name = "Encoded path for Payment Gateway", description = "Enter the API path to get the encoded request value for online payment", type = AttributeType.STRING)
    String getReqForPayment() default "/content/hero-aem-website/in/en-in/homepage.getPaymentUrl.html";

    @AttributeDefinition(name = "Exchange Journey State List Endpoint", description = "Enter the API path to get the exchange journey states list", type = AttributeType.STRING)
    String getExchangeStateAPI() default "https://test.wheelsoftrust.com/api/getStateDiyApi";

    @AttributeDefinition(name = "Exchange Journey City List Endpoint", description = "Enter the API path to get the exchange journey cities list", type = AttributeType.STRING)
    String getExchangeCityAPI() default "https://test.wheelsoftrust.com/api/getCityDiyApi";

    @AttributeDefinition(name = "Exchange Journey Price List Endpoint", description = "Enter the API path to get the exchange journey price", type = AttributeType.STRING)
    String getExchangePriceAPI() default "https://test.wheelsoftrust.com/api/getPriceDiyApi";

    @AttributeDefinition(name = "Exchange Journey Brand List Endpoint", description = "Enter the API path to get the exchange journey brand list", type = AttributeType.STRING)
    String getExchangeMakeAPI() default "https://test.wheelsoftrust.com/api/getMakeDiyApi";

    @AttributeDefinition(name = "Exchange Journey Model List Endpoint", description = "Enter the API path to get the exchange journey model list", type = AttributeType.STRING)
    String getExchangeModelAPI() default "https://test.wheelsoftrust.com/api/getModelDiyApi";

    @AttributeDefinition(name = "Exchange Journey Dealer List Endpoint", description = "Enter the API path to get the exchange journey dealer list", type = AttributeType.STRING)
    String getExchangeDealerAPI() default "https://test.wheelsoftrust.com/api/getDealerCodeDiyApi";

    @AttributeDefinition(name = "Price Promise API Endpoint", description = "Enter the API path to get Price Promise Parts list", type = AttributeType.STRING)
    String getPricePromiseAPI() default "https://hmclmobazfun02p-dev-old.azurewebsites.net/api/cloudware_prod?ORG_ID=PMP";

    @AttributeDefinition(name = "Exchange Journey Model Map Price API Endpoint", description = "Enter the API path to get Exchange Model Map Price", type = AttributeType.STRING)
    String getExchangeModelMapAPI() default "https://test.wheelsoftrust.com/api/price-mapping-diy";

    @AttributeDefinition(name = "Submit Exchange Journey Details", description = "Enter the API path to Submit Exchange Journey Details", type = AttributeType.STRING)
    String submitExchangeDetailsAPI() default "https://test.wheelsoftrust.com/api/submit-exchange-details";

    @AttributeDefinition(name = "Exchange Journey Enquiry Creation", description = "Enter the API path for Exchange Journey Enquiry Creation", type = AttributeType.STRING)
    String exchangeEnquiryCreateAPI() default "https://202.56.244.135/siebel/v1.0/service/HMCLRestServices/EnqCreation";

}
