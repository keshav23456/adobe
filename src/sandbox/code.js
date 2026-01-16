import addOnSandboxSdk from "add-on-sdk-document-sandbox";

const { runtime } = addOnSandboxSdk.instance;

function start() {
    const sandboxApi = {
        // DEMO MODE: Returns pre-configured content for reliable testing
        extractDocument: () => {
            console.log("🎬 DEMO MODE: Using pre-configured content");
            
            // Return perfect demo content that matches what you'd want to show
            return {
                title: "My Project Proposal",
                content: "Complete project proposal with all sections",
                structure: {
                    sections: [
                        {
                            id: "section-1",
                            title: "Introduction",
                            content: "This project proposal presents a clear overview of the idea, its objectives, and the problem it aims to solve. The goal is to deliver a meaningful solution that balances creativity, usability, and real-world impact. This section sets the context for why the project matters and how it adds value to users or stakeholders."
                        },
                        {
                            id: "section-2",
                            title: "Budget",
                            content: "The budget section provides an estimate of the resources required to successfully complete the project. This includes tools, software, development effort, and any additional operational costs. The focus is on cost-efficiency while ensuring quality execution and scalability where needed."
                        },
                        {
                            id: "section-3",
                            title: "Timeline",
                            content: "The project will be executed in clearly defined phases, starting from planning and design, followed by development, testing, and final delivery. Each phase includes measurable milestones to ensure timely progress and smooth execution from start to finish."
                        },
                        {
                            id: "section-4",
                            title: "Team & Resources",
                            content: "Our dedicated team brings together expertise in design, development, and project management. Each member contributes specialized skills to ensure successful delivery. We have allocated the necessary tools and resources to support collaboration and maintain high quality standards throughout the project lifecycle."
                        }
                    ]
                }
            };
        }
    };

    runtime.exposeApi(sandboxApi);
}

start();
