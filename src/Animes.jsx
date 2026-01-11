import React, { useEffect, useState } from 'react'
import { Box, Typography, Link, CircularProgress } from '@mui/material'

import './Animes.css'

const GRAPHQL_URL = 'https://graphql.anilist.co'
const USERNAME = 'Zukaritasu'

const QUERY = `query ($userName: String) {
	MediaListCollection(userName: $userName, type: ANIME) {
		lists {
			name
			entries {
				id
				score
				status
				media {
					id
					title {
						romaji
						english
						native
					}
					coverImage { large medium }
					siteUrl
					format
				}
			}
		}
	}
	User(name: $userName) {
		favourites {
			anime {
				nodes {
					id
					title { romaji english native }
					coverImage { large medium }
					siteUrl
					format
				}
			}
		}
	}
}`

function groupLists(collection) {
	const groups = {
		watching: [],
		completed: [],
		ona: [],
		movies: [],
	}

	if (!collection || !collection.lists) return groups

	collection.lists.forEach((list) => {
		list.entries.forEach((entry) => {
			const media = entry.media

			if (entry.status === 'CURRENT')
				 groups.watching.push(entry)
			else if (entry.status === 'COMPLETED') {
				if (media.format === 'TV' || media.format === 'TV_SHORT') {
					groups.completed.push(entry)
				} else if (media.format === 'MOVIE') {
					groups.movies.push(entry)
				} else if (media.format === 'ONA') {
					groups.ona.push(entry)
				}
			}
		})
	})

	return groups
}

function sortByScoreDesc(entries) {
	return entries.slice().sort((a, b) => (b.score || 0) - (a.score || 0))
}

function PanelGrid({ items }) {
	if (!items || items.length === 0) return <Typography>Sin elementos</Typography>

	return (
		<Box className="panel-grid">
			{items.map((entry) => {
				const media = entry.media
				const title = media.title.english || media.title.romaji || media.title.native
				return (
					<Box
						className="anime-card"
						key={entry.id}
						sx={{
							backgroundImage: `url(${media.coverImage.large})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
					>
						<Box className="anime-info">
							<p className='anime-title'>{title}</p>
							{ entry.status === 'COMPLETED' && (
								<p>{entry.score || 0}</p>
							)}
						</Box>
						<Link href={media.siteUrl} target="_blank" rel="noopener noreferrer" sx={{ position: 'absolute', inset: 0 }} aria-hidden />
					</Box>
				)
			})}
		</Box>
	)
}

function Animes() {
	const [lists, setLists] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
 	const [favorites, setFavorites] = useState([])

	// Fetch data from AniList API
	useEffect(() => {
		let mounted = true
		setLoading(true)
		fetch(GRAPHQL_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify({ query: QUERY, variables: { userName: USERNAME } }),
		})
			.then((res) => res.json())
			.then((json) => {
				if (!mounted) return
				if (json.errors) {
					setError(json.errors[0].message || 'Error al consultar AniList')
					setLists(null)
				} else {
					setLists(json.data.MediaListCollection)
					const favs = json.data.User && json.data.User.favourites && json.data.User.favourites.anime && json.data.User.favourites.anime.nodes
					setFavorites(Array.isArray(favs) ? favs : [])
				}
			})
			.catch((err) => {
				if (!mounted) return
				setError(err.message || 'Network error')
			})
			.finally(() => mounted && setLoading(false))

		return () => { mounted = false }
	}, [])

	const groups = groupLists(lists)

	return (
		<Box className="animes-container">
			{loading && <CircularProgress />}
			{error && <Typography color="error">{error}</Typography>}

			{!loading && !error && (
				<Box sx={{
					display: 'grid',
					gap: 4,
					color: '#b1b1b1',
				}}>
					{favorites && favorites.length > 0 && (
						<Box>
							<Typography variant="h5" mb={1}>Favorites</Typography>
							<PanelGrid items={favorites.map(node => ({ id: node.id, media: node }))} />
						</Box>
					)}
					<Box>
						<Typography variant="h5" mb={1}>Watching</Typography>
						<PanelGrid items={sortByScoreDesc(groups.watching)} />
					</Box>

					<Box>
						<Typography variant="h5" mb={1}>Completed</Typography>
						<PanelGrid items={sortByScoreDesc(groups.completed)} />
					</Box>

					<Box>
						<Typography variant="h5" mb={1}>ONAs</Typography>
						<PanelGrid items={sortByScoreDesc(groups.ona)} />
					</Box>

					<Box>
						<Typography variant="h5" mb={1}>Movies</Typography>
						<PanelGrid items={sortByScoreDesc(groups.movies)} />
					</Box>
				</Box>
			)}
		</Box>
	)
}

export default Animes
