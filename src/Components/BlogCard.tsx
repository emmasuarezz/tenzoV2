import "../styles/CSS/BlogCard.css";

type BlogCard = {
  title: string;
  body: string;
  img: string;
  accent?: string;
};

function BlogCard({ title, body, img, accent }: BlogCard) {
  return (
    <div className="blog-card">
      <div className="blog-card-img">
        <img src={img} alt="" />
      </div>
      <div className="blog-card-content">
        <h3>
          {title} <span>{accent}</span>
        </h3>
        <p>{body}</p>
        <p className="date">12/25/2023</p>
      </div>
    </div>
  );
}

export default BlogCard;
