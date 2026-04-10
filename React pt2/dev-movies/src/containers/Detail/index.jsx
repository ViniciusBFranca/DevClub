import { useEffect, useState } from 'react'
import { Container, Background, Cover, Inform, ContainerMovies} from './styles'
import { getMovieById, getMovieCredits, getMovieSimilar, getMovieVideos } from '../../services/getData'
import { useParams } from 'react-router-dom'
import { getImages } from '../../utils/getImages'
import SpanGenres from '../../components/SpanGenres'
import Credits from '../../components/Credits'
import ContainerMovies from '../../components/ContainerMovies'


function Detail() {
    const {id} = useParams()
    const [movie, setMovie] = useState()
    const [movieVideos, setMovieVideos] = useState()
    const [movieCredits, setMovieCredits] = useState()
    const [movieSimilar, setMovieSimilar] = useState()

    useEffect(() => {
        async function getAllData() {

            Promise.all([
                getMovieById(id),
                getMovieVideos(id),
                getMovieCredits(id),
                getMovieSimilar(id),
            ])

                .then(([movie, videos, credits, similar]) => {
                    setMovie(movie)
                    setMovieVideos(videos)
                    setMovieCredits(credits)
                    setMovieSimilar(similar)
                })
                .catch((error) => console.error(error))
        }

        getAllData()

        }, [])

        return (
            <>
            {movie && ( 
            
            <>
            <Background $image={getImages(movie.backdrop_path)}/>
            <Container>
                <Cover>
                    <img src={getImages(movie.poster_path)}  />
                </Cover>
                <Inform>
                    <h2> {movie.title} </h2>
                    <SpanGenres genres={movie.genres}/>
                    <div>
                        <Credits credits={movieCredits}/>
                   </div>
                </Inform>
            </Container>
            <ContainerMovies>
                 {movieVideos && movieVideos.map((video) => (
                    <div key={video.id}>
                        <h4>{video.name}</h4>
                        <iframe src={`https://www.youtube.com/embed/${video.key}`} 
                        title="Youtube Video Player" 
                        height="500px" 
                        width="100%"
                        ></iframe>
                    </div>
                  ))}
            </ContainerMovies>
            </> 
            )}
           </>
        )
    }

export default Detail