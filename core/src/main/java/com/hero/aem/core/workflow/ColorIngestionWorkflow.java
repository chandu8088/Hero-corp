package com.hero.aem.core.workflow;

import com.adobe.granite.asset.api.Asset;
import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.google.gson.JsonObject;
import com.hero.aem.core.util.CSVUtils;
import com.hero.aem.core.util.JsonComparator;
import com.hero.aem.core.util.StaticWrapper;
import org.apache.commons.io.input.BOMInputStream;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;

/**
 * ColorIngestionWorkflow
 *
 * This Workflow is used to ingest Color information into JCR.
 *
 * The workflow can be triggered by multiple launchers and can help add nodes.
 * Launcher should be configured to run only in Author mode so that the whole
 * package can be replicated.
 *
 * The path is passed through model as of now which points to /in/ node but
 * based on the future expansion, the model should pass on dynamic rootPath.
 */
@Component(service = WorkflowProcess.class, property = "process.label=Color Ingestion Job")
public class ColorIngestionWorkflow implements WorkflowProcess {
    private static final Logger log = LoggerFactory.getLogger(ColorIngestionWorkflow.class);

    StaticWrapper jcrUtilWrapper = new StaticWrapper();

    /**
     * Entry method to contain the workflow logic.
     *
     * This validates the resource if the resource is of type dam:Asset and streams
     * it to get a Buffered Reader.
     *
     * This reader can be used to parse the data and create nodes.
     *
     */
    @Override
    public final void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap)
            throws WorkflowException {

        String rootPath = workItem.getWorkflowData().getMetaDataMap().get("colorIngestionPath", String.class);
        String wfPayload = null;
        ResourceResolver resourceResolver = workflowSession.adaptTo(ResourceResolver.class);
        wfPayload = (String) workItem.getWorkflowData().getPayload();
        try {
            log.info("valid resource");
            AssetManager assetMgr = resourceResolver.adaptTo(AssetManager.class);
            Asset xlAsset = assetMgr.getAsset(wfPayload);
            if (xlAsset != null) {
                BOMInputStream bis = new BOMInputStream(xlAsset.getRendition("original").getStream());
                BufferedReader csvFile = new BufferedReader(new InputStreamReader(bis));
                ArrayList<JsonObject> csvDataList = CSVUtils.getDataFromFile(csvFile);
                JsonComparator comparator = new JsonComparator("model", "variant", "sku", "sku_description", "color_description", "color_code");
                Collections.sort(csvDataList, comparator);
                createColorData(csvDataList, resourceResolver, rootPath);
            }
        } catch (IOException e) {
            log.error("IOException {}", e);
        }
    }

    public void createColorData(ArrayList<JsonObject> csvDataList, ResourceResolver resourceResolver, String rootPath) {
        Session session = null;
        try {
            session = resourceResolver.adaptTo(Session.class);
            String modelName = null;
            String variant = null;
            Node currentVariantNode = null;

            for (JsonObject rowData : csvDataList) {
                // Custom handling for modelName
                modelName = rowData.get("model").getAsString();
                modelName = jcrUtilWrapper.createValidName(StringUtils.replace(modelName, "+", "plus"));
                variant = CSVUtils.getNodeName(rowData, "variant");
                String sku = CSVUtils.getNodeName(rowData, "sku");

                String modelPath = String.join("/", rootPath, modelName);

                // Check if the current variant node matches the model and variant
                if (currentVariantNode == null || !StringUtils.equals(variant, currentVariantNode.getName())) {
                    // If not, create a new variant node
                    String variantPath = String.join("/", modelPath, variant);
                    currentVariantNode = jcrUtilWrapper.createPath(variantPath, session);
                }

                // Create a SKU node under the current variant node
                String skuPath = String.join("/", currentVariantNode.getPath(), sku);
                Node skuNode = jcrUtilWrapper.createPath(skuPath, session);

                for (String keys : rowData.keySet()) {
                    String value = rowData.get(keys).getAsString().replaceAll("^\"|\"$", "");
                    if (StringUtils.isNotBlank(value)) {
                        skuNode.setProperty(keys, value);
                    }
                }

                // Set the "model_name" property on the variant node
                currentVariantNode.getParent().setProperty("model_name", rowData.get("model").getAsString());
                currentVariantNode.setProperty("variant", rowData.get("variant").getAsString());
            }

            session.save();
            log.info("Nodes created Successfully");
        } catch (RepositoryException e) {
            log.error("RepositoryException {}", e);
        }
    }

}