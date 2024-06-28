import { useState, useEffect } from "react";
import styles from "./FeedManager.module.css";

const initialFeed = "https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss";

const FeedManager = ({ feeds, setFeeds }) => {
  const [newFeed, setNewFeed] = useState("");

  useEffect(() => {
    const storedFeeds = JSON.parse(localStorage.getItem("rssFeeds")) || [];
    if (!storedFeeds.includes(initialFeed)) {
      storedFeeds.unshift(initialFeed);
    }
    setFeeds(storedFeeds);
    localStorage.setItem("rssFeeds", JSON.stringify(storedFeeds));
  }, [setFeeds]);

  const addFeed = () => {
    if (newFeed.trim() && !feeds.includes(newFeed)) {
      const updatedFeeds = [...feeds, newFeed.trim()];
      setFeeds(updatedFeeds);
      localStorage.setItem("rssFeeds", JSON.stringify(updatedFeeds));
      setNewFeed("");
    }
  };

  const removeFeed = (feed) => {
    const updatedFeeds = feeds.filter((f) => f !== feed);
    setFeeds(updatedFeeds);
    localStorage.setItem("rssFeeds", JSON.stringify(updatedFeeds));
  };

  return (
    <div className={styles.feedManager}>
      <h2>Manage RSS Feeds</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newFeed}
          onChange={(e) => setNewFeed(e.target.value)}
          placeholder="Add new RSS feed URL"
          className={styles.feedInput}
        />
        <button onClick={addFeed} className={styles.addButton}>
          Add Feed
        </button>
      </div>
      <ul className={styles.feedList}>
        {feeds.map((feed, index) => (
          <li key={index} className={styles.feedListItem}>
            <span>{feed}</span>
            {feed !== initialFeed && (
              <button
                onClick={() => removeFeed(feed)}
                className={styles.removeButton}
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedManager;