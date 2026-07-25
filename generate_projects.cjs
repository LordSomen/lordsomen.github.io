const fs = require('fs');
const path = require('path');
const https = require('https');

const projects = [
    { repo: 'Azure-ML', badge: 'Cloud/MLOps', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200' },
    { repo: 'House-Price-Prediction', badge: 'Data Science', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200' },
    { repo: 'TechNews', badge: 'Software Eng', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200' },
    { repo: 'Computer-Vision', badge: 'Computer Vision', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200' },
    { repo: '100DaysOfML', badge: 'Machine Learning', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200' },
    { repo: 'Reinforcement-Learning', badge: 'RL', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200' },
    { repo: 'Natural-Language-Processing', badge: 'NLP', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200' },
    { repo: 'DeepLearning', badge: 'Deep Learning', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200' },
    { repo: 'Foundations-Of-Machine-Learning', badge: 'Machine Learning', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200' },
    { repo: 'AI-Agents', badge: 'GEN AI', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200' },
    { repo: 'firebase-functions', badge: 'Backend', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200' },
    { repo: 'PUBG-Data_analysis', badge: 'Data Analytics', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200' },
    { repo: 'SDC-FindLanes', badge: 'Autonomous Driving', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200' }
];

const blogDir = path.join(__dirname, 'src/content/blog');

function fetchReadme(repo) {
    return new Promise((resolve) => {
        https.get(`https://raw.githubusercontent.com/LordSomen/${repo}/main/README.md`, (res) => {
            if (res.statusCode === 404) {
                https.get(`https://raw.githubusercontent.com/LordSomen/${repo}/master/README.md`, (res2) => {
                    let data = '';
                    res2.on('data', chunk => data += chunk);
                    res2.on('end', () => resolve(data));
                }).on('error', () => resolve(''));
            } else {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve(data));
            }
        }).on('error', () => resolve(''));
    });
}

async function generate() {
    for (const proj of projects) {
        console.log(`Processing ${proj.repo}...`);
        const slug = proj.repo.toLowerCase().replace(/_/g, '-');
        const filename = path.join(blogDir, `${slug}.md`);
        let readme = await fetchReadme(proj.repo);
        
        if (!readme || readme.includes('404: Not Found')) {
            readme = `# ${proj.repo}\n\nProject details for ${proj.repo}. Check the GitHub repository for more info.`;
        }

        const title = proj.repo.replace(/-/g, ' ').replace(/_/g, ' ');
        const description = `Detailed overview and implementation of the ${title} project.`;

        const markdown = `---
title: "${title}"
description: "${description}"
pubDate: "Jul 24 2024"
heroImage: "${proj.image}"
badge: "${proj.badge}"
tags: ["Machine-Learning", "Projects"]
---
${readme}

---

**[View the full project on GitHub](https://github.com/LordSomen/${proj.repo})**
`;
        fs.writeFileSync(filename, markdown);
        console.log(`Generated ${filename}`);
    }
}

generate().catch(console.error);
