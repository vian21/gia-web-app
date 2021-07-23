import { useParams } from 'react-router-dom';

import Post from "../components/Post";
import Comments from '../components/Comments';

export default function PostView() {
    const { id } = useParams();

    return <div className="h-5/6 overflow-x-scroll">
        <Post postId={id} />
        {/* comments section */}
        <Comments post={id} />
    </div>
}