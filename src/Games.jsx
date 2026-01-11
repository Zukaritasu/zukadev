import React, { useEffect, useState } from 'react'
import { Box, Typography, Link, CircularProgress } from '@mui/material'

export default function Games() {
	const [games, setGames] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let mounted = true
		fetch('/data/games.json')
			.then((res) => res.json())
			.then((data) => {
				if (!mounted) return
				setGames(Array.isArray(data) ? data : [])
			})
			.catch(() => setGames([]))
			.finally(() => mounted && setLoading(false))

		return () => { mounted = false }
	}, [])

	return (
		<Box sx={{
			p: 2,
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
		}}>
			{loading ? (
				<CircularProgress />
			) : (
				<Box sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
					gap: 2,
					alignItems: 'stretch',
					width: '100%',
				}}>
					{games.map((g, i) => (
						<Box key={i}
							sx={{
								borderRadius: '8px',
								backgroundColor: '#292929',
								display: 'flex',
								flexDirection: 'column',
								overflow: 'hidden',
							}}
						>
							<Box
								key={i}
								sx={{
									position: 'relative',
									width: '100%',
									height: 'auto',
									overflow: 'hidden',
									aspectRatio: '1 / 1.4',
									backgroundImage: `url(${g.image})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center'
								}}
							>
								<Link
									href={g.url}
									target="_blank"
									rel="noopener noreferrer"
									sx={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: '100%',
										zIndex: 1,
									}} aria-hidden />
							</Box>

							<Box
								sx={{
									p: 1,
									color: '#fff',
									display: 'flex',
									flexDirection: 'column',
									gap: 0.5
								}}>
								<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{g.name}</Typography>
								<Typography variant="caption" sx={{ opacity: 0.95 }}>{g.description}</Typography>
							</Box>
						</Box>
					))}
				</Box>
			)}
		</Box>
	)
}