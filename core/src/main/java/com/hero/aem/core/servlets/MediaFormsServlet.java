package com.hero.aem.core.servlets;

import java.io.*;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import com.day.cq.mailer.MessageGateway;
import com.day.cq.mailer.MessageGatewayService;

import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.osgi.framework.Constants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.DeserializationFeature;


@SuppressWarnings("serial")
@Component(service = Servlet.class, immediate = true, property = {
        Constants.SERVICE_DESCRIPTION + "=Media Forms SOAP servlet",
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=hero-aem-website/components/content/media-forms",
        ServletResolverConstants.SLING_SERVLET_SELECTORS + "=sendemail",
        ServletResolverConstants.SLING_SERVLET_EXTENSIONS + "=json",
        ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET })
public class MediaFormsServlet extends SlingAllMethodsServlet {

    /**
     * Generated serialVersionUID
     */
    private static final long serialVersionUID = 4438376868274173005L;

    private static final Logger log = LoggerFactory.getLogger(MediaFormsServlet.class);

    @Reference
    transient MessageGatewayService messageGatewayService;

     /**
     * Logger
     */

    @Override
    protected void doGet(final SlingHttpServletRequest req, final SlingHttpServletResponse resp)
            throws ServletException, IOException {

        String[] recipients = { "iiamvenkat@gmail.com" };
        Email email = new HtmlEmail();
        for (String recipient : recipients) {
            try {
                email.addTo(recipient, recipient);
            } catch (EmailException e) {
                log.error("Exception Email"+ e);
            }
        }
        email.setSubject("Test SMTP Mine");
        try {
            email.setMsg("OK Testing SMTP ");
        } catch (EmailException e) {
            log.error("Exception Email"+ e);
        }

        MessageGateway<Email> messageGateway = messageGatewayService.getGateway(HtmlEmail.class);
        log.debug("sending out email messageGateway "+ messageGateway);
        if (messageGateway != null) {
            log.debug("sending out email");
            messageGateway.send(email);
        } else {
            log.error("The message gateway could not be retrieved.");
        }
    }

}