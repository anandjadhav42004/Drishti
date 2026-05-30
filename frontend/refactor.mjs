import fs from 'fs';
import path from 'path';

const files = [
  'StrategicAnalytics.tsx',
  'TacticalCommand.tsx',
  'AiSurveillanceMatrix.tsx',
  'ThreatIntelligence.tsx',
  'Health.tsx'
];

const dir = path.join(process.cwd(), 'src', 'screens');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip <header>...</header>
  content = content.replace(/\{\/\*\s*TopNavBar\s*\*\/\}.*?<\/header>/s, '');
  content = content.replace(/<header.*?<\/header>/s, '');
  
  // Strip <aside>...</aside>
  content = content.replace(/\{\/\*\s*SideNavBar\s*\*\/\}.*?<\/aside>/s, '');
  content = content.replace(/<aside.*?<\/aside>/s, '');

  // Replace outer div with fragments
  content = content.replace(/<div className="bg-\[#101417\][^>]*>/, '<>');
  // Finding the last </div> and replacing it with </>
  const lastDivIndex = content.lastIndexOf('</div>');
  if (lastDivIndex !== -1) {
    content = content.substring(0, lastDivIndex) + '</>' + content.substring(lastDivIndex + 6);
  }

  // Add useGlobalState import if not present
  if (!content.includes('useGlobalState')) {
    content = content.replace(
      "import React", 
      "import React from 'react';\nimport { useGlobalState } from '../GlobalState';\n// @ts-ignore\nimport { Link, useNavigate } from 'react-router-dom';\n//"
    );
  }

  // Inject useGlobalState inside the component
  const componentMatch = content.match(/export function (\w+)\(\) \{/);
  if (componentMatch) {
    const compName = componentMatch[1];
    // check if we already injected
    if (!content.includes('const { addToast, setLockdown, openModal } = useGlobalState();')) {
       content = content.replace(
         `export function ${compName}() {`,
         `export function ${compName}() {\n  const { addToast, setLockdown, openModal } = useGlobalState();`
       );
    }
  }

  fs.writeFileSync(filePath, content);
  console.log('Refactored', file);
}
