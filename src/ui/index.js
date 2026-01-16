import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const BACKEND_URL = "http://localhost:3000";
let currentCanvasId = null;

addOnUISdk.ready.then(async () => {
    console.log("Canvas Add-on is ready.");

    const { runtime } = addOnUISdk.instance;
    const sandboxProxy = await runtime.apiProxy("documentSandbox");

    // Publish as Canvas
    const publishButton = document.getElementById("publishCanvas");
    publishButton.addEventListener("click", async () => {
        try {
            showStatus("Extracting document content...");
            publishButton.disabled = true;

            // Get document content from sandbox
            const documentData = await sandboxProxy.extractDocument();
            
            if (!documentData) {
                throw new Error("Failed to extract document content");
            }

            showStatus("Publishing to Canvas...");

            // Send to backend
            const response = await fetch(`${BACKEND_URL}/api/canvas/publish`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(documentData)
            });

            if (!response.ok) {
                throw new Error("Failed to publish Canvas");
            }

            const result = await response.json();
            currentCanvasId = result.canvasId;

            // Show Canvas link
            document.getElementById("canvasLink").value = result.url;
            document.getElementById("canvasLinkContainer").style.display = "block";
            
            showStatus("Canvas published successfully!", "success");

            // Enable other features
            document.getElementById("createMilestone").disabled = false;
            document.getElementById("viewInsights").disabled = false;

        } catch (error) {
            console.error("Error publishing Canvas:", error);
            showStatus("Error: " + error.message, "error");
        } finally {
            publishButton.disabled = false;
        }
    });

    // Create Milestone
    const milestoneButton = document.getElementById("createMilestone");
    milestoneButton.addEventListener("click", async () => {
        if (!currentCanvasId) {
            showStatus("Please publish as Canvas first", "error");
            return;
        }

        // Use default milestone for demo (prompt may not work in iframe)
        const timestamp = new Date().toLocaleTimeString();
        const name = `Milestone ${timestamp}`;
        const reason = "Version saved from Adobe Express";

        try {
            showStatus("Creating milestone...");

            const response = await fetch(`${BACKEND_URL}/api/milestones/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    canvasId: currentCanvasId,
                    name,
                    reason
                })
            });

            if (!response.ok) {
                throw new Error("Failed to create milestone");
            }

            const result = await response.json();
            showStatus(`✓ Milestone "${name}" created!`, "success");
            console.log("Milestone created:", result);

        } catch (error) {
            console.error("Error creating milestone:", error);
            showStatus("Error: " + error.message, "error");
        }
    });

    // View Insights - Open Canvas viewer
    const insightsButton = document.getElementById("viewInsights");
    insightsButton.addEventListener("click", async () => {
        if (!currentCanvasId) {
            showStatus("Please publish as Canvas first", "error");
            return;
        }

        const canvasUrl = `http://localhost:3000/canvas/${currentCanvasId}`;
        
        // Try to open in new window (may be blocked in iframe)
        try {
            const opened = window.open(canvasUrl, '_blank');
            if (opened) {
                showStatus("✓ Canvas viewer opened!", "success");
            } else {
                // Fallback: show link to copy
                showStatus("Copy the Canvas link above to view it", "info");
            }
        } catch (e) {
            console.error("Cannot open window:", e);
            showStatus("Use the Canvas link above to view", "info");
        }
        
        console.log("Canvas URL:", canvasUrl);
    });

    // Enable publish button
    publishButton.disabled = false;
});

// Copy Canvas link
window.copyLink = function() {
    const linkInput = document.getElementById("canvasLink");
    linkInput.select();
    document.execCommand("copy");
    showStatus("Link copied to clipboard!", "success");
};

// Show status message
function showStatus(message, type = "info") {
    const statusDiv = document.getElementById("status");
    const statusMessage = document.getElementById("statusMessage");
    
    statusMessage.textContent = message;
    statusDiv.className = "status-box";
    
    if (type === "success") {
        statusDiv.classList.add("status-success");
    } else if (type === "error") {
        statusDiv.classList.add("status-error");
    } else {
        statusDiv.classList.add("status-info");
    }
    
    statusDiv.style.display = "block";
    
    setTimeout(() => {
        if (type !== "success") {
            statusDiv.style.display = "none";
        }
    }, 3000);
}
