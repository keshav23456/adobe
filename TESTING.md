# Canvas Add-on - Testing Guide

## Current Status ✅

All Phase 1 features are **COMPLETE and RUNNING**:

### Backend Server
- ✅ Running on http://localhost:3000 (Terminal 3)
- ✅ JSON-based database initialized
- ✅ All API endpoints working

### Add-on Server  
- ✅ Running on https://localhost:5241 (Terminal 2)
- ✅ Canvas UI ready
- ✅ Connected to backend

## Testing Workflow

### 1. Test Feature 1: Publish as Canvas

**In Adobe Express:**
1. Open the Canvas add-on panel
2. Create some text content (add headings and paragraphs)
3. Click **"Publish as Canvas"** button
4. You should see: "Canvas published successfully!"
5. Copy the generated link (e.g., `http://localhost:3000/canvas/abc123xyz`)

**Expected Result:**
- Status message shows success
- Canvas link appears in green box
- Copy button works

---

### 2. Test Feature 2: Blind Spots (Tracking)

**In Browser:**
1. Open the Canvas link in a new browser tab
2. You'll see the Canvas viewer with your content
3. **Don't scroll** - just look at the first section
4. Click the **eye icon (👁️)** button (bottom right)
5. Side panel opens → Check "Blind Spots" section

**Expected Result:**
- Sections you didn't scroll to show as "not viewed"
- As you scroll and view sections, blind spots update
- Tracking happens automatically (50% visibility threshold)

---

### 3. Test Feature 3: Milestones

**In Add-on Panel:**
1. Click **"Create Milestone"** button
2. Enter milestone name: "Version 1"
3. Enter reason: "Initial draft"
4. Check status message

**In Canvas Viewer:**
1. Refresh the Canvas page (or click eye icon again)
2. Scroll down in the side panel
3. See "Milestones" section
4. Your milestone appears with name, reason, and date

**Create Another Milestone:**
1. Back in Adobe Express, modify your document
2. Click "Create Milestone" again
3. Name: "Client feedback version"
4. Reason: "After client review"
5. Check Canvas viewer - both milestones appear

---

### 4. Test Feature 4: Insight View

**In Canvas Viewer:**
1. Look at any section in the Canvas
2. Above the content, see **Text | Insights** toggle
3. Click **"Insights"** button
4. Wait 1 second
5. Content converts to bullet points

**Toggle Back:**
1. Click **"Text"** button
2. Original content shows again

**Try Multiple Sections:**
- Each section has its own toggle
- Insights are generated on-demand
- Once generated, they're cached

---

## Troubleshooting

### Backend not responding?
```bash
# Check if backend is running
curl http://localhost:3000/health

# Expected: {"status":"ok","message":"Canvas backend is running"}
```

### Add-on not loading?
- Check Terminal 2 for errors
- Verify: https://localhost:5241 is accessible
- Adobe Express must be open

### CORS errors?
- Backend has CORS enabled
- Frontend calls from `https://localhost:5241` should work
- Canvas viewer calls from browser should work

---

## API Endpoints (for testing)

### Health Check
```bash
curl http://localhost:3000/health
```

### Get Canvas
```bash
curl http://localhost:3000/api/canvas/YOUR_CANVAS_ID
```

### Get Blind Spots
```bash
curl http://localhost:3000/api/tracking/blind-spots/YOUR_CANVAS_ID
```

### Get Milestones
```bash
curl http://localhost:3000/api/milestones/YOUR_CANVAS_ID
```

### Generate Insights
```bash
curl -X POST http://localhost:3000/api/insights/generate \
  -H "Content-Type: application/json" \
  -d '{"text":"This is a sample paragraph with multiple sentences. It contains important information. This will be converted to bullet points."}'
```

---

## Demo Video Checklist

When recording your demo, show:

1. **Introduction** - Explain Canvas concept (30 sec)
2. **Create Content** - Show document creation in Adobe Express (30 sec)
3. **Publish as Canvas** - Click button, copy link (20 sec)
4. **Canvas Viewer** - Open link, show clean interface (20 sec)
5. **Blind Spots** - Scroll partially, show tracking in side panel (40 sec)
6. **Milestones** - Create 2 milestones, show in viewer (40 sec)
7. **Insight View** - Toggle Text/Insights on sections (30 sec)
8. **Recap** - Summary of features (20 sec)

**Total: ~4 minutes**

---

## File Structure

```
hello-world/
├── backend/
│   ├── db/
│   │   ├── database.js (JSON DB logic)
│   │   └── data/canvas.json (auto-created)
│   ├── routes/
│   │   ├── canvas.js (publish, get)
│   │   ├── tracking.js (blind spots)
│   │   ├── milestones.js (version control)
│   │   └── insights.js (text → bullets)
│   ├── public/
│   │   └── viewer.html (Canvas viewer UI)
│   └── server.js (Express app)
├── src/
│   ├── ui/index.js (Add-on UI logic)
│   ├── sandbox/code.js (Document extraction)
│   ├── index.html (Add-on UI)
│   └── input.css (Tailwind)
└── README.md (Setup instructions)
```

---

## Next Steps

### For Demo/Submission:
1. ✅ Test all features (use this guide)
2. ✅ Record demo video
3. ✅ Take screenshots
4. ✅ Zip the code
5. ✅ Submit!

### Future Enhancements (Optional):
- Add authentication
- Deploy backend to cloud
- Integrate AI for better insights
- Add visual charts for tracking
- Export milestones to PDF

---

## Success Criteria ✅

You know it's working when:
- ✅ Backend starts without errors
- ✅ Add-on shows Canvas UI
- ✅ "Publish as Canvas" returns a link
- ✅ Canvas viewer loads and shows content
- ✅ Scrolling tracks sections (blind spots update)
- ✅ Milestones save and display
- ✅ Text/Insights toggle works

**All features are complete!** 🎉
