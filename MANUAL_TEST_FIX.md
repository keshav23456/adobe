# Manual Canvas Content Test

If document extraction doesn't work due to Adobe Express API limitations, here's how to test with manual content:

## Quick Fix: Test with Manual Content

1. **Open browser console** when using the add-on (F12)
2. **Paste this in console** before clicking "Publish as Canvas":

```javascript
// Override extractDocument to return manual test data
window.testCanvasData = {
    title: "My Project Proposal",
    content: "Full document content",
    structure: {
        sections: [
            {
                id: "section-1",
                title: "Introduction",
                content: "This project proposal presents a clear overview of the idea, its objectives, and the problem it aims to solve. The goal is to deliver a meaningful solution that balances creativity, usability, and real-world impact."
            },
            {
                id: "section-2", 
                title: "Budget",
                content: "The budget section provides an estimate of the resources required to successfully complete the project. This includes tools, software, development effort, and any additional operational costs. The focus is on cost-efficiency while ensuring quality execution."
            },
            {
                id: "section-3",
                title: "Timeline",
                content: "The project will be executed in clearly defined phases, starting from planning and design, followed by development, testing, and final delivery. Each phase includes measurable milestones to ensure timely progress."
            }
        ]
    }
};
```

3. Then click "Publish as Canvas" - it will use this data if extraction fails

## Or: Use Postman/curl to Test Backend

```bash
curl -X POST http://localhost:3000/api/canvas/publish \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project Proposal",
    "content": "Test content",
    "structure": {
      "sections": [
        {
          "id": "section-1",
          "title": "Introduction", 
          "content": "This is the introduction section with detailed content."
        },
        {
          "id": "section-2",
          "title": "Budget",
          "content": "Budget details and cost breakdown information."
        },
        {
          "id": "section-3",
          "title": "Timeline",
          "content": "Project timeline and milestone information."
        }
      ]
    }
  }'
```

This will return a Canvas ID that you can view at: `http://localhost:3000/canvas/{id}`
