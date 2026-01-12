import React, { useEffect, useState } from 'react'
import { Box, Typography, Link, CircularProgress } from '@mui/material'

function Projects() {
	const [repos, setRepos] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let mounted = true
		fetch('https://api.github.com/users/zukaritasu/repos')
			.then((res) => res.json())
			.then((data) => {
				if (!mounted) return
				setRepos(Array.isArray(data) ? data.sort((a, b) => b.stargazers_count - a.stargazers_count) : [])
			})
			.catch(() => setRepos([]))
			.finally(() => mounted && setLoading(false))

		return () => {
			mounted = false
		}
	}, [])

	return (
		<Box sx={{
			p: 2,
			color: '#ffffff',
		}}>
			{loading ? (
				<CircularProgress />
			) : (
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
						gap: 2,
						alignItems: 'stretch',
					}}
				>
					{repos.map((repo) => repo.description && repo.name !== 'zukaritasu' && (
						<Box
							key={repo.id}
							component="article"
							sx={{
								borderRadius: '8px',
								p: 2,
								bgcolor: '#292929',
								display: 'flex',
								flexDirection: 'column',
								gap: 1,
								aspectRatio: '1 / auto',
								overflow: 'hidden',
							}}
						>
							<Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
								{repo.name}
							</Typography>

							<Typography
								variant="body2"
								sx={{
									flex: 1,
									fontSize: '0.95rem',
									textOverflow: 'ellipsis',
									color: '#bebebe',
								}}
							>
								{repo.description || 'Sin descripción'}
							</Typography>

							<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
								<Typography variant="caption">{repo.language || ''}</Typography>
								<Typography variant="caption">
									<span style={{ color: '#ffd700' }}>★</span> {repo.stargazers_count || 0}
								</Typography>
							</Box>

							<Link href={repo.html_url} target="_blank" rel="noopener noreferrer"
								sx={{
									mt: 1,
									color: '#74dffd',
								}}>
								Ver en GitHub
							</Link>
						</Box>
					))}
				</Box>
			)}
		</Box>
	)
}

export default Projects
