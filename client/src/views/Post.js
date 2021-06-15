import { useParams } from 'react-router-dom';

import Post from "../components/Post";
import Comments from '../components/Comments';

export default function PostView() {
    const { id } = useParams();

    return <div>
        <Post postId={id} />
        {/* comments section */}
        <Comments post={id} />
    </div>
}