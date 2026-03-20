import React from 'react'
import { useNavigate } from 'react-router-dom';
function Homepage(){
    const navigate=useNavigate()
    return(
        <>
        <div className="home">
            <button onClick={()=>navigate('/employee')}>Back</button>
            <h1>Welcome to the Nava Software Solutions</h1>
            <h2>About Us</h2>
            <p>NAVA Software Solutions is a global IT services and consulting firm specializing in AI-first digital transformation, Vision AI, cloud (especially AWS), and modern engineering, helping enterprises scale with data, automation, and product development. They build AI-enabled platforms, cloud systems, and offer services in GenAI, data analytics, and digital strategy for industries like logistics, manufacturing, and energy, with global delivery from hubs in the USA, Mexico, and India. </p>
            <h2>Key Focus Areas:</h2>
            <p>Vision AI & Edge Computing: Deploying AI for visual analysis in industrial, logistics, and manufacturing settings.
               AI Product Engineering: Developing AI-powered products and modernizing existing systems.
               Generative AI: Embedding GenAI into critical workflows.
               Cloud & Data Modernization: Leveraging AWS for data lakes, analytics, and migration.
               Intelligent Automation: Combining AI with RPA to boost efficiency.</p>
            <h2>Services Offered:</h2>
            <p>Digital Strategy & Roadmapping
               Software Development & Product Modernization
               Staff Augmentation & Global Team Scaling
               Infrastructure Management </p>
            <h2>Industries Served:</h2>
            <ul>
                <li>Supply Chain & Logistics</li>
                <li>Manufacturing</li>
                <li>Energy & Utilities</li>
                <li>Oil & Gas</li>
                <li>etail</li>
            </ul>
        </div>
        </>
    );

}
export default Homepage;