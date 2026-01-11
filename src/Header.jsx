import { Box } from "@mui/material";

import './Header.css';


export default function Header() {
	return (
		<Box className="header-container">
			<Box className="social-links">
				<a href="https://github.com/zukaritasu">GitHub</a>
				<a href="https://www.youtube.com/@zukaritasu">YouTube</a>
				<a href="https://www.tiktok.com/@zukaritasu">TikTok</a>
				<a href="https://x.com/@zukaritasu">Twitter (X)</a>
				<a href="https://discord.gg/xHU6ANjNth">Discord Server</a>
			</Box>
		</Box>
	);
}