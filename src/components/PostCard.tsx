import { Link } from "react-router";
import { BLOG_FULL_ROUTE } from "../constants/router";

interface PosCardProps {
  $id: string;
  title: string;
  getImageUrl: () => string;
}

function PostCard({ $id, title, getImageUrl }: PosCardProps) {
  const routeURL = `${BLOG_FULL_ROUTE.BASE}post/${$id}`;
  return (
    <Link to={routeURL}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full mb-4 justify-center">
          {
            <img
              src={getImageUrl()}
              alt={title}
              className="rounded-xl w-xs max-h-40"
            />
          }
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
