import { db, auth } from "../firebase";
import { get, ref, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import "../styles/CSS/dashboard.css";
import { TimelineCard } from "../Components";
import { requestAuth } from "../spotifyApi";

function Dashboard() {
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [trackInput, setTrackInput] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [hideButton, setHideButton] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!loggingOut) {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          window.location.href = "/id";
        }
      });
    }
  }, []);

  async function getActiveUsers() {
    const snapshot = await get(ref(db, "users"));
    const users = snapshot.val();
    const activeUsers = Object.keys(users).map((key) => users[key]);
    return activeUsers;
  }
  useEffect(() => {
    setIsLoading(true);
    getActiveUsers().then((users) => {
      setActiveUsers(users);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (trackInput.length > 0) {
      const url = `https://api.spotify.com/v1/search?q=${trackInput}&type=track&limit=6`;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.tracks) {
            const mappedTracks = data.tracks.items.map((track: any) => {
              return {
                name: track.name || "No name",
                artist: track.artists[0].name || "No artist",
                img:
                  track.album.images[0].url ||
                  "https://via.placeholder.com/150",
                uri: track.uri || "No uri",
                album: track.album.name || "No album",
                id: track.id || "No id",
              };
            });

            setTracks(mappedTracks);
            console.log(mappedTracks);
          } else {
            console.log("no tracks");
          }
        });
    }
  }, [trackInput]);

  const handleSignOut = async () => {
    setLoggingOut(true);
    const currentUser = auth.currentUser;
    try {
      set(ref(db, "users/" + currentUser!.uid + "/status"), false);
      await signOut(auth).then(() => {
        const logoutWindow = window.open(
          "https://www.spotify.com/logout/",
          "_blank"
        );
        if (logoutWindow) {
          logoutWindow.addEventListener("load", () => {
            logoutWindow.close();
          });
        }
        localStorage.clear();
        window.location.href = "/id";
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddTrack = (id: string) => {
    localStorage.setItem("newPOST", `https://api.spotify.com/v1/tracks/${id}`);
  };

  const usersCards = activeUsers.map((user) => (
    <div className="user-card">
      <div className="user-card-img-wrapper">
        <img src={user.img} alt="" />
      </div>
      <div className="text-container">
        <div className="top-text">
          <h2 style={{ color: "white" }}>{user.name}</h2>
          <p>Say hi!</p>
        </div>
        <span>
          {user.pronouns} {user.pronouns === "they/them" ? "are" : "is"}{" "}
          {user.status ? "online" : "offline"}
        </span>
      </div>
    </div>
  ));

  const PostModal = () => {
    const initialTrack = {
      name: "",
      artist: "",
      artist2: "",
      img: "",
      uri: "",
      album: "",
      id: "",
    };
    const [track, setTrack] = useState<any>(initialTrack);

    useEffect(() => {
      const newPost = localStorage.getItem("newPOST");

      async function postTrack() {
        try {
          fetch(newPost!, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              const track = {
                name: data.name,
                artist: data.artists[0].name,
                img: data.album.images[0].url,
                uri: data.uri,
                album: data.album.name,
                id: data.id || "No id",
              };
              setTrack(track);
              console.log(track);
            });
        } catch (error) {
          console.error(error);
        }
      }
      postTrack();
    }, []);

    return (
      <div className="add-post-modal">
        <span className="close-button" onClick={() => setShowModal(false)}>
          close
        </span>
        <h3>share a tune</h3>
        <hr />
        <section>
          <img src={track.img} alt="" />
        </section>
      </div>
    );
  };

  return (
    <div className="dash-wrapper">
      <button className="signOut-button" onClick={handleSignOut}>
        sign out
      </button>
      <h1>Dashboard</h1>
      {isLoading ? (
        <div className="spinner-wrapper">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="users-container">{usersCards}</div>
      )}
      <section className="id-timeline">
        {showModal ? <PostModal /> : null}
        <h2>
          timeline //{" "}
          {addPost ? (
            <span>creating a post...</span>
          ) : (
            <span onClick={() => setAddPost(true)}>add something...</span>
          )}
        </h2>
        {addPost ? (
          <section className="add-track-modal">
            <span className="close-button" onClick={() => setAddPost(false)}>
              close
            </span>
            <div className="track-selector">
              <input
                value={trackInput}
                onChange={(e) => {
                  setTrackInput(e.target.value);
                }}
                type="text"
                placeholder="search for a track..."
              />
              <button hidden={hideButton} onClick={() => setShowModal(true)}>
                create
              </button>
            </div>

            <section className="track-result-container">
              {tracks.map((track) => {
                return (
                  <div
                    tabIndex={0}
                    className="track-result"
                    onClick={() => {
                      handleAddTrack(track.id);
                      setHideButton(false);
                    }}
                  >
                    <img src={track.img} alt={track.name} />
                    <div className="text-container padd-1">
                      <div className="top-text">
                        <h3>{track.name}</h3>
                        <p>{track.album}</p>
                      </div>
                      <span>{track.artist}</span>
                    </div>
                  </div>
                );
              })}
            </section>
          </section>
        ) : null}
        <div className="timeline-card-container">
          <TimelineCard />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
