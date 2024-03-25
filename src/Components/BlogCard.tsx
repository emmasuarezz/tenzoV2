import "../styles/CSS/BlogCard.css";
import reactLogo from "../assets/reactLogo.png";
import tenzoId from "../assets/tenzoId.svg";

type BlogCard = {
  title: string;
  body: string;
  image: string;
  date: string;
  accent?: string;
};

const imageMap = {
  react: reactLogo,
  id: tenzoId,
};

function BlogCard({ title, body, date, image, accent }: BlogCard) {
  const imageData = imageMap[image as "react" | "id"];
  return (
    <div className="blog-card">
      <div className="blog-card-img">
        <img src={imageData} alt="" />
      </div>
      <div className="blog-card-content">
        <h3>
          {title} <span>{accent}</span>
        </h3>
        <p>{body}</p>
        <p className="date">{date}</p>
      </div>
    </div>
  );
}

export default BlogCard;
