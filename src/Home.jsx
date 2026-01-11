import { Box, Typography, Button, Stack, Chip } from '@mui/material';

import './Home.css';

function Home() {
    return (
        <Box className="home-page">
            <Box className="introduction-section">
                <img src="/favicon-round.png" alt="Profile" className="profile-picture" style={{
                    width: '8rem',
                    height: '8rem',
                }} />
                <p/>
                Hi! I'm a Software Developer!
                <ul>
                    <li>Specialising in Desktop Application Development. With a strong background in creating efficient and robust desktop applications, I am passionate about transforming ideas into functional solutions.</li>
                    <li>Expertise in Multiple Programming Languages My portfolio of projects demonstrates my ability to work with diverse programming languages, including C#, Java, and more. Each project is an opportunity to learn and apply new technologies.</li>
                    <li>Featured Projects Explore my repositories to see examples of my work and how I apply my knowledge to solve real problems.</li>
                </ul>


                <p>
                    For more information you can contact me on my Discord server <a href="https://discord.gg/sKeKgJSz3S" target="_blank" rel="noopener noreferrer">https://discord.gg/sKeKgJSz3S</a>
                </p>
            </Box>

            <Box className="technologies-used">
                <p>Languages and Technologies I Use:</p>

                <Box className="technologies-list">
                    <span>C#</span>
                    <span>C</span>
                    <span>C++</span>
                    <span>Java</span>
                    <span>JavaScript</span>
                    <span>TypeScript</span>
                    <span>.NET</span>
                    <span>MongoDB</span>
                    <span>NodeJS</span>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;