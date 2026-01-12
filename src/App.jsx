import { } from 'react'
import { Box } from '@mui/material'
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './Home'
import Projects from './Projects'
import Animes from './Animes'
import Games from './Games'

import './App.css'
import Header from './Header';

function App() {
	const navigate = useNavigate();
	
	return (
		<Box className="app-container">
			<Box className="banner"
				sx={{
					backgroundImage: 'url(/banner.jpg)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					boxShadow: 'inset 0 0 100px 50px rgba(0, 0, 0, 0.9)'
				}}
			>
				<Header />
			</Box>
			<Box className="navigation-bar">
				<button onClick={() => navigate('/')}>Home</button>
				<button onClick={() => navigate('/proyects')}>GitHub Projects</button>
				<button onClick={() => navigate('/animes')}>Animes</button>
				<button onClick={() => navigate('/games')}>Games</button>
			</Box>

			<Box className="content-area">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/proyects" element={<Projects />} />
					<Route path="/animes" element={<Animes />} />
					<Route path="/games" element={<Games />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Box>

			<Box className="footer">
				&copy; 2026 zukadev. All rights reserved.
			</Box>
		</Box>
	)
}

export default App
