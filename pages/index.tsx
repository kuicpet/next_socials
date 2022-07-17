 import axios from 'axios'
import NoResults from '../components/NoResults'
import VideoCard from '../components/VideoCard'
import {Video} from '../types'
import { BASE_URL } from '../utils'
import {useRouter} from 'next/router'

interface IProps {
  videos: Video[]
}

const Home = ({videos}: IProps) => {
  const router = useRouter()
  const {topic}: any = router.query
  // console.log(videos)
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {
        videos.length ? 
        videos.map((video: Video) => (<VideoCard post={video} key={video._id} />)
        ) : (
        <NoResults text={`No Videos for ${topic}`} />
        )
      }
    </div>
      
  )
}

export const getServerSideProps = async ({
  query: {topic}
} : {query: {topic: string}}) => {
  let response = null
  if(topic){
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  } else {
    response = await axios.get(`${BASE_URL}/api/post`)
  }
  // console.log(response.data.name)

  return {
    props: {
      videos : response.data
    }
  }
}

export default Home
